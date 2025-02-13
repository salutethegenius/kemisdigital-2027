import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
const corsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = process.env.NODE_ENV === 'development'
      ? ['http://localhost:3000', 'http://0.0.0.0:3000']
      : ['https://kemisdigital.com']; // Replace with your production domain

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    console.log('[Server] Starting server initialization...');
    console.log(`[Server] Environment: ${process.env.NODE_ENV}`);
    console.log(`[Server] Port: ${PORT}`);

    registerRoutes(app);
    const server = createServer(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error(`[Error] ${status}: ${message}`);
      console.error(err.stack);
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
      console.log(`[Server] 🚀 Server is running at http://0.0.0.0:${PORT}`);
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