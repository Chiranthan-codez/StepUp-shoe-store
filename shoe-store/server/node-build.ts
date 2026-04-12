import fs from "fs";
import path from "path";
import { createServer } from "./index";
import * as express from "express";

async function start() {
  const app = createServer();
  const port = process.env.PORT || 3000;

  // In production, serve the built SPA files
  const __dirname = import.meta.dirname;
  const distPath = path.join(__dirname, "../spa");

  // Serve static files
  app.use(express.static(distPath));

  // Handle React Router - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }

    const indexPath = path.join(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.json({ message: "StepUp Backend API is running." });
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Fusion Starter server running on port ${port}`);
    console.log(`📱 Frontend: http://localhost:${port}`);
    console.log(`🔧 API: http://localhost:${port}/api`);
    
    // Start keep-alive ping if RENDER_EXTERNAL_URL is set
    startKeepAlive();
  });
}

function startKeepAlive() {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (!url) {
    console.log("ℹ️ RENDER_EXTERNAL_URL not set, skipping keep-alive ping.");
    return;
  }

  console.log(`⏱️ Starting keep-alive ping for: ${url}`);
  
  // Ping every 5 minutes (300,000 ms)
  setInterval(async () => {
    try {
      const pingUrl = `${url}/api/ping`.replace(/([^:]\/)\/+/g, "$1"); // Avoid double slashes
      const response = await fetch(pingUrl);
      if (response.ok) {
        console.log(`✅ Keep-alive ping successful: ${new Date().toISOString()}`);
      } else {
        console.error(`❌ Keep-alive ping failed with status ${response.status}: ${new Date().toISOString()}`);
      }
    } catch (error) {
      console.error(`❌ Keep-alive ping error: ${error instanceof Error ? error.message : error}`);
    }
  }, 300000);
}

start();

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
