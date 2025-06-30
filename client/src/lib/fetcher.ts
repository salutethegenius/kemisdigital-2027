import { AppError, logError, createError } from './errorHandling';

/**
 * Enhanced FetchError class with better debugging capabilities
 */
export class FetchError extends Error {
  info: any;
  status: number;
  url: string;
  requestId?: string;
  timestamp: string;

  constructor(message: string, info: any, status: number, url: string) {
    super(message);
    this.name = 'FetchError';
    this.info = info;
    this.status = status;
    this.url = url;
    this.timestamp = new Date().toISOString();

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    // This is needed because we're extending a built-in class
    Object.setPrototypeOf(this, FetchError.prototype);
  }

  /**
   * Format error for logging to console
   */
  toConsoleFormat() {
    return {
      type: 'API Error',
      message: this.message,
      status: this.status,
      url: this.url,
      timestamp: this.timestamp,
      details: this.info,
      stack: this.stack
    };
  }
}

// Get the API base URL from environment variables or use a default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Function to construct full API URLs
export function getApiUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
}

/**
 * Generate a request ID for tracking API calls
 */
function generateRequestId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

/**
 * Format and log fetch requests
 */
function logRequest(method: string, url: string, requestId: string, body?: any) {
  const timestamp = new Date().toISOString();
  console.group(`🌐 API Request [${requestId}] - ${timestamp}`);
  console.log(`${method} ${url}`);
  if (body) {
    console.log('Request Body:', body);
  }
  console.groupEnd();
  return { timestamp, requestId };
}

/**
 * Format and log fetch responses
 */
function logResponse(
  success: boolean, 
  url: string, 
  requestId: string, 
  status: number, 
  data: any, 
  duration: number
) {
  const timestamp = new Date().toISOString();
  if (success) {
    console.group(`✅ API Response [${requestId}] - ${timestamp} (${duration}ms)`);
    console.log(`${status} ${url}`);
    console.log('Response Data:', data);
    console.groupEnd();
  } else {
    console.group(`❌ API Error [${requestId}] - ${timestamp} (${duration}ms)`);
    console.log(`${status} ${url}`);
    console.log('Error Data:', data);
    console.trace('Stack Trace:');
    console.groupEnd();
  }
}

// Enhanced fetcher function for SWR that includes credentials and handles non-200 responses
export const fetcher = async (url: string, options: RequestInit = {}) => {
  // Convert relative URLs to absolute URLs with the API base
  const fullUrl = url.startsWith('http') ? url : getApiUrl(url);

  // Generate a unique request ID for tracking this API call
  const requestId = generateRequestId();

  // Default method is GET if not specified
  const method = options.method || 'GET';

  // Log the request
  const { timestamp: startTime } = logRequest(method, fullUrl, requestId, options.body);
  const startTimeMs = new Date(startTime).getTime();

  try {
    const res = await fetch(fullUrl, {
      ...options,
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Request-ID': requestId,
        ...(options.headers || {})
      }
    });

    // Calculate request duration
    const endTimeMs = new Date().getTime();
    const duration = endTimeMs - startTimeMs;

    if (!res.ok) {
      let errorInfo;
      try {
        errorInfo = await res.json();
      } catch (e) {
        errorInfo = { 
          message: "Could not parse error response",
          rawError: e instanceof Error ? e.message : String(e)
        };
      }

      // Log the error response
      logResponse(false, fullUrl, requestId, res.status, errorInfo, duration);

      // Create a FetchError with detailed information
      const fetchError = new FetchError(
        `Error ${res.status} (${res.statusText}) while fetching data.`,
        errorInfo,
        res.status,
        fullUrl
      );

      // Add request ID and timing information
      fetchError.requestId = requestId;

      // Convert to our application's AppError for consistent error handling
      const appError = createError(`API Error: ${res.statusText}`, {
        code: mapStatusToErrorCode(res.status),
        context: {
          status: res.status,
          url: fullUrl,
          requestId,
          responseBody: errorInfo,
          errorType: 'API_RESPONSE_ERROR'
        },
        cause: fetchError
      });

      throw appError;
    }

    // Parse response as JSON
    const data = await res.json();

    // Log the successful response
    logResponse(true, fullUrl, requestId, res.status, data, duration);

    return data;
  } catch (error) {
    // If it's already our AppError (from above), just rethrow it
    if (error instanceof AppError) {
      throw error;
    }

    // Calculate request duration
    const endTimeMs = new Date().getTime();
    const duration = endTimeMs - startTimeMs;

    // If it's a FetchError, create an AppError with its details
    if (error instanceof FetchError) {
      logResponse(false, fullUrl, requestId, error.status, error.info, duration);

      const appError = createError('API request failed', {
        code: mapStatusToErrorCode(error.status),
        context: {
          status: error.status,
          url: fullUrl,
          requestId,
          responseBody: error.info,
          errorType: 'API_FETCH_ERROR'
        },
        cause: error
      });

      throw appError;
    }

    // Otherwise, it's likely a network error
    console.group(`🔴 Network Error [${requestId}] - ${new Date().toISOString()} (${duration}ms)`);
    console.error(`Failed request to: ${fullUrl}`);
    console.error('Error details:', error);
    console.trace('Stack Trace:');
    console.groupEnd();

    // Create a standardized AppError
    const appError = createError('Network request failed', {
      code: 'CLIENT_NETWORK_ERROR',
      context: {
        url: fullUrl,
        requestId,
        errorType: 'NETWORK_ERROR',
        originalError: error instanceof Error ? error.message : String(error)
      },
      cause: error instanceof Error ? error : undefined
    });

    throw appError;
  } catch (unexpectedError) {
    // Catch any unexpected errors that might cause unhandled rejections
    const fallbackError = createError('Unexpected fetcher error', {
      code: 'CLIENT_NETWORK_ERROR',
      context: {
        url: fullUrl,
        requestId,
        unexpectedError: unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError)
      },
      cause: unexpectedError instanceof Error ? unexpectedError : undefined
    });

    logError(fallbackError, 'error');
    throw fallbackError;
  }
}

// Map HTTP status codes to our error codes
function mapStatusToErrorCode(status: number): any {
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