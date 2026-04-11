import { Router } from "express";

export function cartRoutes(db: any) {
  const router = Router();

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    next();
  };

  // GET /api/cart — fetch all cart items for the logged-in user
  router.get("/", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const [rows]: any = await db.query(
        `SELECT c.id as cart_id, c.product_id, c.quantity, c.size,
                p.name, p.brand, p.price, p.original_price, p.image_url, 
                p.hover_image_url, p.rating, p.review_count, p.category
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?
         ORDER BY c.created_at DESC`,
        [userId]
      );

      const items = rows.map((row: any) => ({
        id: row.product_id,
        cartId: row.cart_id,
        name: row.name,
        brand: row.brand,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : null,
        image: row.image_url || "",
        hoverImage: row.hover_image_url || "",
        rating: Number(row.rating),
        reviews: row.review_count,
        category: row.category,
        quantity: row.quantity,
        size: row.size,
      }));

      res.json({ items });
    } catch (err: any) {
      console.error("Cart fetch error:", err);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // POST /api/cart — add item to cart (or increment quantity if exists)
  router.post("/", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { productId, quantity = 1, size = "default", name, brand, price, originalPrice, image, rating, reviews, category } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "productId is required" });
      }

      // Check if product exists in DB, if not, insert it
      const [existing]: any = await db.query("SELECT id FROM products WHERE id = ?", [productId]);
      if (existing.length === 0) {
        // Insert the product from frontend data so cart FK works
        await db.query(
          `INSERT INTO products (id, name, brand, price, original_price, category, rating, review_count, image_url) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, name || "Unknown Product", brand || "Unknown", price || 0, originalPrice || null, category || "Lifestyle", rating || 0, reviews || 0, image || null]
        );
      } else {
        // Update image_url if product exists but has no image
        await db.query(
          "UPDATE products SET image_url = COALESCE(NULLIF(image_url, ''), ?) WHERE id = ? AND (image_url IS NULL OR image_url = '')",
          [image || null, productId]
        );
      }

      // Check if item already in cart
      const [cartRows]: any = await db.query(
        "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ? AND size = ?",
        [userId, productId, size]
      );

      if (cartRows.length > 0) {
        // Update quantity
        const newQty = cartRows[0].quantity + quantity;
        await db.query("UPDATE cart SET quantity = ? WHERE id = ?", [newQty, cartRows[0].id]);
        res.json({ message: "Cart updated", cartId: cartRows[0].id, quantity: newQty });
      } else {
        // Insert new cart item
        const [result]: any = await db.query(
          "INSERT INTO cart (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)",
          [userId, productId, quantity, size]
        );
        res.status(201).json({ message: "Added to cart", cartId: result.insertId, quantity });
      }
    } catch (err: any) {
      console.error("Cart add error:", err);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  // PATCH /api/cart/:productId — update quantity
  router.patch("/:productId", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const productId = parseInt(req.params.productId);
      const { quantity } = req.body;

      if (quantity === undefined || quantity < 0) {
        return res.status(400).json({ error: "Valid quantity is required" });
      }

      if (quantity === 0) {
        // Remove item
        await db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId]);
        res.json({ message: "Item removed from cart" });
      } else {
        await db.query(
          "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
          [quantity, userId, productId]
        );
        res.json({ message: "Cart updated", quantity });
      }
    } catch (err: any) {
      console.error("Cart update error:", err);
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  // DELETE /api/cart/:productId — remove item from cart
  router.delete("/:productId", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const productId = parseInt(req.params.productId);

      await db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId]);
      res.json({ message: "Item removed from cart" });
    } catch (err: any) {
      console.error("Cart delete error:", err);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  return router;
}
