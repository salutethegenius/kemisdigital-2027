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

export interface AppError extends Error {
  code?: string;
  context?: Record<string, any>;
  cause?: Error;
}

// Simple error logging without recursive handling
export function logError(error: Error | unknown, level: 'warn' | 'error' = 'error') {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  if (level === 'error') {
    console.error('[ERROR]', errorMessage);
    if (errorStack) console.error('Stack:', errorStack);
  } else {
    console.warn('[WARN]', errorMessage);
  }
}

export function createError(message: string, options?: {
  code?: string;
  context?: Record<string, any>;
  cause?: Error;
}): Error {
  const error = new Error(message);
  if (options?.code) {
    (error as any).code = options.code;
  }
  if (options?.context) {
    (error as any).context = options.context;
  }
  if (options?.cause) {
    error.cause = options.cause;
  }
  return error;
}

// HTTP request error handler with specific status code handling
export function handleFetchError(error: any): AppError {
  if (error.name === 'FetchError') {
    const code = mapStatusToErrorCode(error.status);
    const appError = createError(error.message, { code: code, context: {
      status: error.status,
      url: error.url,
      requestId: error.requestId,
      responseBody: error.info
    }, cause: error});
    
    logError(appError);
    return appError;
  } else {
    const appError = createError('Network request failed', { code: 'CLIENT_NETWORK_ERROR', context: {
      originalError: error instanceof Error ? error.message : String(error)
    }, cause: error instanceof Error ? error : undefined});
    
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
      const appError = createError(
        error instanceof Error ? error.message : 'Unknown error occurred', {code: 'UNKNOWN_ERROR', context: {
        ...context,
        originalError: error instanceof Error ? error.message : String(error)
      }, cause: error instanceof Error ? error : undefined}
      ) as AppError;
      
      logError(appError);
      throw appError;
    }
  }) as T;
}

/**
 * Handle global errors (used by ErrorBoundary)
 */
export function handleGlobalError(error: Error, errorInfo?: any): void {
  const appError = createError(
    error.message || 'Unknown error occurred'
  , {code: 'CLIENT_RENDER_ERROR', context: {
    errorInfo,
    componentStack: errorInfo?.componentStack
  }, cause: error});
  
  logError(appError);
}

// Remove all global error handling to prevent loops
export function setupGlobalErrorHandling() {
  // Do nothing - let React handle errors naturally
}