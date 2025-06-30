const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getApiUrl(): string {
  return API_BASE_URL;
}

export async function fetcher(url: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Don't log network errors to avoid console spam
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Silently fail for fetch errors - return empty data instead
      return null;
    }
    throw error;
  }
}

export default fetcher;