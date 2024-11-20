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
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful customer support assistant for KemisDigital, an AI Marketing firm. Help customers with questions about our AI marketing services, pricing, and general inquiries. 
          Keep responses concise, professional, and informative. If asked about specific pricing, recommend contacting our sales team for a custom quote.
          Format your response as a JSON object with 'message' and optional 'suggestions' fields.`,
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
