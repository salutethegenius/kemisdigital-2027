import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, AlertCircle } from "lucide-react";
import { getChatbotResponse } from "@/lib/openai";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Recommendation {
  title: string;
  description: string;
  type: "article" | "video" | "webinar" | "tool";
  relevanceScore: number;
}

const fallbackRecommendations: Recommendation[] = [
  {
    title: "AI Marketing Fundamentals",
    description: "Learn the basics of implementing AI in your marketing strategy",
    type: "article",
    relevanceScore: 0.95
  },
  {
    title: "Digital Marketing Automation",
    description: "Discover how to automate your marketing workflows",
    type: "webinar",
    relevanceScore: 0.90
  },
  {
    title: "Content Generation with AI",
    description: "Master AI-powered content creation techniques",
    type: "video",
    relevanceScore: 0.85
  }
];

function isValidRecommendation(rec: any): rec is Recommendation {
  return (
    typeof rec === 'object' &&
    typeof rec.title === 'string' &&
    typeof rec.description === 'string' &&
    ['article', 'video', 'webinar', 'tool'].includes(rec.type) &&
    typeof rec.relevanceScore === 'number' &&
    rec.relevanceScore >= 0 &&
    rec.relevanceScore <= 1
  );
}

function isValidRecommendationsArray(recs: any): recs is Recommendation[] {
  return Array.isArray(recs) && recs.every(isValidRecommendation);
}

export default function ContentRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userInterests = ["AI marketing", "content generation", "automation"];

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Server handles the API key, no client-side check needed

        const prompt = `Return ONLY a raw JSON array of 3 AI marketing recommendations for a user interested in ${userInterests.join(", ")}.
No text before or after. Format must be exactly:
[
  {
    "title": string (100 chars max),
    "description": string (200 chars max),
    "type": "article" | "video" | "webinar" | "tool",
    "relevanceScore": number (between 0 and 1)
  }
]
Ensure response contains only a valid JSON array.`;

        const response = await getChatbotResponse(prompt, 'raw');

        if (!response) {
          throw new Error("Empty response received from AI service");
        }

        try {
          // Remove any potential text before or after the JSON array
          const jsonMatch = response.match(/^\[[\s\S]*\]$/);
          if (!jsonMatch) {
            throw new Error("No valid JSON array found in response");
          }

          // Parse the JSON with additional validation
          const parsedResponse = JSON.parse(jsonMatch[0]);

          // Validate array structure
          if (!Array.isArray(parsedResponse)) {
            throw new Error("Response is not a valid JSON array");
          }

          if (parsedResponse.length !== 3) {
            throw new Error(`Expected exactly 3 recommendations, got ${parsedResponse.length}`);
          }

          // Type guard validation
          if (!isValidRecommendationsArray(parsedResponse)) {
            const invalidRecs = parsedResponse.map((rec, index) => ({
              index,
              issues: [
                !rec?.title && "missing title",
                !rec?.description && "missing description",
                !rec?.type && "missing type",
                !["article", "video", "webinar", "tool"].includes(rec?.type) && "invalid type",
                (typeof rec?.relevanceScore !== "number" || 
                 rec.relevanceScore < 0 || 
                 rec.relevanceScore > 1) && "invalid relevanceScore"
              ].filter(Boolean)
            })).filter(rec => rec.issues.length > 0);

            throw new Error(`Invalid recommendation format: ${JSON.stringify(invalidRecs)}`);
          }

          // Sanitize and validate data
          const sanitizedRecommendations = parsedResponse.map(rec => ({
            title: rec.title.slice(0, 100),
            description: rec.description.slice(0, 200),
            type: rec.type as "article" | "video" | "webinar" | "tool",
            relevanceScore: Math.max(0, Math.min(1, rec.relevanceScore))
          }));

          setRecommendations(sanitizedRecommendations);
        } catch (parseError) {
          console.warn("Failed to parse AI response, using fallback recommendations:", parseError);
          setRecommendations(fallbackRecommendations);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to load personalized recommendations");
        setRecommendations(fallbackRecommendations);
      } finally {
        setIsLoading(false);
      }
    };

    // Use a timeout to prevent infinite loading states
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn("Recommendation fetch timed out, using fallback");
        setRecommendations(fallbackRecommendations);
        setIsLoading(false);
      }
    }, 10000);

    fetchRecommendations().catch(error => {
      console.error("Unhandled error in fetchRecommendations:", error);
      setRecommendations(fallbackRecommendations);
      setIsLoading(false);
    });

    return () => clearTimeout(timeoutId);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <Card key={index} className="border-[#00A0E3]/20 hover:border-[#00A0E3]/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{recommendation.title}</h4>
                <span className="text-xs text-[#F7BE00] font-medium">
                  {Math.round(recommendation.relevanceScore * 100)}% match
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {recommendation.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-[#00A0E3]/10 text-[#00A0E3] px-2 py-1 rounded">
                  {recommendation.type}
                </span>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-5 w-5 text-[#00A0E3]" />
            AI-Powered Recommendations
            <Sparkles className="h-4 w-4 text-[#F7BE00]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}