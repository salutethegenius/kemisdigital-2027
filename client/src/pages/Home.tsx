import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
  const aiServices = [
    {
      icon: Cpu,
      title: "AI-Powered Content Generation",
      description: "Create engaging, personalized content at scale with our advanced AI algorithms",
      benefits: [
        "40% faster content creation",
        "Multi-language support for global reach",
        "Brand voice consistency across channels",
        "Automated SEO optimization",
        "Dynamic content personalization",
      ],
      caseStudy: "E-commerce client achieved 3x engagement with AI-generated product descriptions",
      integration: "Seamlessly connects with WordPress, Shopify, and major CMS platforms",
    },
    {
      icon: BarChart,
      title: "Predictive Analytics",
      description: "Transform data into actionable insights with our AI-driven analytics platform",
      benefits: [
        "95% accuracy in trend forecasting",
        "Real-time market analysis",
        "Customer behavior prediction",
        "Competitive intelligence",
        "Revenue forecasting",
      ],
      caseStudy: "Financial services firm increased ROI by 45% using predictive insights",
      integration: "Integrates with Google Analytics, Adobe Analytics, and custom data sources",
    },
    {
      icon: Rocket,
      title: "Automated Campaign Management",
      description: "Streamline your marketing operations with intelligent automation",
      benefits: [
        "85% reduction in campaign setup time",
        "Smart budget allocation",
        "Cross-channel coordination",
        "Performance monitoring",
        "Automated A/B testing",
      ],
      caseStudy: "Retail chain automated 90% of campaign workflows, saving 20 hours weekly",
      integration: "Works with Facebook Ads, Google Ads, and email marketing platforms",
    },
    {
      icon: Users,
      title: "Personalized Marketing",
      description: "Deliver tailored experiences that resonate with each customer segment",
      benefits: [
        "2x increase in conversion rates",
        "Dynamic content adaptation",
        "Individual journey mapping",
        "Behavioral targeting",
        "Custom recommendation engine",
      ],
      caseStudy: "Travel company achieved 65% higher engagement with personalized campaigns",
      integration: "Compatible with major CRM systems and marketing automation tools",
    },
    {
      icon: Zap,
      title: "Real-time Optimization",
      description: "Continuously improve performance with AI-driven optimization",
      benefits: [
        "30% improvement in campaign ROI",
        "Instant performance insights",
        "Automated bid management",
        "Creative optimization",
        "Landing page testing",
      ],
      caseStudy: "SaaS company reduced CAC by 35% through real-time optimization",
      integration: "Integrates with major ad platforms and analytics tools",
    },
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
        title="Transform Your Business with AI-Powered Marketing"
        description="KemisDigital delivers cutting-edge AI marketing solutions that drive growth, enhance customer engagement, and maximize ROI through personalized strategies."
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
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Integration:</h4>
                    <p className="text-sm text-muted-foreground">{service.integration}</p>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

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

      <section className="mb-16 bg-purple-600 text-white py-16 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="max-w-2xl mx-auto">Join innovative businesses leveraging our AI marketing solutions.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((partner) => (
            <div key={partner} className="bg-white rounded-lg p-4 aspect-square flex items-center justify-center">
              <p className="text-purple-600 font-semibold">Partner {partner}</p>
            </div>
          ))}
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