import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: any;
  
  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_SERVER_ERROR', details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    
    // This is needed because we're extending a built-in class
    Object.setPrototypeOf(this, ApiError.prototype);
  }
  
  /**
   * Format error for API response
   */
  toResponse() {
    return {
      error: {
        message: this.message,
        code: this.code,
        status: this.statusCode,
        ...(this.details ? { details: this.details } : {}),
        timestamp: new Date().toISOString()
      }
    };
  }
}

/**
 * Creates specific error types with standard formats
 */
export const httpErrors = {
  badRequest: (message: string, code = 'BAD_REQUEST', details?: any) => 
    new ApiError(message, 400, code, details),
    
  unauthorized: (message: string, code = 'UNAUTHORIZED', details?: any) => 
    new ApiError(message, 401, code, details),
    
  forbidden: (message: string, code = 'FORBIDDEN', details?: any) => 
    new ApiError(message, 403, code, details),
    
  notFound: (message: string, code = 'NOT_FOUND', details?: any) => 
    new ApiError(message, 404, code, details),
    
  conflict: (message: string, code = 'CONFLICT', details?: any) => 
    new ApiError(message, 409, code, details),
    
  internal: (message: string, code = 'INTERNAL_SERVER_ERROR', details?: any) => 
    new ApiError(message, 500, code, details),
};

/**
 * Middleware to catch and format errors thrown by route handlers
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // If it's already an ApiError, use its structured format
  if (err instanceof ApiError) {
    // Log the error with contextual information
    logApiError(err);
    return res.status(err.statusCode).json(err.toResponse());
  }
  
  // Handle specific known errors
  if (err.name === 'ValidationError') {
    const apiError = httpErrors.badRequest(
      'Validation error', 
      'VALIDATION_ERROR', 
      { details: err.details || err.message }
    );
    logApiError(apiError);
    return res.status(apiError.statusCode).json(apiError.toResponse());
  }
  
  if (err.name === 'SyntaxError' && err.message.includes('JSON')) {
    const apiError = httpErrors.badRequest(
      'Invalid JSON', 
      'INVALID_JSON'
    );
    logApiError(apiError);
    return res.status(apiError.statusCode).json(apiError.toResponse());
  }
  
  if (err.code === 'ECONNREFUSED') {
    const apiError = httpErrors.internal(
      'Database connection failed', 
      'DATABASE_ERROR'
    );
    logApiError(apiError, err);
    return res.status(apiError.statusCode).json(apiError.toResponse());
  }
  
  // Default handling for unknown errors
  const statusCode = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' 
    ? err.message || 'Internal Server Error'
    : 'An unexpected error occurred';
  
  // Create a generic error response
  const apiError = new ApiError(
    message,
    statusCode,
    'INTERNAL_SERVER_ERROR',
    process.env.NODE_ENV === 'development' ? { originalError: err.message } : undefined
  );
  
  // Log the error with stack trace
  logApiError(apiError, err);
  
  res.status(statusCode).json(apiError.toResponse());
}

/**
 * Handler for 404 Not Found errors
 */
export function notFoundHandler(_req: Request, res: Response) {
  const apiError = httpErrors.notFound('Resource not found');
  logApiError(apiError);
  res.status(404).json(apiError.toResponse());
}

/**
 * Consistent error logging format
 */
function logApiError(apiError: ApiError, originalError?: any) {
  console.group(`🔴 API Error [${apiError.code}] - ${new Date().toISOString()}`);
  console.error(`Status ${apiError.statusCode}: ${apiError.message}`);
  
  if (apiError.details) {
    console.error('Error Details:', apiError.details);
  }
  
  if (originalError) {
    console.error('Original Error:', originalError);
    if (originalError.stack) {
      console.error('Stack Trace:', originalError.stack);
    }
  } else if (apiError.stack) {
    console.error('Stack Trace:', apiError.stack);
  }
  
  console.groupEnd();
}

/**
 * Middleware to catch async errors
 */
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
