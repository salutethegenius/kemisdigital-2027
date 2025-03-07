export class FetchError extends Error {
  info: any;
  status: number;
  constructor(message: string, info: any, status: number) {
    super(message);
    this.info = info;
    this.status = status;
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

// Fetcher function for SWR that includes credentials and handles non-200 responses
export const fetcher = async (url: string) => {
  // Convert relative URLs to absolute URLs with the API base
  const fullUrl = url.startsWith('http') ? url : getApiUrl(url);
  
  console.log(`Fetching from: ${fullUrl}`);
  
  try {
    const res = await fetch(fullUrl, {
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!res.ok) {
      let errorInfo;
      try {
        errorInfo = await res.json();
      } catch (e) {
        errorInfo = { message: "Could not parse error response" };
      }
      
      const error = new FetchError(
        `A ${res.status} error occurred while fetching the data.`,
        errorInfo,
        res.status,
      );
      throw error;
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
