import { Router } from "express";
import type { Pool } from "mysql2/promise";

export function wishlistRoutes(db: Pool) {
  const router = Router();

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    next();
  };

  // GET /api/wishlist — fetch all wishlist items for the logged-in user
  router.get("/", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const [rows]: any = await db.query(
        `SELECT w.id as wishlist_id, w.product_id,
                p.name, p.brand, p.price, p.original_price, p.image_url, 
                p.hover_image_url, p.rating, p.review_count, p.category,
                p.is_new, p.is_on_sale
         FROM wishlist w
         JOIN products p ON w.product_id = p.id
         WHERE w.user_id = ?
         ORDER BY w.created_at DESC`,
        [userId]
      );

      const items = rows.map((row: any) => ({
        id: row.product_id,
        wishlistId: row.wishlist_id,
        name: row.name,
        brand: row.brand,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : null,
        image: row.image_url || "",
        hoverImage: row.hover_image_url || "",
        rating: Number(row.rating),
        reviews: row.review_count,
        category: row.category,
        isNew: !!row.is_new,
        isOnSale: !!row.is_on_sale,
      }));

      res.json({ items });
    } catch (err: any) {
      console.error("Wishlist fetch error:", err);
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  // POST /api/wishlist — add item to wishlist
  router.post("/", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { productId, name, brand, price, originalPrice, image, rating, reviews, category, isNew } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "productId is required" });
      }

      // Check if product exists in DB, if not, insert it
      const [existing]: any = await db.query("SELECT id FROM products WHERE id = ?", [productId]);
      if (existing.length === 0) {
        await db.query(
          `INSERT INTO products (id, name, brand, price, original_price, category, rating, review_count, image_url, is_new) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, name || "Unknown Product", brand || "Unknown", price || 0, originalPrice || null, category || "Lifestyle", rating || 0, reviews || 0, image || null, isNew ? 1 : 0]
        );
      } else {
        // Update image_url if product exists but has no image
        await db.query(
          "UPDATE products SET image_url = COALESCE(NULLIF(image_url, ''), ?) WHERE id = ? AND (image_url IS NULL OR image_url = '')",
          [image || null, productId]
        );
      }

      // Check if already in wishlist
      const [wishlistRows]: any = await db.query(
        "SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );

      if (wishlistRows.length > 0) {
        return res.status(409).json({ error: "Already in wishlist" });
      }

      // Insert
      const [result]: any = await db.query(
        "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
        [userId, productId]
      );
      res.status(201).json({ message: "Added to wishlist", wishlistId: result.insertId });
    } catch (err: any) {
      console.error("Wishlist add error:", err);
      res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  // DELETE /api/wishlist/:productId — remove item from wishlist
  router.delete("/:productId", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const productId = parseInt(req.params.productId);

      await db.query("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [userId, productId]);
      res.json({ message: "Removed from wishlist" });
    } catch (err: any) {
      console.error("Wishlist delete error:", err);
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });

  return router;
}
