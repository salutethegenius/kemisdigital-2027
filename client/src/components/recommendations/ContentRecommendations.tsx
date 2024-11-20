import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { getChatbotResponse } from "@/lib/openai";
import { useAuth } from "@/hooks/use-auth";

interface Recommendation {
  title: string;
  description: string;
  type: string;
  relevanceScore: number;
}

export default function ContentRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Create a context-aware prompt based on user data and interactions
        const prompt = `Based on a marketing professional interested in ${user?.interests?.join(", ") || "AI marketing"}, 
          recommend 3 pieces of content. Format your response as JSON with an array of recommendations, each containing:
          {
            "recommendations": [
              {
                "title": "string",
                "description": "string",
                "type": "article|video|webinar|tool",
                "relevanceScore": number between 0-1
              }
            ]
          }`;

        const response = await getChatbotResponse(prompt);
        const parsedResponse = JSON.parse(response);
        setRecommendations(parsedResponse.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

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
}
