import { createError, logError } from './errorHandling';

export interface FetcherOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface FetcherResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
}

/**
 * Enhanced fetcher with comprehensive error handling
 */
export async function fetcher<T = any>(
  url: string,
  options: FetcherOptions = {}
): Promise<FetcherResponse<T>> {
  const { method = 'GET', headers = {}, body, timeout = 10000 } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      signal: controller.signal,
    };

    if (body && method !== 'GET') {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorCode = getErrorCode(response);
      const appError = createError(`HTTP ${response.status}: ${response.statusText}`, {
        code: errorCode,
        context: { url, method, status: response.status }
      });

      logError(appError);
      throw appError;
    }

    const data = await response.json();

    return {
      data,
      status: response.status,
      headers: response.headers,
    };

  } catch (error) {
    if (error instanceof Error) {
      const appError = createError('Fetcher request failed', {
        code: 'CLIENT_FETCHER_ERROR',
        context: { url, method },
        cause: error
      });

      logError(appError);
      throw appError;
    }

    // Handle unexpected error types
    const fallbackError = createError('Unknown fetcher error', {
      code: 'CLIENT_FETCHER_UNKNOWN',
      context: { url, method, error }
    });

    logError(fallbackError);
    throw fallbackError;
  }
}

/**
 * Get error code from response status
 */
function getErrorCode(response: Response): string {
  if (response.status >= 500) {
    return 'SERVER_ERROR';
  } else if (response.status === 404) {
    return 'NOT_FOUND';
  } else if (response.status === 401) {
    return 'UNAUTHORIZED';
  } else if (response.status === 403) {
    return 'FORBIDDEN';
  } else if (response.status >= 400) {
    return 'CLIENT_ERROR';
  } else {
    return 'UNKNOWN_ERROR';
  }
}