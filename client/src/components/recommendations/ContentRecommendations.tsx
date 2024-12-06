import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, AlertCircle } from "lucide-react";
import { getChatbotResponse } from "@/lib/openai";

import { ErrorBoundary } from "@/components/ErrorBoundary";
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

        const response = await getChatbotResponse(prompt);
        
        if (!response) {
          throw new Error("Empty response received from AI service");
        }
        let parsedResponse: unknown;
        
        try {
          // Remove any potential text before or after the JSON array
          // Attempt to extract only the JSON array using stricter regex
          const jsonMatch = response.match(/^\[[\s\S]*\]$/);
          if (!jsonMatch) {
            throw new Error("No valid JSON array found in response");
          }

          // Parse the JSON with additional validation
          parsedResponse = JSON.parse(jsonMatch[0]);

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
            ...rec,
            title: rec.title.slice(0, 100),
            description: rec.description.slice(0, 200),
            relevanceScore: Math.max(0, Math.min(1, rec.relevanceScore))
          }));

          setRecommendations(sanitizedRecommendations);
          setError(null);
        } catch (error) {
          console.error("Failed to process recommendations:", error);
          setRecommendations(fallbackRecommendations);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          const userFriendlyError = errorMessage.includes('JSON')
            ? 'Unable to process recommendations. The AI response was not in the correct format.'
            : 'Unable to process recommendations. Please try again later.';
          setError(userFriendlyError);
          
          // Log detailed error information for debugging
          console.debug("Original response:", response);
          console.debug("Parsed data:", parsedResponse);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations(fallbackRecommendations);
        setError("Failed to fetch recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse delay-75" />
              <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse delay-150" />
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        {recommendation.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {recommendation.description}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                      {recommendation.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(recommendation.relevanceScore * 100)}% relevant
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <ErrorBoundary>
      {renderContent()}
    </ErrorBoundary>
  );
}
