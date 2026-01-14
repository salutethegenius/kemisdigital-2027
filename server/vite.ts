import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    clearScreen: false,
    appType: "custom",
    root: path.resolve(__dirname, "..", "client"),
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // The Vite build outputs to dist/public (relative to project root)
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  const oneYear = 31536000; // Cache for one year in seconds

  // Only check for build directory in production mode
  if (process.env.NODE_ENV === 'production' && !fs.existsSync(distPath)) {
    console.warn(`Warning: Build directory ${distPath} not found. Skipping static file serving.`);
    return;
  }

  // Serve static assets with proper caching headers
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, {
      etag: true,
      lastModified: true,
      setHeaders: (res, path) => {
        // Set cache control headers based on file type
        if (path.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
          // Cache static assets for 1 year (aggressive caching)
          res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
        } else {
          // Other static assets - cache for 1 day
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      }
    }));

    // fall through to index.html if the file doesn't exist
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
}
