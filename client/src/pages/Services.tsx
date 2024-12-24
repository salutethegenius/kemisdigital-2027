import Hero from "@/components/shared/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Globe,
  Target,
  Code,
  ArrowRight,
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
        price: "$5,000",
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
        price: "$10,000",
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
    <div>
      <Hero
        title="AI-Powered Solutions & Services"
        description="Comprehensive digital transformation packages tailored for Caribbean businesses."
        showCTA={false}
      />

      <div className="py-16 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="space-y-16"
          >
            {/* Service Packages */}
            {Object.values(services).map((service) => (
              <section key={service.title} className="space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <service.icon className="w-8 h-8 text-purple-600" />
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {service.packages.map((pkg) => (
                    <Card key={pkg.title} className="relative overflow-hidden border-2 border-purple-100 dark:border-purple-800 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-600">
                      <CardHeader>
                        <CardTitle className="text-xl mb-2">{pkg.title}</CardTitle>
                        <p className="text-muted-foreground">{pkg.description}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-purple-600 mb-6">{pkg.price}</p>
                        <ul className="space-y-3">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-purple-600" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact">
                          <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                            Get Started
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>

          {/* CTA Section */}
          <Card className="mt-16">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="text-muted-foreground mb-6">
                  Book a free consultation to discuss how our AI-powered services can help your organization thrive in the digital age.
                </p>
                <Link href="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}