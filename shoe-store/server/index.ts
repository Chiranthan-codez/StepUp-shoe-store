import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { handleDemo } from "./routes/demo";
import { authRoutes } from "./routes/auth";

export async function createServer() {
  const app = express();

  // MySQL connection pool
  const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    port: Number(process.env.DB_PORT) || 3307,
    password: process.env.DB_PASSWORD || "xzvb##1234A",
    database: process.env.DB_NAME || "stepup_shoes",
    waitForConnections: true,
    connectionLimit: 10,
  });
  /*const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  port: Number(process.env.MYSQLPORT),
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10
});*/

  // Make db available to routes
  app.locals.db = db;

  // Trust proxy (Railway runs behind a proxy)
  app.set("trust proxy", 1);

  // Middleware
  const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:8080").split(",").map(s => s.trim());
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session — with cross-origin cookie support for split deployment
  const isProduction = process.env.NODE_ENV === "production";
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
