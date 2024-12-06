import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe, Gift, Share2, Brain, ArrowRight } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

const services = [
  {
    title: "Tourism-Focused Marketing",
    description: "Destination-specific campaigns for hotels, resorts, and tour operators in the Caribbean",
    icon: Globe,
    features: [
      "Custom website design",
      "Booking system integration",
      "Local SEO optimization",
      "Destination marketing"
    ],
    benefits: [
      "Increased bookings",
      "Better local visibility",
      "Higher conversion rates"
    ],
    caseStudy: {
      title: "Resort Success Story",
      metric: "150% increase in direct bookings"
    },
    pricing: "$2,000–$6,000 per project + $1,000/month support"
  },
  {
    title: "Loyalty & Rewards Programs",
    description: "Custom retention programs for Caribbean retail and hospitality businesses",
    icon: Gift,
    features: [
      "Points system design",
      "Mobile app integration",
      "Customer analytics",
      "Reward automation"
    ],
    benefits: [
      "Increased customer retention",
      "Higher repeat business",
      "Enhanced customer data"
    ],
    caseStudy: {
      title: "Hotel Chain Success",
      metric: "85% increase in repeat guests"
    },
    pricing: "$3,000–$7,500 per program"
  },
  {
    title: "Event Marketing Management",
    description: "Digital promotions for Caribbean festivals, concerts, and community events",
    icon: Share2,
    features: [
      "Geotargeted advertising",
      "Social media campaigns",
      "Ticket integration",
      "Event analytics"
    ],
    benefits: [
      "Increased attendance",
      "Broader reach",
      "Better engagement"
    ],
    caseStudy: {
      title: "Festival Marketing",
      metric: "200% increase in ticket sales"
    },
    pricing: "$2,500–$10,000 per campaign"
  },
  {
    title: "Social Media Growth",
    description: "Region-specific content creation for Instagram and TikTok",
    icon: MessageSquare,
    features: [
      "Local content strategy",
      "Influencer partnerships",
      "Trend optimization",
      "Performance tracking"
    ],
    benefits: [
      "Increased local following",
      "Higher engagement",
      "Brand awareness"
    ],
    caseStudy: {
      title: "Tourism Board Impact",
      metric: "300% follower growth"
    },
    pricing: "$1,500–$4,000/month"
  },
  {
    title: "Small Business Digital Kit",
    description: "Complete digital solutions for Caribbean small businesses",
    icon: Brain,
    features: [
      "E-commerce setup",
      "Google My Business",
      "Social media setup",
      "Local SEO"
    ],
    benefits: [
      "Increased online presence",
      "Better local rankings",
      "More customers"
    ],
    caseStudy: {
      title: "Local Business Growth",
      metric: "125% increase in leads"
    },
    pricing: "$1,000–$3,000 per kit"
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
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-lg mb-4">
                      <h3 className="font-semibold mb-2">Investment</h3>
                      <p className="text-xl font-bold text-purple-600">
                        {service.pricing}
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
