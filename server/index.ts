import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001; // Changed to 5001 to avoid conflicts

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5001'], // Updated port
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    console.log('[Server] Starting server initialization...');
    registerRoutes(app);
    const server = createServer(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error(`[Error] ${status}: ${message}`);
      res.status(status).json({ message });
    });

    if (app.get("env") === "development") {
      console.log('[Server] Setting up Vite in development mode...');
      await setupVite(app, server);
    } else {
      console.log('[Server] Setting up static serving in production mode...');
      serveStatic(app);
    }

    console.log(`[Server] Attempting to start server on port ${PORT}...`);
    server.listen(PORT, "0.0.0.0", () => {
      const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      console.log(`${formattedTime} [express] Server started successfully on port ${PORT}`);
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`[Error] Port ${PORT} is already in use. Please try a different port or ensure no other service is using port ${PORT}.`);
      } else {
        console.error('[Error] Server error:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('[Error] Failed to start server:', error);
    process.exit(1);
  }
})();