const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetcher = async (url: string) => {
  try {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      // Return null instead of throwing for failed requests
      return null;
    }

    return await response.json();
  } catch (error) {
    // Always return null on error - no logging to prevent loops
    return null;
  }
};