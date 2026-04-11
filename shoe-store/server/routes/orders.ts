import { Router } from "express";
import type { Pool } from "mysql2/promise";

export function orderRoutes(db: Pool) {
  const router = Router();

  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    next();
  };

  // Generate unique order number
  function generateOrderNumber(): string {
    const date = new Date();
    const prefix = "SU";
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${datePart}-${randomPart}`;
  }

  // POST /api/orders — create a new order from the cart (Buy Now)
  router.post("/", requireAuth, async (req, res) => {
    const connection = await db.getConnection();
    try {
      const userId = (req.user as any).id;
      const { paymentMethod = "card", shippingAddress = "" } = req.body;

      // Fetch cart items
      const [cartRows]: any = await connection.query(
        `SELECT c.product_id, c.quantity, c.size,
                p.name, p.brand, p.price, p.image_url
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?`,
        [userId]
      );

      if (cartRows.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Calculate totals (prices in USD, displayed in INR with *80)
      const subtotal = cartRows.reduce(
        (sum: number, item: any) => sum + Number(item.price) * 80 * item.quantity,
        0
      );
      const shipping = subtotal > 6000 ? 0 : 500;
      const total = subtotal + shipping;
      const orderNumber = generateOrderNumber();

      // Start transaction
      await connection.beginTransaction();

      // Insert order
      const [orderResult]: any = await connection.query(
        `INSERT INTO orders (user_id, order_number, subtotal, shipping, total, payment_method, payment_status, order_status, shipping_address)
         VALUES (?, ?, ?, ?, ?, ?, 'paid', 'confirmed', ?)`,
        [userId, orderNumber, subtotal, shipping, total, paymentMethod, shippingAddress]
      );

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of cartRows) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, product_name, product_brand, product_image, price, quantity, size)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [orderId, item.product_id, item.name, item.brand, item.image_url, Number(item.price) * 80, item.quantity, item.size || "default"]
        );
      }

      // Clear cart
      await connection.query("DELETE FROM cart WHERE user_id = ?", [userId]);

      await connection.commit();

      // Return order details
      res.status(201).json({
        message: "Order placed successfully!",
        order: {
          id: orderId,
          orderNumber,
          subtotal,
          shipping,
          total,
          paymentMethod,
          paymentStatus: "paid",
          orderStatus: "confirmed",
          items: cartRows.map((item: any) => ({
            productId: item.product_id,
            name: item.name,
            brand: item.brand,
            price: Number(item.price) * 80,
            quantity: item.quantity,
            image: item.image_url,
          })),
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err: any) {
      await connection.rollback();
      console.error("Order creation error:", err);
      res.status(500).json({ error: "Failed to create order" });
    } finally {
      connection.release();
    }
  });

  // GET /api/orders — fetch user's orders
  router.get("/", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const [orders]: any = await db.query(
        `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
      );

      // Fetch items for each order
      for (const order of orders) {
        const [items]: any = await db.query(
          `SELECT * FROM order_items WHERE order_id = ?`,
          [order.id]
        );
        order.items = items;
      }

      res.json({ orders });
    } catch (err: any) {
      console.error("Orders fetch error:", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // GET /api/orders/:orderNumber — fetch a specific order (invoice)
  router.get("/:orderNumber", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { orderNumber } = req.params;

      const [orders]: any = await db.query(
        `SELECT * FROM orders WHERE user_id = ? AND order_number = ?`,
        [userId, orderNumber]
      );

      if (orders.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      const order = orders[0];
      const [items]: any = await db.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id]
      );
      order.items = items;

      res.json({ order });
    } catch (err: any) {
      console.error("Order fetch error:", err);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  return router;
}
