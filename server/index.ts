import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import cors from 'cors';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 5000;

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
console.log('[Server] Starting with configuration:');
console.log('[Server] Environment:', process.env.NODE_ENV);
console.log('[Server] Port:', PORT);
console.log('[Server] REPL_SLUG:', process.env.REPL_SLUG);
console.log('[Server] REPL_OWNER:', process.env.REPL_OWNER);

// Enable GZIP compression
app.use(compression());

// Set cache control headers
app.use((req, res, next) => {
  // Set Expires headers for static assets
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    // Cache static assets for 7 days (604800 seconds)
    res.setHeader('Cache-Control', 'public, max-age=604800');
    res.setHeader('Expires', new Date(Date.now() + 604800000).toUTCString());
  }
  next();
});

// Enhanced CORS configuration with better error handling and debugging
const corsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log('[CORS] Incoming request from origin:', origin);
    callback(null, true); // Allow all origins in development
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  maxAge: 86400 // CORS preflight cache for 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint with detailed status
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || 'unknown'
  });
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

    // Set up API routes first
    registerRoutes(app);
    const server = createServer(app);

    // Global error handler with improved error response
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error(`[Error] ${status}: ${message}`);
      console.error(err.stack);

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
