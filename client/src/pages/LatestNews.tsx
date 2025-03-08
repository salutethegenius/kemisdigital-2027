import Hero from "@/components/shared/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";
import SEO from "@/components/shared/SEO";

const newsItems = [
  {
    title: "KemisDigital Revolutionizes Digital Marketing for Bahamian SBs & SMEs",
    date: "March 6, 2025",
    category: "Press Release",
    description: "Kenneth Moncur, founder and CEO of KemisDigital, is transforming the digital landscape with AI-powered marketing strategies for Bahamian businesses.",
    link: "/news/kemisdigital-revolutionizes-digital-marketing"
  },
  {
    title: "KemisDigital Launches New AI-Powered Marketing Solutions",
    date: "December 20, 2024",
    category: "Product Launch",
    description: "Introducing advanced AI marketing tools tailored for Caribbean businesses.",
    link: "#"
  },
  {
    title: "Digital Transformation Success: Tourism Sector Case Study",
    date: "December 15, 2024",
    category: "Success Story",
    description: "How a leading Caribbean resort achieved 180% increase in direct bookings.",
    link: "#"
  },
  {
    title: "Upcoming Digital Marketing Workshop",
    date: "December 10, 2024",
    category: "Event",
    description: "Join us for an intensive workshop on digital marketing strategies.",
    link: "#"
  }
];

export default function LatestNews() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Latest News | KemisDigital" 
        description="Stay updated with KemisDigital's latest press releases, developments, success stories, and upcoming events in digital marketing and web development."
        keywords="KemisDigital news, Bahamas digital marketing, Kenneth Moncur, press releases, digital transformation, AI marketing news"
        ogUrl="/latest-news"
      />
      <Hero
        title="Latest News"
        description="Stay updated with KemisDigital's latest developments, success stories, and upcoming events."
        showCTA={false}
      />

      <div className="py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {newsItems.map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    className="inline-flex items-center text-[#00A0E3] hover:text-[#0085bb]"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
