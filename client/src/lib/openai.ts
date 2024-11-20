import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface ChatResponse {
  message: string;
  suggestions?: string[];
}

export async function getChatbotResponse(message: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a knowledgeable customer support assistant for KemisDigital, a leading AI Marketing firm. Your role is to:
          1. Help customers understand our AI marketing services including content generation, predictive analytics, campaign automation, and personalization
          2. Provide information about our technology stack and integration capabilities
          3. Share relevant case studies and success metrics when appropriate
          4. Direct pricing inquiries to our sales team for custom quotes
          5. Maintain a professional, helpful, and engaging tone
          
          Keep responses concise (under 150 words) and format your response as a JSON object with:
          {
            "message": "your response text",
            "suggestions": ["optional follow-up suggestion 1", "optional follow-up suggestion 2"]
          }`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
      response_format: { type: "json_object" },
    });

    const content = JSON.parse(response.choices[0].message.content) as ChatResponse;
    return content.message;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    if (error instanceof Error && error.message.includes("API key")) {
      return "I apologize, but there seems to be an issue with the authentication. Please contact support for assistance.";
    }
    return "I apologize, but I'm having trouble connecting to our systems. Please try again later.";
  }
}
