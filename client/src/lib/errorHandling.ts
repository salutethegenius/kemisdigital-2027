
type ErrorLevel = 'info' | 'warn' | 'error' | 'debug';

// Common error code types for better categorization
export type ErrorCode = 
  // Client-side errors
  | 'CLIENT_NETWORK_ERROR'
  | 'CLIENT_VALIDATION_ERROR'
  | 'CLIENT_RENDER_ERROR'
  | 'CLIENT_UNSUPPORTED_BROWSER'
  | 'CLIENT_STORAGE_ERROR'
  | 'CLIENT_UNHANDLED_REJECTION'
  | 'CLIENT_GLOBAL_ERROR'
  
  // API errors
  | 'API_REQUEST_FAILED'
  | 'API_RESPONSE_INVALID'
  | 'API_UNAUTHORIZED'
  | 'API_FORBIDDEN'
  | 'API_NOT_FOUND'
  | 'API_SERVER_ERROR'
  | 'API_TIMEOUT'
  
  // Auth errors
  | 'AUTH_LOGIN_FAILED'
  | 'AUTH_SESSION_EXPIRED'
  | 'AUTH_INSUFFICIENT_PERMISSIONS'
  
  // Data errors
  | 'DATA_VALIDATION_ERROR'
  | 'DATA_NOT_FOUND'
  | 'DATA_CONFLICT'
  
  // Generic errors
  | 'UNKNOWN_ERROR';

// Structured error context
export interface ErrorContext {
  [key: string]: any;
  timestamp?: string;
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
}

// Main AppError class
export class AppError extends Error {
  code: ErrorCode;
  context: ErrorContext;
  timestamp: string;
  level: ErrorLevel;
  cause?: Error;

  constructor(message: string, options: {
    code?: ErrorCode;
    context?: ErrorContext;
    level?: ErrorLevel;
    cause?: Error;
  } = {}) {
    super(message);
    this.name = 'AppError';
    this.code = options.code || 'UNKNOWN_ERROR';
    this.context = {
      timestamp: new Date().toISOString(),
      ...options.context
    };
    this.level = options.level || 'error';
    this.cause = options.cause;
    this.timestamp = this.context.timestamp;

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * Convert error to a plain object for logging
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      level: this.level,
      stack: this.stack,
      timestamp: this.timestamp,
      cause: this.cause ? {
        name: this.cause.name,
        message: this.cause.message,
        stack: this.cause.stack
      } : undefined
    };
  }

  /**
   * Get a user-friendly message
   */
  getUserMessage(): string {
    switch (this.code) {
      case 'CLIENT_NETWORK_ERROR':
        return 'Network connection failed. Please check your internet connection and try again.';
      case 'API_UNAUTHORIZED':
        return 'You are not authorized to perform this action. Please log in and try again.';
      case 'API_NOT_FOUND':
        return 'The requested resource was not found.';
      case 'API_SERVER_ERROR':
        return 'Server error occurred. Please try again later.';
      case 'DATA_VALIDATION_ERROR':
        return 'Please check your input and try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

/**
 * Create a standardized AppError
 */
export function createError(message: string, options: {
  code?: ErrorCode;
  context?: ErrorContext;
  level?: ErrorLevel;
  cause?: Error;
} = {}): AppError {
  return new AppError(message, options);
}

/**
 * Enhanced logging function
 */
export function logError(error: AppError | Error, level: ErrorLevel = 'error'): void {
  const timestamp = new Date().toISOString();
  
  if (error instanceof AppError) {
    const logData = {
      timestamp,
      level,
      message: error.message,
      code: error.code,
      context: error.context,
      stack: error.stack,
      cause: error.cause
    };

    switch (level) {
      case 'error':
        console.error('🔴 [APP ERROR]', logData);
        break;
      case 'warn':
        console.warn('🟡 [APP WARNING]', logData);
        break;
      case 'info':
        console.info('🔵 [APP INFO]', logData);
        break;
      case 'debug':
        console.debug('🟢 [APP DEBUG]', logData);
        break;
    }
  } else {
    // Handle regular errors
    const logData = {
      timestamp,
      level,
      message: error.message,
      name: error.name,
      stack: error.stack
    };

    switch (level) {
      case 'error':
        console.error('🔴 [ERROR]', logData);
        break;
      case 'warn':
        console.warn('🟡 [WARNING]', logData);
        break;
      case 'info':
        console.info('🔵 [INFO]', logData);
        break;
      case 'debug':
        console.debug('🟢 [DEBUG]', logData);
        break;
    }
  }
}

// HTTP request error handler with specific status code handling
export function handleFetchError(error: any): AppError {
  if (error.name === 'FetchError') {
    const code = mapStatusToErrorCode(error.status);
    const appError = new AppError(error.message, {
      code,
      context: {
        status: error.status,
        url: error.url,
        requestId: error.requestId,
        responseBody: error.info
      },
      cause: error
    });
    
    logError(appError);
    return appError;
  } else {
    const appError = new AppError('Network request failed', {
      code: 'CLIENT_NETWORK_ERROR',
      context: {
        originalError: error instanceof Error ? error.message : String(error)
      },
      cause: error instanceof Error ? error : undefined
    });
    
    logError(appError);
    return appError;
  }
}

// Map HTTP status codes to error codes
function mapStatusToErrorCode(status: number): ErrorCode {
  if (!status) return 'CLIENT_NETWORK_ERROR';

  switch (Math.floor(status / 100)) {
    case 4:
      switch (status) {
        case 400: return 'DATA_VALIDATION_ERROR';
        case 401: return 'API_UNAUTHORIZED';
        case 403: return 'API_FORBIDDEN';
        case 404: return 'API_NOT_FOUND';
        case 409: return 'DATA_CONFLICT';
        case 422: return 'DATA_VALIDATION_ERROR';
        default: return 'API_REQUEST_FAILED';
      }
    case 5:
      return 'API_SERVER_ERROR';
    default:
      return 'UNKNOWN_ERROR';
  }
}

/**
 * Wrap async functions to catch and handle errors
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: ErrorContext
): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = error instanceof AppError ? error : createError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        {
          code: 'UNKNOWN_ERROR',
          context: {
            ...context,
            originalError: error instanceof Error ? error.message : String(error)
          },
          cause: error instanceof Error ? error : undefined
        }
      );
      
      logError(appError);
      throw appError;
    }
  }) as T;
}

/**
 * Handle global errors (used by ErrorBoundary)
 */
export function handleGlobalError(error: Error, errorInfo?: any): void {
  const appError = error instanceof AppError ? error : createError(
    error.message || 'Unknown error occurred',
    {
      code: 'CLIENT_RENDER_ERROR',
      context: {
        errorInfo,
        componentStack: errorInfo?.componentStack
      },
      cause: error
    }
  );
  
  logError(appError);
}

/**
 * Global error boundary function
 */
export function setupGlobalErrorHandling(): void {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = createError('Unhandled Promise Rejection', {
      code: 'CLIENT_UNHANDLED_REJECTION',
      context: {
        reason: event.reason instanceof Error ? event.reason.message : String(event.reason),
        stack: event.reason instanceof Error ? event.reason.stack : undefined
      },
      cause: event.reason instanceof Error ? event.reason : undefined
    });
    
    logError(error);
    event.preventDefault();
  });

  // Handle global JavaScript errors
  window.addEventListener('error', (event) => {
    const error = createError('Global JavaScript Error', {
      code: 'CLIENT_GLOBAL_ERROR',
      context: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        message: event.message
      },
      cause: event.error
    });
    
    logError(error);
  });
}
