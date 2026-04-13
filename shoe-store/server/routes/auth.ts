import { Router } from "express";
import bcrypt from "bcryptjs";

export function authRoutes(passport: any, db: any) {
  const router = Router();

  // Register
  router.post("/register", async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Name, email and password are required" });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });

    try {
      const [existing]: any = await db.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existing.length > 0) return res.status(409).json({ error: "Email already registered" });

      const hash = await bcrypt.hash(password, 12);
      const [result]: any = await db.query(
        "INSERT INTO users (name, email, password_hash, phone, provider) VALUES (?, ?, ?, ?, 'local')",
        [name, email, hash, phone || null]
      );
      const [rows]: any = await db.query("SELECT id, name, email, avatar FROM users WHERE id = ?", [result.insertId]);
      const user = rows[0];
      req.login(user, (err) => {
        if (err) return res.status(500).json({ error: "Login after register failed" });
        res.status(201).json({ user });
      });
    } catch (err: any) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Login
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return res.status(500).json({ error: "Internal error" });
      if (!user) return res.status(401).json({ error: info?.message || "Invalid credentials" });
      req.login(user, (loginErr) => {
        if (loginErr) return res.status(500).json({ error: "Login failed" });
        res.json({ user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar } });
      });
    })(req, res, next);
  });

  // Google OAuth
  router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: `${(process.env.CLIENT_URL || "").replace(/\/$/, "")}/login?login=failed` }),
    (req, res) => {
      const clientUrl = (process.env.CLIENT_URL || "").replace(/\/$/, "");
      req.session.save((err) => {
        if (err) console.error("Session save error:", err);
        res.redirect(`${clientUrl}/home?login=success`);
      });
    }
  );

  // Logout
  router.post("/logout", (req, res) => {
    req.logout(() => res.json({ message: "Logged out" }));
  });

  // Update Profile
  router.put("/profile", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Not authenticated" });
    const { name, email } = req.body;
    const user: any = req.user;

    try {
      if (email && email !== user.email) {
        const [existing]: any = await db.query("SELECT id FROM users WHERE email = ? AND id != ?", [email, user.id]);
        if (existing.length > 0) return res.status(409).json({ error: "Email already in use" });
      }

      await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name || user.name, email || user.email, user.id]);
      const [rows]: any = await db.query("SELECT id, name, email, avatar FROM users WHERE id = ?", [user.id]);
      res.json({ user: rows[0] });
    } catch (err) {
      res.status(500).json({ error: "Profile update failed" });
    }
  });

  return router;
}
