import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Simplified CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000'] 
    : ['https://your-production-domain.com'],
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

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error(`[Error] ${status}: ${message}`);
      res.status(status).json({ message });
    });

    if (process.env.NODE_ENV === "development") {
      console.log('[Server] Setting up Vite in development mode...');
      await setupVite(app, server);
    } else {
      console.log('[Server] Setting up static serving in production mode...');
      serveStatic(app);
    }

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`[Server] 🚀 Server is running at http://localhost:${PORT}`);
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`[Error] Port ${PORT} is already in use`);
        process.exit(1);
      }
      console.error('[Error] Server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('[Error] Failed to start server:', error);
    process.exit(1);
  }
})();