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
  Zap
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
      description: "Create engaging, personalized content at scale",
      benefits: [
        "SEO-optimized content",
        "Multi-language support",
        "Brand voice consistency"
      ]
    },
    {
      icon: BarChart,
      title: "Predictive Analytics",
      description: "Make data-driven decisions with AI insights",
      benefits: [
        "Customer behavior analysis",
        "Market trend forecasting",
        "ROI optimization"
      ]
    },
    {
      icon: Rocket,
      title: "Automated Campaign Management",
      description: "Streamline your marketing operations",
      benefits: [
        "Smart scheduling",
        "Performance monitoring",
        "Budget optimization"
      ]
    },
    {
      icon: Users,
      title: "Personalized Marketing",
      description: "Deliver tailored experiences to every customer",
      benefits: [
        "Dynamic content",
        "Behavioral targeting",
        "Customer journey mapping"
      ]
    },
    {
      icon: Zap,
      title: "Real-time Optimization",
      description: "Continuously improve campaign performance",
      benefits: [
        "A/B testing",
        "Performance analytics",
        "Automated adjustments"
      ]
    }
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
              <Card key={service.title} className="border-2 border-purple-100 dark:border-purple-800">
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
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
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
            "Automated Workflows"
          ]}
        />
        <FeatureCard
          title="SMS Campaigns"
          description="Targeted mobile messaging that drives engagement"
          icon={MessageSquare}
          items={[
            "Personalized Messages",
            "Campaign Scheduling",
            "Response Analytics"
          ]}
        />
        <FeatureCard
          title="Website Development"
          description="Custom websites optimized for conversion and user experience"
          icon={Globe}
          items={[
            "Responsive Design",
            "SEO Optimization",
            "Performance Metrics"
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
            "Engagement Tracking"
          ]}
        />
        <FeatureCard
          title="Social Media Management"
          description="Strategic social media presence with AI insights"
          icon={Share2}
          items={[
            "Content Calendar",
            "Analytics Dashboard",
            "Engagement Optimization"
          ]}
        />
        <FeatureCard
          title="AI Strategy Consulting"
          description="Expert guidance for digital transformation"
          icon={Brain}
          items={[
            "Market Analysis",
            "Strategy Development",
            "Implementation Support"
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
