const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetcher = async (url: string) => {
  try {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Network error');
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    // Always return null on error to prevent unhandled rejections
    console.warn('Fetch error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
};