import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, AlertCircle } from "lucide-react";
import { getChatbotResponse } from "@/lib/openai";
import { useAuth } from "@/hooks/use-auth";
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
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const prompt = `Generate personalized content recommendations for a marketing professional interested in ${user?.interests?.join(", ") || "AI marketing"}. 
          Return an array of exactly 3 recommendations in this format:
          [
            {
              "title": "string",
              "description": "string",
              "type": "article" | "video" | "webinar" | "tool",
              "relevanceScore": number between 0 and 1
            }
          ]`;

        const response = await getChatbotResponse(prompt);
        let parsedResponse: unknown;
        
        try {
          parsedResponse = JSON.parse(response);
        } catch (parseError) {
          console.error("Failed to parse response:", parseError);
          setRecommendations(fallbackRecommendations);
          setError("Unable to parse recommendations");
          return;
        }

        if (isValidRecommendationsArray(parsedResponse)) {
          setRecommendations(parsedResponse);
          setError(null);
        } else {
          console.error("Invalid recommendations format:", parsedResponse);
          setRecommendations(fallbackRecommendations);
          setError("Received invalid recommendations format");
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
  }, [user]);

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
