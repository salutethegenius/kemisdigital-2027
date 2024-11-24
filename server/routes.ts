import type { Express } from "express";
import blogRouter from './routes/blog';
import emailRouter from './routes/email';

export function registerRoutes(app: Express) {
  // Blog routes
  app.use('/api/blog', blogRouter);
  
  // Email routes
  app.use('/api/email', emailRouter);
}
