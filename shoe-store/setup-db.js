import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

async function run() {
  console.log("Connecting to Database:", process.env.DATABASE_URL);
  if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not found in environment variables!");
      return;
  }
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const schemaSql = fs.readFileSync(path.resolve(import.meta.dirname, "./database/schema.sql"), "utf8");
    console.log("Executing schema.sql...");
    await pool.query(schemaSql);
    console.log("Schema initialized.");

    const seedSql = fs.readFileSync(path.resolve(import.meta.dirname, "./database/seed_products.sql"), "utf8");
    console.log("Executing seed_products.sql...");
    await pool.query(seedSql);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Failed to setup database:", error);
  } finally {
    await pool.end();
  }
}

run();
