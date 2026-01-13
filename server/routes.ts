import type { Express } from "express";
import blogRouter from './routes/blog';
import emailRouter from './routes/email';
import paymentRouter from './routes/payment';
import chatbotRouter from './routes/chatbot';

export function registerRoutes(app: Express) {
  // Blog routes
  app.use('/api/blog', blogRouter);
  
  // Email routes
  app.use('/api/email', emailRouter);
  
  // Payment routes
  app.use('/api/payment', paymentRouter);
  
  // Chatbot routes
  app.use('/api/chatbot', chatbotRouter);
}
