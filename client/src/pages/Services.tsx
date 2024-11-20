import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe, Gift, Share2, Brain, ArrowRight } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

const services = [
  {
    title: "Email Advertising Automation",
    description: "AI-powered email campaigns that deliver personalized content at scale",
    icon: Mail,
    features: [
      "Smart audience segmentation",
      "Dynamic content personalization",
      "A/B testing automation",
      "Performance analytics"
    ],
    benefits: [
      "Increase open rates by 35%",
      "Boost click-through rates",
      "Improve conversion rates"
    ],
    caseStudy: {
      title: "E-commerce Success Story",
      metric: "45% increase in email revenue"
    }
  },
  {
    title: "SMS Campaign Management",
    description: "Strategic mobile messaging that drives engagement and conversions",
    icon: MessageSquare,
    features: [
      "Automated scheduling",
      "Personalized messaging",
      "Two-way communication",
      "Campaign tracking"
    ],
    benefits: [
      "98% open rates",
      "Fast customer response",
      "Higher engagement"
    ],
    caseStudy: {
      title: "Retail Brand Impact",
      metric: "3x increase in store visits"
    }
  },
  {
    title: "Website Development",
    description: "Custom websites optimized for conversion and user experience",
    icon: Globe,
    features: [
      "Responsive design",
      "SEO optimization",
      "Performance tuning",
      "Analytics integration"
    ],
    benefits: [
      "Faster load times",
      "Higher search rankings",
      "Better user experience"
    ],
    caseStudy: {
      title: "B2B Website Redesign",
      metric: "85% increase in leads"
    }
  },
  {
    title: "Customer Reward Programs",
    description: "Build loyalty through intelligent reward systems",
    icon: Gift,
    features: [
      "Points management",
      "Tiered rewards",
      "Custom incentives",
      "Analytics dashboard"
    ],
    benefits: [
      "Increased retention",
      "Higher customer value",
      "Brand loyalty"
    ],
    caseStudy: {
      title: "Restaurant Chain Loyalty",
      metric: "2.5x customer lifetime value"
    }
  },
  {
    title: "Social Media Management",
    description: "Strategic social presence with AI-powered insights",
    icon: Share2,
    features: [
      "Content calendar",
      "Engagement analytics",
      "Automated posting",
      "Performance tracking"
    ],
    benefits: [
      "Consistent branding",
      "Higher engagement",
      "Growing audience"
    ],
    caseStudy: {
      title: "Brand Awareness Campaign",
      metric: "200% follower growth"
    }
  },
  {
    title: "AI Marketing Consulting",
    description: "Expert guidance for digital transformation",
    icon: Brain,
    features: [
      "Strategy development",
      "Technology selection",
      "Implementation support",
      "Performance optimization"
    ],
    benefits: [
      "Data-driven decisions",
      "Competitive advantage",
      "ROI optimization"
    ],
    caseStudy: {
      title: "Digital Transformation",
      metric: "150% marketing ROI"
    }
  }
];

export default function Services() {
  return (
    <div>
      <Hero
        title="AI-Powered Marketing Services"
        description="Transform your business with our comprehensive suite of AI-driven marketing solutions designed to drive growth and maximize ROI."
        showCTA={false}
      />

      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-8 mb-16"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <service.icon className="w-6 h-6 text-purple-500" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-lg mb-4 text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Key Features</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Benefits</h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-lg mb-4">
                      <h3 className="font-semibold mb-2">Case Study</h3>
                      <p className="text-lg font-semibold text-purple-600 mb-2">
                        {service.caseStudy.title}
                      </p>
                      <p className="text-2xl font-bold">
                        {service.caseStudy.metric}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Get Started
                      </Button>
                      <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card className="mb-16">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
            <p className="text-muted-foreground mb-6">
              Book a free consultation to discuss how our AI-powered services can help your business grow.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Schedule Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
