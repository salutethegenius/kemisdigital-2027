import Hero from "@/components/shared/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Globe,
  Target,
  Code,
  Sparkles
} from "lucide-react";
import { staggerChildren } from "@/lib/animations";

const services = {
  digitalSales: {
    icon: Globe,
    title: "Digital Sales",
    packages: [
      {
        title: "Essential Package",
        description: "Complete digital sales solution with PPC management",
        price: "$1,499 + $300 ad budget",
        features: [
          "Professional landing page design",
          "Complete sales funnel setup",
          "PPC campaign setup and management",
          "Monthly campaign optimization",
          "Performance tracking & reporting",
          "Lead capture integration"
        ]
      },
      {
        title: "Pro Package",
        description: "Enhanced features & priority support",
        price: "$1,999 + $500 ad budget",
        features: [
          "Everything in Essential Package",
          "Priority support",
          "Advanced analytics dashboard",
          "A/B testing implementation",
          "Conversion optimization",
          "Monthly strategy sessions"
        ]
      }
    ]
  },
  startup: {
    icon: Target,
    title: "Startup Growth Package",
    packages: [
      {
        title: "Growth Package",
        description: "Comprehensive digital marketing solution for startups",
        price: "$2,497 + $300 ad budget",
        features: [
          "Evergreen marketing funnel",
          "Strategic email marketing",
          "Professional content creation",
          "Social media management",
          "High-converting landing pages",
          "PPC campaign setup & management"
        ]
      },
      {
        title: "Scale Package",
        description: "Advanced features for rapid growth",
        price: "$3,497 + $500 ad budget",
        features: [
          "Everything in Growth Package",
          "Advanced automation setup",
          "Lead nurturing sequences",
          "Performance analytics dashboard",
          "Marketing strategy sessions",
          "Priority support & consulting"
        ]
      }
    ]
  },
  tourism: {
    icon: Code,
    title: "Tourism Sector Solutions",
    packages: [
      {
        title: "Essential Package",
        description: "Digital presence for tourism businesses",
        price: "$4,997",
        features: [
          "Custom booking system integration",
          "Multi-language support",
          "Virtual tour capabilities",
          "Mobile booking optimization",
          "Local SEO optimization"
        ]
      },
      {
        title: "Premium Package",
        description: "Advanced features & marketing",
        price: "Contact Us",
        features: [
          "Everything in Essential Package",
          "Advanced booking features",
          "Review management system",
          "Marketing automation",
          "Social media integration",
          "Analytics dashboard"
        ]
      }
    ]
  }
};

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="AI-Powered Solutions & Services"
        description="Comprehensive digital transformation packages tailored for Caribbean businesses."
        showCTA={false}
        heroImage="/images/heroes/services-hero.jpg"
        pageContext="tourism"
      />

      {/* Services Showcase Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="space-y-12"
          >
            {Object.values(services).map((service, index) => (
              <section 
                key={service.title} 
                className={`py-16 ${
                  index % 2 === 0 ? 'bg-purple-50 dark:bg-purple-900/10' : 'bg-background'
                }`}
              >
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <service.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">{service.title}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {service.packages.map((pkg) => (
                      <Card 
                        key={pkg.title} 
                        className="relative overflow-hidden border-2 border-purple-100 dark:border-purple-800 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg"
                      >
                        <CardHeader className="space-y-2">
                          <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                          <p className="text-muted-foreground">{pkg.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-purple-600">{pkg.price}</span>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-lg">Features:</h4>
                            <ul className="space-y-3">
                              {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                  <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm leading-tight">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Link href="/contact" className="block">
                            <Button 
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2"
                            >
                              Get Started
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </motion.div>

          {/* Call to Action Section */}
          <section className="mt-24 bg-purple-50 dark:bg-purple-900/10 py-16">
            <Card>
              <CardContent className="py-12">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
                  <p className="text-muted-foreground mb-8">
                    Book a free consultation to discuss how our AI-powered services can help your organization thrive in the digital age.
                  </p>
                  <Link href="/contact">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8">
                      Schedule Consultation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}