import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import Hero from "@/components/shared/Hero";
import { Link } from "wouter";
import { Search, Shield, Gift, Brain, Target, BarChart, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  category_name: string;
  tags: string[];
  isFeatured?: boolean;
  icon: string;
}

const categories = [
  "Financial Services",
  "NGO Solutions",
  "Digital Compliance",
  "Caribbean Market Insights"
];

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType } = {
    Shield,
    Gift,
    Brain,
    Target,
    BarChart,
    Globe
  };
  return icons[iconName] || Shield;
};

// Placeholder blog posts with AI marketing content
const placeholderPosts: BlogPost[] = [
  {
    id: 1,
    title: "AI-Driven Compliance: The Future of Caribbean Banking",
    slug: "ai-compliance-caribbean-banking",
    excerpt: "Explore how AI is revolutionizing compliance and risk management in Caribbean financial institutions while reducing operational costs.",
    icon: "Shield",
    published_at: new Date().toISOString(),
    category_name: "Financial Services",
    tags: ["Banking", "Compliance", "AI Technology"],
    isFeatured: true
  },
  {
    id: 2,
    title: "Digital Fundraising Success: Caribbean NGO Case Study",
    slug: "digital-fundraising-caribbean-ngo",
    excerpt: "Learn how a Caribbean environmental NGO achieved 200% growth in donations through AI-powered donor engagement strategies.",
    icon: "Gift",
    published_at: new Date().toISOString(),
    category_name: "NGO Solutions",
    tags: ["NGO", "Fundraising", "Digital Strategy"]
  },
  {
    id: 3,
    title: "Implementing Digital Payment Solutions in the Caribbean",
    slug: "caribbean-digital-payments-guide",
    excerpt: "A comprehensive guide to integrating secure digital payment systems for Caribbean financial institutions and NGOs.",
    icon: "Globe",
    published_at: new Date().toISOString(),
    category_name: "Digital Compliance",
    tags: ["Payments", "Security", "Integration"]
  },
  {
    id: 4,
    title: "AI-Enhanced Member Services for Credit Unions",
    slug: "credit-union-ai-services",
    excerpt: "How Caribbean credit unions are leveraging AI to transform member services and drive operational efficiency.",
    icon: "Brain",
    published_at: new Date().toISOString(),
    category_name: "Caribbean Market Insights",
    tags: ["Credit Unions", "Member Services", "AI Implementation"]
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: posts } = useSWR<BlogPost[]>('/api/blog/posts?status=published');

  // Use placeholder posts while loading or if no data
  const allPosts = posts && posts.length > 0 ? posts : placeholderPosts;

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
              {featuredPosts.map((post) => {
                const Icon = getIcon(post.icon);
                return (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-8 flex justify-center items-center">
                      <Icon className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                    </div>
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
                );
              })}
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
          {filteredPosts.map((post) => {
            const Icon = getIcon(post.icon);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-6 flex justify-center items-center">
                    <Icon className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                  </div>
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
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
