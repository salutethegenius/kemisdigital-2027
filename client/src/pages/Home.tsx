import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Target, Sparkles, Users, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
  return (
    <div>
      <Hero
        title="Transform Your Business with AI-Powered Marketing"
        description="KemisDigital combines cutting-edge artificial intelligence with expert marketing strategies to deliver exceptional results for your business."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <FeatureCard
          title="AI-Driven Insights"
          description="Leverage advanced analytics and machine learning for data-driven decisions"
          icon={Brain}
          items={[
            "Predictive Analytics",
            "Customer Behavior Analysis",
            "Market Trend Forecasting"
          ]}
        />
        <FeatureCard
          title="Performance Marketing"
          description="Optimize your campaigns with AI-powered targeting and automation"
          icon={TrendingUp}
          items={[
            "Automated Campaign Optimization",
            "Real-time Performance Tracking",
            "ROI Maximization"
          ]}
        />
        <FeatureCard
          title="Smart Content Creation"
          description="Generate engaging content with AI assistance"
          icon={Sparkles}
          items={[
            "AI Content Generation",
            "SEO Optimization",
            "Personalized Messaging"
          ]}
        />
      </motion.div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our AI Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-purple-500" />
                ChatGPT Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Enhance customer engagement with AI-powered chatbots and automated responses.</p>
              <Button>Learn More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-500" />
                Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Make data-driven decisions with our advanced AI analytics platform.</p>
              <Button>Explore Analytics</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16 bg-purple-600 text-white py-16 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Trusted by Innovative Brands</h2>
          <p className="max-w-2xl mx-auto">Join the growing list of businesses transforming their digital presence with KemisDigital.</p>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6">Transform your marketing strategy with the power of AI. Get in touch with us today.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" />
              <Button className="bg-purple-600 hover:bg-purple-700">Contact Us</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
