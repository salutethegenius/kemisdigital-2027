import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe, Gift, Share2, Brain, ArrowRight, Shield, Target, BarChart } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

const services = [
  {
    title: "Digital Marketing Campaigns",
    description: "Comprehensive digital marketing solutions for financial services and NGOs",
    icon: Target,
    features: [
      "PPC ad management",
      "LinkedIn campaigns",
      "SEO optimization",
      "Social media strategy",
      "Community engagement"
    ],
    benefits: [
      "Increased qualified leads",
      "Higher ROI",
      "Broader reach"
    ],
    caseStudy: {
      title: "Financial Services Success",
      metric: "300% increase in qualified leads"
    },
    pricing: "$2,000–$6,000/month + 10-15% of ad spend"
  },
  {
    title: "Online Payment Integration",
    description: "Secure payment solutions for financial institutions and NGO donations",
    icon: Gift,
    features: [
      "Credit card processing",
      "PayPal integration",
      "Mobile money solutions",
      "Recurring donations",
      "Secure transactions"
    ],
    benefits: [
      "Increased online payments",
      "Better donor retention",
      "Secure transactions"
    ],
    caseStudy: {
      title: "NGO Success Story",
      metric: "200% increase in online donations"
    },
    pricing: "$2,000–$5,000 per integration"
  },
  {
    title: "Training & Capacity Building",
    description: "Comprehensive workshops for financial institutions and NGOs",
    icon: Brain,
    features: [
      "Digital tools training",
      "Cybersecurity practices",
      "Social media management",
      "Data analytics",
      "Compliance training"
    ],
    benefits: [
      "Enhanced digital skills",
      "Better security practices",
      "Improved efficiency"
    ],
    caseStudy: {
      title: "Staff Development",
      metric: "90% improvement in digital competency"
    },
    pricing: "$500–$2,000 per session"
  },
  {
    title: "Data Security & Compliance",
    description: "Enterprise-grade security solutions meeting Bahamian standards",
    icon: Shield,
    features: [
      "FATCA compliance",
      "AML integration",
      "Encrypted storage",
      "Audit trails",
      "Security monitoring"
    ],
    benefits: [
      "Regulatory compliance",
      "Enhanced security",
      "Risk mitigation"
    ],
    caseStudy: {
      title: "Bank Compliance",
      metric: "100% compliance achievement"
    },
    pricing: "$4,000–$12,000 per project"
  },
  {
    title: "NGO Digital Fundraising",
    description: "Comprehensive digital fundraising solutions for NGOs",
    icon: Share2,
    features: [
      "Campaign management",
      "Email outreach",
      "Social media ads",
      "Crowdfunding",
      "Impact storytelling"
    ],
    benefits: [
      "Increased donations",
      "Wider donor reach",
      "Better engagement"
    ],
    caseStudy: {
      title: "Fundraising Success",
      metric: "250% increase in donations"
    },
    pricing: "$3,000–$10,000 per campaign"
  },
  {
    title: "Cloud CRM & Analytics",
    description: "Comprehensive CRM and data management solutions",
    icon: BarChart,
    features: [
      "Lead management",
      "Donor tracking",
      "Performance analytics",
      "Automated reporting",
      "Integration support"
    ],
    benefits: [
      "Better client management",
      "Data-driven decisions",
      "Improved efficiency"
    ],
    caseStudy: {
      title: "CRM Implementation",
      metric: "85% increase in client retention"
    },
    pricing: "$5,000–$15,000 per implementation"
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
