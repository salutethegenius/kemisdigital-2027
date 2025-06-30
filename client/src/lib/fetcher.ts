const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetcher = async (url: string): Promise<any> => {
  try {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    console.log(`[FETCHER] Making request to: ${fullUrl}`);

    const response = await fetch(fullUrl).catch((fetchError) => {
      console.warn(`[FETCHER] Network error for ${url}:`, fetchError);
      return null;
    });

    if (!response) {
      console.warn(`[FETCHER] No response for: ${url}`);
      return null;
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.warn(`[FETCHER] Request failed: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json().catch((jsonError) => {
      console.warn(`[FETCHER] JSON parse error for ${url}:`, jsonError);
      return null;
    });

    console.log(`[FETCHER] Request successful for: ${url}`);
    return data;
  } catch (error) {
    console.warn(`[FETCHER] Unexpected error for ${url}:`, error);
    return null;
  }
};