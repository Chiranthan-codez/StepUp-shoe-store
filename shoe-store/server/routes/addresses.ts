import { Router } from "express";

export function addressRoutes(db: any) {
  const router = Router();

  // Get addresses
  router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Not authenticated" });
    const user: any = req.user;
    try {
      const [rows]: any = await db.query("SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC", [user.id]);
      res.json({ addresses: rows });
    } catch (err) {
      console.error("fetch addresses error", err);
      res.status(500).json({ error: "Failed to fetch addresses" });
    }
  });

  // Add address
  router.post("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Not authenticated" });
    const { label, address, city, isDefault } = req.body;
    const user: any = req.user;

    if (!address || !city) return res.status(400).json({ error: "Address and city are required" });

    try {
      if (isDefault) {
        await db.query("UPDATE addresses SET is_default = false WHERE user_id = ?", [user.id]);
      }
      const [result]: any = await db.query(
        "INSERT INTO addresses (user_id, label, address, city, is_default) VALUES (?, ?, ?, ?, ?)",
        [user.id, label || "Home", address, city, isDefault || false]
      );
      res.status(201).json({ message: "Address added", id: result.insertId });
    } catch (err) {
      console.error("add address error", err);
      res.status(500).json({ error: "Failed to add address" });
    }
  });

  // Delete address
  router.delete("/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Not authenticated" });
    const user: any = req.user;
    try {
      await db.query("DELETE FROM addresses WHERE id = ? AND user_id = ?", [req.params.id, user.id]);
      res.json({ message: "Address deleted" });
    } catch (err) {
      console.error("delete address error", err);
      res.status(500).json({ error: "Failed to delete address" });
    }
  });

  return router;
}
