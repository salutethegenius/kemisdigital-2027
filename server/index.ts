import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Improved error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error: Error) => {
  console.error('[Fatal Error] Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('[Fatal Error] Unhandled Promise Rejection:', reason);
  process.exit(1);
});

// Debug logging for environment
console.log('[Server] Environment:', process.env.NODE_ENV);
console.log('[Server] Port:', PORT);

// Enhanced CORS configuration with better error handling and debugging
const corsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log('[CORS] Incoming request from origin:', origin);

    // In development mode, be more permissive
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }

    // Production CORS checks
    const allowedOrigins = ['https://kemisdigital.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('[CORS] Rejected origin:', origin);
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  maxAge: 86400 // CORS preflight cache for 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Graceful shutdown handling
function gracefulShutdown(server: any) {
  console.log('\n[Server] Starting graceful shutdown...');
  server.close(() => {
    console.log('[Server] Closed remaining connections.');
    process.exit(0);
  });

  // Force close after 10s
  setTimeout(() => {
    console.error('[Server] Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

(async () => {
  try {
    console.log('[Server] Starting server initialization...');

    registerRoutes(app);
    const server = createServer(app);

    // Global error handler with improved error response
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Log error details
      console.error(`[Error] ${status}: ${message}`);
      console.error(err.stack);

      // Send sanitized error response
      res.status(status).json({
        error: {
          message: process.env.NODE_ENV === 'development' ? message : 'An error occurred',
          status,
          timestamp: new Date().toISOString()
        }
      });
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

    // Setup graceful shutdown handlers
    process.on('SIGTERM', () => gracefulShutdown(server));
    process.on('SIGINT', () => gracefulShutdown(server));

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