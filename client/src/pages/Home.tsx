import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe, Gift, Share2, Brain, Target, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
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
