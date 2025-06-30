import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getApiUrl } from "@/lib/fetcher";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  category_id: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured_image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

interface BlogEditorProps {
  postId?: number;
  onSuccess?: () => void;
}

export default function BlogEditor({ postId, onSuccess }: BlogEditorProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data to prevent API calls during development
  const tags = [];
  const post = null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post || {
      status: "draft",
    },
  });

  const onSubmit = async (data: BlogPostForm) => {
    try {
      setIsSubmitting(true);
      const endpoint = postId ? `/api/blog/posts/${postId}` : "/api/blog/posts";
      const url = getApiUrl() + endpoint;
      const method = postId ? "PUT" : "POST";

      console.log(`Submitting to: ${url}`);
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save post");

      toast({
        title: "Success",
        description: `Post ${postId ? "updated" : "created"} successfully`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          placeholder="Post Title"
          {...register("title")}
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Post Content"
          {...register("content")}
          className={`min-h-[200px] ${errors.content ? "border-destructive" : ""}`}
        />
        {errors.content && (
          <p className="text-sm text-destructive mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Excerpt (optional)"
          {...register("excerpt")}
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select {...register("category_id")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category: any) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select {...register("status")}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Input
          placeholder="Featured Image URL (optional)"
          {...register("featured_image")}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Post"}
        </Button>
      </div>
    </form>
  );
}