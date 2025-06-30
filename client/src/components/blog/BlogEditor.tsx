import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

interface BlogEditorProps {
  post?: BlogPostForm;
  postId?: number;
  onSuccess?: () => void;
}

export default function BlogEditor({ post, postId, onSuccess }: BlogEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post || {
      status: "draft",
    },
  });

  const onSubmit = async (data: BlogPostForm) => {
    try {
      setIsSubmitting(true);
      
      // Static site mode - blog functionality disabled
      console.log("Blog post data:", data);
      
      toast({
        title: "Blog Feature Coming Soon",
        description: "Blog functionality will be available in a future update.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{postId ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input 
              placeholder="Post title"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Textarea 
              placeholder="Post excerpt (optional)"
              {...form.register("excerpt")}
            />
          </div>

          <div>
            <Textarea 
              placeholder="Post content"
              rows={10}
              {...form.register("content")}
            />
            {form.formState.errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : postId ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}