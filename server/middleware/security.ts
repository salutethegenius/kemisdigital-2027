import { Request, Response, NextFunction } from 'express';

/**
 * Security Headers Middleware
 * Adds comprehensive security headers to all responses
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Strict-Transport-Security (HSTS) - enforces HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // X-Frame-Options - prevents clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // X-Content-Type-Options - prevents MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // X-XSS-Protection - XSS protection (legacy but still useful)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer-Policy - controls referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content-Security-Policy (CSP) - restricts resource loading
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://maps.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.stripe.com",
    "connect-src 'self' https://api.stripe.com https://*.railway.app wss://*.railway.app",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');
  res.setHeader('Content-Security-Policy', cspDirectives);
  
  // Permissions-Policy - restricts browser features
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
    'payment=(self "https://js.stripe.com")'
  ].join(', ');
  res.setHeader('Permissions-Policy', permissionsPolicy);
  
  next();
}

/**
 * Rate Limiter - Simple in-memory rate limiting
 * Limits requests per IP address
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(options: { 
  windowMs?: number; 
  maxRequests?: number;
  message?: string;
} = {}) {
  const windowMs = options.windowMs || 60 * 1000; // 1 minute default
  const maxRequests = options.maxRequests || 5; // 5 requests default
  const message = options.message || 'Too many requests, please try again later';
  
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    let entry = rateLimitStore.get(ip);
    
    if (!entry || entry.resetTime < now) {
      // Create new entry or reset expired one
      entry = { count: 1, resetTime: now + windowMs };
      rateLimitStore.set(ip, entry);
    } else {
      entry.count++;
    }
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - entry.count).toString());
    res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
    
    if (entry.count > maxRequests) {
      return res.status(429).json({ 
        error: message,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000)
      });
    }
    
    next();
  };
}

/**
 * Input Sanitization Helper
 * Sanitizes and validates input data
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

/**
 * Email Validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Content-Type Validation Middleware
 * Ensures requests have proper JSON content type
 */
export function requireJson(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({ 
        error: 'Unsupported Media Type. Content-Type must be application/json' 
      });
    }
  }
  next();
}

/**
 * Request Size Limiter
 * Prevents oversized payloads
 */
export function limitPayloadSize(maxSizeKB: number = 100) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    const maxBytes = maxSizeKB * 1024;
    
    if (contentLength > maxBytes) {
      return res.status(413).json({ 
        error: `Payload too large. Maximum size is ${maxSizeKB}KB` 
      });
    }
    next();
  };
}

/**
 * API Key Authentication Middleware
 * Prefers Authorization header over query params
 */
export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  // Prefer Authorization header (more secure - query params can be logged)
  const authHeader = req.headers.authorization;
  let apiKey: string | undefined;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    apiKey = authHeader.substring(7);
  } else if (req.query.api_key) {
    // Fallback to query params for backward compatibility (less secure)
    apiKey = req.query.api_key as string;
    console.warn('API key passed via query param - consider using Authorization header');
  }
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  // Validate API key (compare with environment variable)
  const validApiKey = process.env.ADMIN_API_KEY;
  if (!validApiKey || apiKey !== validApiKey) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  
  next();
}
