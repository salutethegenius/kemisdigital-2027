import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Mail,
  MessageSquare,
  Globe,
  Gift,
  Share2,
  Brain,
  Target,
  Sparkles,
  Cpu,
  BarChart,
  Rocket,
  Users,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Infinity,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
  const aiServices = [
    {
      icon: Globe,
      title: "Custom Website Development",
      description: "Enterprise-grade, secure websites with integrated client portals tailored for financial institutions and NGOs. Our solutions prioritize compliance, user experience, and seamless integration capabilities.",
      benefits: [
        "Bank-grade SSL security with advanced encryption",
        "WCAG 2.1 ADA compliance and accessibility features",
        "Customized client portals with role-based access",
        "Multi-currency payment gateway integration",
        "Progressive Web App (PWA) capabilities",
        "Real-time data synchronization",
        "Automated backup systems"
      ],
      caseStudy: "Caribbean financial institution achieved 200% increase in digital client onboarding and 45% reduction in support tickets through our custom portal solution",
      integration: "Seamless integration with major banking systems, payment processors, and CRM platforms including Stripe, PayPal, Salesforce, and core banking systems",
      pricing: "Basic: $3,000 - Simple website with basic integrations\nPro: $6,000 - Full-featured portal and payment system\nEnterprise: $10,000+ - Custom solutions with advanced features"
    },
    {
      icon: Target,
      title: "Digital Marketing Campaigns",
      description: "Data-driven marketing campaigns specifically designed for financial services and NGOs in the Caribbean region. We combine AI-powered targeting with local market expertise.",
      benefits: [
        "AI-optimized PPC campaign management",
        "Industry-specific LinkedIn targeting strategies",
        "Local SEO optimization for Caribbean markets",
        "Multi-channel social media campaigns",
        "Community engagement automation",
        "Compliance-aware content strategy",
        "ROI tracking and analytics"
      ],
      caseStudy: "Regional NGO achieved 300% increase in qualified leads and 150% boost in donor engagement through our targeted campaign strategy",
      integration: "Full integration with major ad platforms, social media tools, and analytics systems including Google Ads, Meta Business Suite, LinkedIn Campaign Manager, and HubSpot",
      pricing: "Starter: $2,000/month - Essential marketing suite\nGrowth: $4,000/month - Comprehensive campaign management\nPremium: $6,000+/month - Full-service marketing solution"
    },
    {
      icon: Cpu,
      title: "Workflow Automation",
      description: "Transform your operations with AI-powered automation solutions designed specifically for financial institutions and NGOs. Streamline processes while maintaining compliance and security.",
      benefits: [
        "Intelligent client onboarding system",
        "AI-powered document verification",
        "Automated grant application processing",
        "Custom report generation and analytics",
        "Workflow optimization with AI insights",
        "Compliance monitoring automation",
        "Integration with existing systems"
      ],
      caseStudy: "Major NGO achieved 75% reduction in processing time and 90% accuracy improvement in document processing through our automation platform",
      integration: "Seamless integration with existing workflow systems, document management platforms, and business intelligence tools including Microsoft 365, DocuSign, and custom enterprise systems",
      pricing: "Basic Automation: $2,500 - Essential workflow automation\nAdvanced: $5,000 - Comprehensive process automation\nEnterprise: $7,500+ - Custom automation solutions"
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
        title="The Peoples' Choice! "
        description="We focus on tailored marketing, sales, and technology solutions. We help startups, financial institutions, and NGOs transform their business with cutting-edge AI-powered solutions and services."
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
                    <h4 className="font-semibold mb-2">Investment:</h4>
                    <p className="text-lg font-semibold text-purple-600">{service.pricing}</p>
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <FeatureCard
          title="Email Marketing"
          description="AI-powered email campaigns that deliver personalized content at scale"
          icon={Mail}
          items={[
            "Smart Segmentation",
            "A/B Testing",
            "Automated Workflows",
          ]}
        />
        <FeatureCard
          title="SMS Campaigns"
          description="Targeted mobile messaging that drives engagement"
          icon={MessageSquare}
          items={[
            "Personalized Messages",
            "Campaign Scheduling",
            "Response Analytics",
          ]}
        />
        <FeatureCard
          title="Website Development"
          description="Custom websites optimized for conversion and user experience"
          icon={Globe}
          items={[
            "Responsive Design",
            "SEO Optimization",
            "Performance Metrics",
          ]}
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <FeatureCard
          title="Customer Rewards"
          description="Build loyalty through smart reward programs"
          icon={Gift}
          items={[
            "Points System",
            "Custom Rewards",
            "Engagement Tracking",
          ]}
        />
        <FeatureCard
          title="Social Media Management"
          description="Strategic social media presence with AI insights"
          icon={Share2}
          items={[
            "Content Calendar",
            "Analytics Dashboard",
            "Engagement Optimization",
          ]}
        />
        <FeatureCard
          title="AI Strategy Consulting"
          description="Expert guidance for digital transformation"
          icon={Brain}
          items={[
            "Market Analysis",
            "Strategy Development",
            "Implementation Support",
          ]}
        />
      </motion.div>

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