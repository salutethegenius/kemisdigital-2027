interface ChatResponse {
  message: string;
  suggestions?: string[];
  rawContent?: string;
}

/**
 * Get a chatbot response from the server
 * @param message - The user's message
 * @param mode - 'chat' for customer support mode (default), 'raw' for direct OpenAI responses
 */
export async function getChatbotResponse(message: string, mode: 'chat' | 'raw' = 'chat'): Promise<string> {
  try {
    const response = await fetch('/api/chatbot/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, mode }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    
    // Raw mode returns the direct content
    if (mode === 'raw' && data.rawContent) {
      return data.rawContent;
    }
    
    return data.message || "I apologize, but I couldn't generate a proper response.";
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    if (error instanceof Error && error.message.includes("Failed to fetch")) {
      return "I apologize, but the chat service is currently unavailable. Please try again later.";
    }
    return "I apologize, but I'm having trouble connecting to our systems. Please try again later.";
  }
}
