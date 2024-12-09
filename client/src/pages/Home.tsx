import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Globe,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Infinity,
  Code2 as Code,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
  const aiServices = [
    {
      icon: Globe,
      title: "Website Development",
      description: "Enterprise-grade, secure websites with integrated client portals tailored for financial institutions and NGOs. Our solutions prioritize compliance, user experience, and seamless integration capabilities.",
      benefits: [
        "Bank-grade SSL security with 256-bit encryption",
        "WCAG 2.1 ADA compliance with screen reader support",
        "Custom client portals with multi-factor authentication",
        "Multi-currency payment processing with fraud detection",
        "Progressive Web App with offline capabilities",
        "Real-time data sync with 99.9% uptime guarantee",
        "Automated backup with disaster recovery",
        "Custom API development and integration",
        "24/7 security monitoring and threat detection"
      ],
      caseStudy: "A leading Caribbean financial institution achieved 200% increase in digital client onboarding, 45% reduction in support tickets, and 60% improvement in customer satisfaction scores through our custom portal solution",
      integration: "Seamless integration with major banking systems (FIS, Fiserv), payment processors (Stripe, PayPal), CRM platforms (Salesforce, HubSpot), and core banking systems with custom API development capabilities",
      pricing: "Basic: $3,000 - Secure website with essential integrations\nPro: $6,000 - Full-featured portal with advanced security\nEnterprise: $10,000+ - Custom solution with unlimited features"
    },
    {
      icon: Target,
      title: "Digital Marketing Campaigns",
      description: "Data-driven marketing campaigns specifically designed for financial services and NGOs in the Caribbean region. We combine AI-powered targeting with deep local market expertise.",
      benefits: [
        "AI-powered campaign optimization with real-time bidding",
        "Industry-specific LinkedIn targeting with Sales Navigator",
        "Local SEO with Caribbean market focus",
        "Omni-channel social media campaign management",
        "Automated community engagement with sentiment analysis",
        "Compliance-first content strategy with legal review",
        "Advanced ROI tracking with custom metrics",
        "A/B testing with statistical significance analysis",
        "Competitor analysis and market positioning"
      ],
      caseStudy: "A regional NGO achieved 300% increase in qualified leads, 150% boost in donor engagement, and 80% improvement in campaign ROI through our AI-powered targeting strategy",
      integration: "Comprehensive integration with Google Ads, Meta Business Suite, LinkedIn Campaign Manager, HubSpot, Mailchimp, Hootsuite, and custom analytics platforms with real-time reporting dashboards",
      pricing: "Starter: $2,000/month - Essential digital marketing suite\nGrowth: $4,000/month - Advanced campaign optimization\nPremium: $6,000+/month - Enterprise marketing solution"
    },
    
    {
      icon: Code,
      title: "Software & App Development",
      description: "Tailored software solutions and mobile applications built with cutting-edge technology to address specific business challenges and enhance operational efficiency.",
      benefits: [
        "Custom enterprise software development",
        "Native & cross-platform mobile apps",
        "Cloud-based application architecture",
        "Scalable microservices implementation",
        "Real-time data processing capabilities",
        "Advanced security implementations",
        "Comprehensive testing & QA",
        "Performance optimization",
        "Continuous deployment & monitoring"
      ],
      caseStudy: "Developed a custom financial management platform for a regional bank, resulting in 40% improved operational efficiency, 60% faster transaction processing, and 99.99% system uptime",
      integration: "Full integration capabilities with existing enterprise systems, cloud services (AWS, Azure, GCP), database systems, and third-party APIs with custom middleware development for seamless data flow",
      pricing: "Starter: $3,000 - Basic custom software solution\nProfessional: $12,000 - Advanced application development\nEnterprise: $20,000+ - Full-scale custom development"
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

  return (
    <div>
      <Hero
        title="The Peoples' Choice!"
        description="We focus on tailored marketing, sales, and technology solutions. We help startups, financial institutions, and NGOs transform their business with cutting-edge AI-powered solutions and services."
        videoBackground="/src/img/1470870_People_Business_3840x2160.mp4"
      />

      <section className="text-center mb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            To empower businesses with innovative AI-driven marketing solutions that create meaningful connections, drive sustainable growth, and deliver measurable results in the digital age.
          </p>
        </div>
      </section>

      {/* AI Service Showcase Section */}
      <section className="py-16 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Marketing Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leverage the power of artificial intelligence to transform your marketing strategy and drive exceptional results.
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
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Key Benefits:</h4>
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
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Integration:</h4>
                    <p className="text-sm text-muted-foreground">{service.integration}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Investment Plans:</h4>
                    <div className="space-y-3">
                      {service.pricing.split('\n').map((plan, index) => (
                        <div key={index} className={`p-3 rounded-lg ${index === 1 ? 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700' : ''}`}>
                          <p className="text-lg font-semibold text-purple-600">
                            {plan.split(' - ')[0]}
                            {index === 1 && <span className="ml-2 text-sm bg-purple-600 text-white px-2 py-1 rounded">Most Popular</span>}
                          </p>
                          <p className="text-sm text-muted-foreground">{plan.split(' - ')[1]}</p>
                          {index === 1 && <p className="text-sm text-purple-600 mt-1">Save 20% with annual billing</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href={
                    service.title === "Custom Website Development" ? "/services/web-development" :
                    service.title === "Analytics & Reporting Dashboards" ? "/services/analytics-dashboards" :
                    service.title === "Digital Marketing Services" ? "/services/digital-marketing" :
                    service.title === "Training & Support" ? "/services/training-support" :
                    "/services/web-development"
                  }>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="flex justify-center mt-8">
            <Link href="/services">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                View More Services
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Success Metrics Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">Our Impact</h3>
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
        </div>
      </section>

      

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose KemisDigital</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-500" />
                Precision Marketing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our AI-powered solutions deliver targeted campaigns that reach the right audience at the right time.</p>
              <Button>Learn More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Innovation Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Stay ahead with our cutting-edge AI marketing tools and strategies.</p>
              <Button>Explore Solutions</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      

      <section className="mb-16">
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