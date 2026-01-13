import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
  message: string;
  suggestions?: string[];
}

const CHAT_SYSTEM_PROMPT = `You are a knowledgeable customer support assistant for KemisDigital, a leading AI Marketing firm. Your role is to:
1. Help customers understand our AI marketing services including content generation, predictive analytics, campaign automation, and personalization
2. Provide information about our technology stack and integration capabilities
3. Share relevant case studies and success metrics when appropriate
4. Direct pricing inquiries to our sales team for custom quotes
5. Maintain a professional, helpful, and engaging tone

Keep responses concise (under 150 words) and format your response as a JSON object with:
{
  "message": "your response text",
  "suggestions": ["optional follow-up suggestion 1", "optional follow-up suggestion 2"]
}`;

router.post('/message', async (req, res) => {
  try {
    const { message, mode } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Raw mode: pass the message directly to OpenAI without chat formatting
    if (mode === 'raw') {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const rawContent = response.choices[0]?.message?.content;
      if (!rawContent) {
        throw new Error("No content received from API");
      }

      return res.json({ rawContent });
    }

    // Default chat mode: use customer support persona
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: CHAT_SYSTEM_PROMPT,
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

    const rawContent = response.choices[0]?.message?.content;
    if (!rawContent) {
      throw new Error("No content received from API");
    }

    try {
      const content = JSON.parse(rawContent) as ChatResponse;
      res.json({ message: content.message || "I apologize, but I couldn't generate a proper response.", suggestions: content.suggestions });
    } catch (parseError) {
      console.warn("Failed to parse JSON response, returning raw content:", parseError);
      res.json({ message: rawContent });
    }
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    console.error("OpenAI API Key status:", process.env.OPENAI_API_KEY ? "Set (length: " + process.env.OPENAI_API_KEY.length + ")" : "NOT SET");
    
    if (error instanceof Error && error.message.includes("API key")) {
      return res.status(500).json({ 
        error: "Authentication issue",
        message: "I apologize, but there seems to be an issue with the authentication. Please contact support for assistance."
      });
    }
    
    res.status(500).json({ 
      error: "Failed to get response",
      message: "I apologize, but I'm having trouble connecting to our systems. Please try again later.",
      debug: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
    });
  }
});

export default router;
