import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Globe,
  Target,
  Sparkles,
  Code2 as Code,
  CheckCircle2,
  ArrowUpRight,
  Infinity,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

const aiServices = [
    {
      icon: Globe,
      title: "Digital Sales",
      description: "Complete digital sales solution including landing page, sales funnel, and professional PPC campaign management for maximum ROI.",
      benefits: [
        "Professional landing page design",
        "Complete sales funnel setup",
        "PPC campaign setup and management",
        "Monthly campaign optimization",
        "Performance tracking & reporting",
        "Lead capture integration"
      ],
      caseStudy: "A local business achieved 150% increase in qualified leads through our digital sales package",
      integration: "Seamless integration with CRM platforms and analytics systems",
      pricing: "$1,499 + $300 minimum ad budget\nPro: $1,999 + $500 ad budget\nCustom: Contact us"
    },
    {
      icon: Target,
      title: "Startup Growth Package",
      description: "Comprehensive digital marketing solution for startups, including evergreen funnel, content creation, and multi-channel marketing.",
      benefits: [
        "Evergreen marketing funnel",
        "Strategic email marketing",
        "Professional content creation",
        "Social media management",
        "High-converting landing pages",
        "PPC campaign setup & management"
      ],
      caseStudy: "A Bahamian startup saw 250% increase in monthly revenue within 6 months",
      integration: "Integration with marketing platforms and analytics systems",
      pricing: "$2,497 + $300 minimum ad budget\nPro: $3,497 + $500 ad budget\nEnterprise: Custom pricing"
    },
    {
      icon: Code,
      title: "Tourism Sector Solutions",
      description: "Tailored digital solutions for tourism businesses, combining local market expertise with cutting-edge technology for maximum impact.",
      benefits: [
        "Custom booking system integration",
        "Multi-language support",
        "Virtual tour capabilities",
        "Mobile booking optimization",
        "Local SEO optimization",
        "Review management system"
      ],
      caseStudy: "A Caribbean resort achieved 180% increase in direct bookings",
      integration: "Integration with booking systems and payment processors",
      pricing: "Essential: $5,000\nPremium: $10,000\nLuxury: $15,000+"
    }
  ];

  const successMetrics = [
    {
      icon: CheckCircle2,
      metric: "95%",
      label: "Client Success Rate",
      description: "Clients achieving their marketing goals",
    },
    {
      icon: ArrowUpRight,
      metric: "250%",
      label: "Average ROI",
      description: "Return on marketing investment",
    },
    {
      icon: Infinity,
      metric: "85%",
      label: "Client Retention",
      description: "Long-term partnership success",
    },
  ];

  export default function Home() {
  return (
    <div>
      <Hero
        title="The People's Choice!"
        description="Clients say we've earned this title because we're in the game with them. Backed by 20 years of experience in the Bahamian marketplace, we've crafted A-player strategies that brought ideas to life with measured success."
        videoBackground="/videos/business-background.mp4"
        primaryCTA={{
          text: "Learn More",
          href: "/about"
        }}
      />

      {/* Our Mission Section */}
      <section className="py-24 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-muted-foreground text-lg">
              We aim to shape the future of business in the Bahamas by driving digital transformation for local startups and businesses in the tourism sector.
            </p>
          </div>
        </div>
      </section>

      {/* AI Service Showcase Section */}
      <section id="ai-marketing-services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">AI Marketing Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Online campaigns that combine cutting-edge AI technology with expert marketers, strategists, and programmers to deliver A-1 results.
            </p>
          </div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aiServices.map((service) => (
              <Card
                key={service.title}
                className="border-2 border-purple-100 dark:border-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-600"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <service.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Pricing Section - Now at the top */}
                  <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-xl text-purple-600 mb-2">Investment Plans:</h4>
                    <div className="space-y-2">
                      {service.pricing.split('\n').map((plan, index) => (
                        <div key={index} className="text-lg">
                          {plan}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Success Story:</h4>
                    <p className="text-sm text-muted-foreground">{service.caseStudy}</p>
                  </div>

                  <Link href="/services">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Success Metrics Section (Our Impact) */}
      <section className="py-24 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successMetrics.map((metric) => (
              <Card key={metric.label} className="text-center transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <metric.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-purple-600 mb-2">{metric.metric}</div>
                  <h4 className="text-xl font-semibold mb-2">{metric.label}</h4>
                  <p className="text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KemisDigital Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose KemisDigital</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-500" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our AI-powered solutions deliver targeted campaigns that reach the right audience at the right time.</p>
                <Link href="/about">
                  <Button>Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Stay ahead with our cutting-edge AI marketing tools and strategies.</p>
                <Link href="/about">
                  <Button>Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-purple-50 dark:bg-purple-900/10">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
            <p className="mb-6">Get a free consultation and discover how our AI solutions can revolutionize your marketing strategy.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" />
              <Button className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">Schedule Consultation</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}