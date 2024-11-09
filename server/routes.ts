import type { Express } from "express";
import blogRouter from './routes/blog';

export function registerRoutes(app: Express) {
  // Blog routes
  app.use('/api/blog', blogRouter);
}
