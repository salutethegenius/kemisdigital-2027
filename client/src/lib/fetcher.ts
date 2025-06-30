const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

export function getApiUrl(): string {
  return API_BASE_URL;
}

export async function fetcher(url: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default fetcher;