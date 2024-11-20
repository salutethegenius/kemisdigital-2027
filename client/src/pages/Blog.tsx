import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import useSWR from "swr";
import Hero from "@/components/shared/Hero";
import { Link } from "wouter";
import { Search, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  category_name: string;
  tags: string[];
  isFeatured?: boolean;
}

const categories = [
  "AI Marketing Insights",
  "Digital Transformation",
  "Case Studies",
  "Educational Content"
];

// Placeholder blog posts with AI marketing content
const placeholderPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Content Marketing",
    slug: "future-ai-content-marketing",
    excerpt: "Discover how AI is revolutionizing content creation and distribution strategies for modern businesses.",
    featured_image: "https://via.placeholder.com/1280x720/6B46C1/FFFFFF?text=AI+Content+Marketing",
    published_at: new Date().toISOString(),
    category_name: "AI Marketing Insights",
    tags: ["AI", "Content Marketing", "Future Trends"],
    isFeatured: true
  },
  {
    id: 2,
    title: "Digital Transformation Success Story: E-commerce Revolution",
    slug: "digital-transformation-ecommerce",
    excerpt: "Learn how an e-commerce brand achieved 300% growth through AI-powered personalization.",
    featured_image: "https://via.placeholder.com/1280x720/6B46C1/FFFFFF?text=E-commerce+Success",
    published_at: new Date().toISOString(),
    category_name: "Case Studies",
    tags: ["E-commerce", "Success Story", "AI Implementation"]
  },
  {
    id: 3,
    title: "AI Marketing Tools: A Comprehensive Guide",
    slug: "ai-marketing-tools-guide",
    excerpt: "An in-depth look at the most effective AI tools reshaping the marketing landscape.",
    featured_image: "https://via.placeholder.com/1280x720/6B46C1/FFFFFF?text=AI+Marketing+Tools",
    published_at: new Date().toISOString(),
    category_name: "Educational Content",
    tags: ["Tools", "Guides", "Best Practices"]
  },
  {
    id: 4,
    title: "Transforming Customer Experience with AI",
    slug: "transforming-customer-experience",
    excerpt: "How AI is enabling businesses to deliver personalized, seamless customer experiences.",
    featured_image: "https://via.placeholder.com/1280x720/6B46C1/FFFFFF?text=Customer+Experience",
    published_at: new Date().toISOString(),
    category_name: "Digital Transformation",
    tags: ["Customer Experience", "AI", "Digital Strategy"]
  }
];

export default function Blog() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: posts, error } = useSWR<BlogPost[]>('/api/blog/posts?status=published');

  // Use placeholder posts if there's an error or no data
  const allPosts = posts || placeholderPosts;

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return (
    <div>
      <Hero
        title="AI Marketing Intelligence Hub"
        description="Explore cutting-edge insights, success stories, and expert guidance on AI-powered marketing strategies that drive exceptional business results."
        showCTA={false}
      />

      <div className="container mx-auto py-8">
        {user && (
          <div className="mb-8">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/dashboard/blog/new">Create New Post</Link>
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error loading the blog posts. Showing placeholder content instead.
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-purple-600">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full flex flex-col">
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Link href={`/blog/${post.slug}`} className="hover:text-purple-600">
                      {post.title}
                    </Link>
                  </CardTitle>
                  {post.category_name && (
                    <span className="text-sm text-purple-600">
                      {post.category_name}
                    </span>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}