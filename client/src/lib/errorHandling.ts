/**
 * Error handling utilities for the application
 * Provides consistent error logging, display, and tracking
 */

type ErrorLevel = 'info' | 'warn' | 'error' | 'debug';

// Common error code types for better categorization
export type ErrorCode = 
  // Client-side errors
  | 'CLIENT_NETWORK_ERROR'
  | 'CLIENT_VALIDATION_ERROR'
  | 'CLIENT_RENDER_ERROR'
  | 'CLIENT_UNSUPPORTED_BROWSER'
  | 'CLIENT_STORAGE_ERROR'
  
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

// Create custom error class with additional metadata
export class AppError extends Error {
  code: ErrorCode;
  context?: Record<string, any>;
  timestamp: string;
  
  constructor(message: string, options?: { 
    code?: ErrorCode; 
    context?: Record<string, any>;
    cause?: Error 
  }) {
    super(message, { cause: options?.cause });
    this.name = 'AppError';
    this.code = options?.code || 'UNKNOWN_ERROR';
    this.context = options?.context;
    this.timestamp = new Date().toISOString();
    
    // This is needed to make instanceof work properly with this custom error class
    Object.setPrototypeOf(this, AppError.prototype);
  }
  
  /**
   * Format error for console logging
   */
  toConsoleFormat() {
    return {
      message: this.message,
      code: this.code,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack,
      cause: this.cause instanceof Error ? {
        message: this.cause.message,
        stack: this.cause.stack
      } : this.cause
    };
  }
  
  /**
   * Format error for user display (safe to show to users)
   */
  toUserFormat() {
    return {
      message: this.getUserFriendlyMessage(),
      code: this.code
    };
  }
  
  /**
   * Generate a user-friendly error message based on the error code
   */
  getUserFriendlyMessage(): string {
    // Map technical error codes to user-friendly messages
    switch(this.code) {
      case 'CLIENT_NETWORK_ERROR':
        return "Network connection issue. Please check your internet connection and try again.";
      case 'API_TIMEOUT':
        return "The server is taking too long to respond. Please try again later.";
      case 'AUTH_SESSION_EXPIRED':
        return "Your session has expired. Please log in again.";
      case 'API_NOT_FOUND':
        return "The requested resource was not found.";
      case 'API_UNAUTHORIZED':
        return "You need to be logged in to access this feature.";
      case 'API_FORBIDDEN':
        return "You don't have permission to access this resource.";
      case 'DATA_VALIDATION_ERROR':
        return "There was a problem with the data you submitted. Please check and try again.";
      case 'API_SERVER_ERROR':
        return "We're experiencing technical difficulties. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }
}

// Centralized error logger
export function logError(error: Error | AppError | unknown, level: ErrorLevel = 'error', context?: Record<string, any>) {
  // Extract info from error
  const errorObj = error instanceof Error ? error : new Error(String(error));
  const appError = error instanceof AppError 
    ? error 
    : new AppError(errorObj.message, { 
        code: 'UNKNOWN_ERROR',
        context,
        cause: errorObj
      });
  
  // Create standardized error log structure
  const errorDetails = appError.toConsoleFormat();
  
  // Add additional context if provided
  if (context) {
    errorDetails.context = {
      ...errorDetails.context,
      ...context
    };
  }

  // Log with console group for better organization
  console.group(`${getErrorLevelEmoji(level)} [${level.toUpperCase()}] ${errorObj.name}`);
  console.error(errorObj.message);
  
  if (errorDetails.context) {
    console.error('Context:', errorDetails.context);
  }
  
  console.error('Details:', errorDetails);
  
  if (errorObj.stack) {
    console.error('Stack:', errorObj.stack);
  }
  
  console.groupEnd();

  // In the future, we could add error reporting to a service like Sentry here
  return errorDetails;
}

function getErrorLevelEmoji(level: ErrorLevel): string {
  switch (level) {
    case 'info': return '🔵';
    case 'warn': return '🟠';
    case 'debug': return '🟣';
    case 'error': default: return '🔴';
  }
}

// Global error boundary handler - can be connected to ErrorBoundary component
export function handleGlobalError(error: Error, errorInfo: React.ErrorInfo) {
  const appError = error instanceof AppError
    ? error
    : new AppError(error.message, {
        code: 'CLIENT_RENDER_ERROR',
        context: {
          componentStack: errorInfo.componentStack,
          source: 'React ErrorBoundary'
        },
        cause: error
      });
  
  logError(appError);
  
  // You could report to an error monitoring service here
  // reportToErrorMonitoring(appError);
}

// Async error wrapper for better async error handling
export async function tryCatch<T>(
  promise: Promise<T>,
  errorHandler?: (error: AppError) => void
): Promise<[T | null, AppError | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const appError = error instanceof AppError 
      ? error 
      : new AppError(
          error instanceof Error ? error.message : String(error),
          { cause: error instanceof Error ? error : undefined }
        );
    
    logError(appError);
    
    if (errorHandler) {
      errorHandler(appError);
    }
    
    return [null, appError];
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

// Create error with context
export function createError(message: string, options?: { 
  code?: ErrorCode; 
  context?: Record<string, any>;
  cause?: Error 
}): AppError {
  return new AppError(message, options);
}
