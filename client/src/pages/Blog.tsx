import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import useSWR from "swr";
import Hero from "@/components/shared/Hero";
import { Link } from "wouter";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  category_name?: string;
  tags: string[];
}

export default function Blog() {
  const { user } = useAuth();
  const { data: posts, error } = useSWR<BlogPost[]>('/api/blog/posts?status=published');

  if (error) {
    return <div>Failed to load blog posts</div>;
  }

  return (
    <div>
      <Hero
        title="BDMA Blog"
        description="Stay updated with the latest insights, trends, and best practices in digital marketing"
      />

      <div className="container mx-auto py-8">
        {user && (
          <div className="mb-8">
            <Button asChild>
              <Link href="/dashboard/blog/new">Create New Post</Link>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <Card key={post.id}>
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
                {post.category_name && (
                  <span className="text-sm text-muted-foreground">
                    {post.category_name}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
