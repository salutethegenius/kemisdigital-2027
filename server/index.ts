import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { errorHandler, notFoundHandler } from './middleware/errorHandling';
import { securityHeaders } from './middleware/security';

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Enhanced error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error: Error) => {
  console.group('🔴 [FATAL ERROR] Uncaught Exception');
  console.error('Error Message:', error.message);
  console.error('Stack Trace:', error.stack);
  console.error('Date/Time:', new Date().toISOString());
  console.groupEnd();
  
  // In production, we would log to a file or error reporting service here
  
  // Exit with error code after a short delay to allow logging to complete
  setTimeout(() => process.exit(1), 500); 
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.group('🔴 [FATAL ERROR] Unhandled Promise Rejection');
  console.error('Reason:', reason instanceof Error ? reason.message : reason);
  if (reason instanceof Error && reason.stack) {
    console.error('Stack Trace:', reason.stack);
  }
  console.error('Promise:', promise);
  console.error('Date/Time:', new Date().toISOString());
  console.groupEnd();
  
  // In production, we would log to a file or error reporting service here
  
  // Exit with error code after a short delay to allow logging to complete
  setTimeout(() => process.exit(1), 500);
});

// Security headers - applied to all responses
if (process.env.NODE_ENV === 'production') {
  app.use(securityHeaders);
}

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? true // Allow any origin in development
    : [process.env.FRONTEND_URL || 'https://kemisdigital.com', /\.replit\.app$/], // Restrict in production
  credentials: true
}));
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Register API routes
registerRoutes(app);

// In development, set up Vite for the React client
let server: any; // Store server reference for graceful shutdown

if (process.env.NODE_ENV === 'development') {
  server = createServer(app);
  
  setupVite(app, server)
    .then(() => {
      server.listen(PORT, '0.0.0.0', (err?: Error) => {
        if (err) {
          if (err.message.includes('EADDRINUSE')) {
            console.error(`❌ Port ${PORT} is already in use. Please stop other processes or use a different port.`);
            process.exit(1);
          } else {
            console.error('Server error:', err);
            process.exit(1);
          }
        }
        console.log(`🚀 Development server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Error setting up Vite:', err);
      process.exit(1);
    });
} else {
  // In production, serve static files from the build directory
  serveStatic(app);
  
  // Add the 404 handler after static files for any other routes
  app.use(notFoundHandler);
  
  // Start the server
  server = app.listen(PORT, '0.0.0.0', (err?: Error) => {
    if (err) {
      if (err.message.includes('EADDRINUSE')) {
        console.error(`❌ Port ${PORT} is already in use. Please stop other processes or use a different port.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    }
    console.log(`🚀 Production server running on port ${PORT}`);
  });
}

// Global error handling middleware - must be registered last
app.use(errorHandler);

// Handle server shutdown gracefully
function gracefulShutdown() {
  console.log('Received shutdown signal, closing server...');
  
  if (server) {
    server.close(() => {
      console.log('Server closed successfully');
      process.exit(0);
    });
    
    // Force close if it takes too long
    setTimeout(() => {
      console.error('Could not close connections in time, forcing shutdown');
      process.exit(1);
    }, 10000);
  } else {
    console.log('Server not initialized, exiting...');
    process.exit(0);
  }
}

// Register shutdown handlers
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
