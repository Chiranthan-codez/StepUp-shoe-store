import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { handleDemo } from "./routes/demo";
import { authRoutes } from "./routes/auth";
import { cartRoutes } from "./routes/cart";
import { wishlistRoutes } from "./routes/wishlist";
import { orderRoutes } from "./routes/orders";

export function createServer() {
  const app = express();

  const isProduction = process.env.NODE_ENV === "production";

  // PostgreSQL connection pool
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:xzvb@localhost:5432/stepup_shoes",
    ssl: isProduction && process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
  });

  const db = {
    query: async (text: string, params?: any[]) => {
      let pgText = text;
      // Convert ? to $1, $2
      if (params) {
        let i = 1;
        pgText = pgText.replace(/\?/g, () => `$${i++}`);
      }
      
      const isInsert = pgText.trim().toUpperCase().startsWith("INSERT");
      if (isInsert && !pgText.toUpperCase().includes("RETURNING")) {
        pgText += " RETURNING id";
      }

      try {
        const result = await pgPool.query(pgText, params);
        
        let insertId;
        if (isInsert && result.rows && result.rows.length > 0) {
            insertId = result.rows[0].id;
        }
        
        const rowsArray = result.rows || [];
        (rowsArray as any).insertId = insertId;
        
        return [rowsArray, result.fields];
      } catch (err) {
        console.error("DB Query error:", pgText, params, err);
        throw err;
      }
    }
  };

  // Make db available to routes
  app.locals.db = db;

  // Trust proxy (Railway runs behind a proxy)
  app.set("trust proxy", 1);

  // Middleware
  const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:8080").split(",").map(s => s.trim());
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".netlify.app") || origin.endsWith(".onrender.com") || origin.includes("localhost")) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked for origin: ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session — with cross-origin cookie support for split deployment
  app.use(session({
    secret: process.env.SESSION_SECRET || "stepup-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
    },
  }));

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport Local Strategy
  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      const user = rows[0];
      if (!user) return done(null, false, { message: "No user found with this email" });
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (err) { return done(err); }
  }));

  // Passport Google Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:8080/api/auth/google/callback",
    }, async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const [rows]: any = await db.query("SELECT * FROM users WHERE google_id = ? OR email = ?", [profile.id, email]);
        let user = rows[0];
        if (!user) {
          const [result]: any = await db.query(
            "INSERT INTO users (name, email, google_id, avatar, provider) VALUES (?, ?, ?, ?, 'google')",
            [profile.displayName, email, profile.id, profile.photos?.[0]?.value]
          );
          const [newUser]: any = await db.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
          user = newUser[0];
        } else if (!user.google_id) {
          await db.query("UPDATE users SET google_id = ?, avatar = ? WHERE id = ?", [profile.id, profile.photos?.[0]?.value, user.id]);
        }
        return done(null, user);
      } catch (err) { return done(err as Error); }
    }));
  }

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const [rows]: any = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      done(null, rows[0]);
    } catch (err) { done(err); }
  });

  // Routes
  app.get("/api/ping", (_req, res) => res.json({ message: "StepUp API running!" }));
  app.get("/api/demo", handleDemo);
  app.use("/api/auth", authRoutes(passport, db));
  app.use("/api/cart", cartRoutes(db));
  app.use("/api/wishlist", wishlistRoutes(db));
  app.use("/api/orders", orderRoutes(db));

  // Check current user
  app.get("/api/me", (req, res) => {
    if (req.isAuthenticated()) {
      const u: any = req.user;
      res.json({ user: { id: u.id, name: u.name, email: u.email, avatar: u.avatar } });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  return app;
}
