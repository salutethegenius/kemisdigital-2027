import Hero from "@/components/shared/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2,
  Palmtree,
  Rocket,
  HeartHandshake,
  ArrowRight,
  Shield,
  Target,
  BarChart,
  Brain,
  Gift,
  Share2
} from "lucide-react";
import { staggerChildren } from "@/lib/animations";

const services = {
  financial: {
    icon: Building2,
    title: "Financial Services",
    packages: [
      {
        title: "Basic Package",
        description: "Website development + social media setup",
        price: "$5,000",
        features: [
          "Professional website development",
          "Social media platform setup",
          "Basic SEO optimization",
          "Mobile responsiveness",
          "Content management system"
        ]
      },
      {
        title: "Pro Package",
        description: "CRM implementation + compliance workflows",
        price: "$12,000",
        features: [
          "Complete CRM implementation",
          "Custom compliance workflows",
          "Document management system",
          "Client portal integration",
          "Security features",
          "Staff training program"
        ]
      },
      {
        title: "Impact Package",
        description: "End-to-end digitization: Website, CRM, and automation",
        price: "Request Call",
        features: [
          "End-to-end digital transformation",
          "Custom website & CRM integration",
          "Advanced automation workflows",
          "Comprehensive analytics dashboard",
          "Custom API integrations",
          "24/7 premium support",
          "Full team training & onboarding"
        ]
      }
    ]
  },
  tourism: {
    icon: Palmtree,
    title: "Tourism Sector",
    packages: [
      {
        title: "Digital Presence",
        description: "Essential online presence for tourism businesses",
        price: "$4,500",
        features: [
          "Responsive website",
          "Booking integration",
          "Social media setup",
          "Local SEO",
          "Photo gallery"
        ]
      },
      {
        title: "Experience Package",
        description: "Enhanced digital experience platform",
        price: "$10,000",
        features: [
          "Virtual tours",
          "Booking management system",
          "Review integration",
          "Content marketing",
          "Social media management",
          "Analytics tracking"
        ]
      },
      {
        title: "Resort Elite",
        description: "Premium digital transformation for resorts",
        price: "Request Call",
        features: [
          "Custom booking platform",
          "Mobile app development",
          "AI-powered recommendations",
          "Multi-language support",
          "Advanced analytics",
          "Marketing automation",
          "24/7 support"
        ]
      }
    ]
  },
  startup: {
    icon: Rocket,
    title: "Startups",
    packages: [
      {
        title: "Launch Package",
        description: "Essential digital toolkit for startups",
        price: "$3,500",
        features: [
          "Landing page",
          "Basic branding",
          "Social media setup",
          "Email marketing",
          "Analytics setup"
        ]
      },
      {
        title: "Growth Package",
        description: "Scaling solution for growing startups",
        price: "$8,000",
        features: [
          "Full website development",
          "CRM integration",
          "Marketing automation",
          "Payment gateway",
          "Performance tracking",
          "Technical support"
        ]
      },
      {
        title: "Impact Package",
        description: "Complete digital infrastructure",
        price: "Request Call",
        features: [
          "Custom platform development",
          "Advanced automation",
          "Integration APIs",
          "Business intelligence",
          "Marketing suite",
          "Priority support",
          "Team training"
        ]
      }
    ]
  },
  ngo: {
    icon: HeartHandshake,
    title: "NGOs",
    packages: [
      {
        title: "Starter Package",
        description: "Donation-focused website + online payment gateway",
        price: "$4,000",
        features: [
          "Donation-optimized website",
          "Secure payment gateway integration",
          "Basic donor management",
          "Social media platform setup",
          "Content management system"
        ]
      },
      {
        title: "Growth Package",
        description: "Website + social media campaigns + analytics",
        price: "$7,500",
        features: [
          "Advanced website features",
          "Comprehensive social media campaigns",
          "Enhanced donor management",
          "Email automation system",
          "Analytics dashboard",
          "Impact reporting tools"
        ]
      },
      {
        title: "Impact Package",
        description: "Full digital transformation: Website, CRM, and dashboards",
        price: "Request Call",
        features: [
          "Custom platform development",
          "Advanced CRM implementation",
          "Automated campaign management",
          "Comprehensive impact dashboards",
          "Grant management system",
          "Full integration support",
          "Complete staff training"
        ]
      }
    ]
  }
};

const additionalServices = [
  {
    title: "Viral Campaigns",
    description: "Create engaging viral marketing campaigns that drive exponential growth",
    icon: Share2,
    price: "Request Call",
    features: [
      "Trend analysis and monitoring",
      "Viral content creation",
      "Influencer collaboration",
      "Social media optimization",
      "Campaign performance tracking"
    ]
  },
  {
    title: "Customer Reward Programs",
    description: "Build customer loyalty through innovative reward systems",
    icon: Gift,
    price: "Request Call",
    features: [
      "Points-based rewards",
      "Custom loyalty programs",
      "Digital rewards tracking",
      "Member engagement tools",
      "Analytics and reporting"
    ]
  },
  {
    title: "Email & SMS Advertising",
    description: "Direct marketing solutions with personalized messaging",
    icon: Mail,
    price: "Request Call",
    features: [
      "Automated email campaigns",
      "SMS marketing integration",
      "Personalized messaging",
      "A/B testing",
      "Response analytics"
    ]
  }
];

export default function Services() {
  return (
    <div>
      <Hero
        title="AI-Powered Solutions & Services"
        description="Comprehensive digital transformation packages tailored for Caribbean startups, financial institutions, NGOs, and tourism sector."
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
            {/* Sector Packages */}
            {Object.values(services).map((sector) => (
              <section key={sector.title} className="space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <sector.icon className="w-8 h-8 text-purple-600" />
                  <h2 className="text-3xl font-bold">{sector.title}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {sector.packages.map((pkg) => (
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
                              <ArrowRight className="w-4 h-4 text-purple-600" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}

            {/* Additional Services */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">Additional Services</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {additionalServices.map((service) => (
                  <Card key={service.title} className="border-2 border-purple-100 dark:border-purple-800 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-600">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <service.icon className="w-6 h-6 text-purple-600" />
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-purple-600 mb-6">{service.price}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-600" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={
                        service.title === "Analytics & Reporting Dashboards" ? "/services/analytics-dashboards" :
                        service.title === "Digital Marketing Services" ? "/services/digital-marketing" :
                        service.title === "Training & Support" ? "/services/training-support" :
                        "/services/web-development"
                      } className="w-full">
                        <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </motion.div>

          {/* CTA Section */}
          <Card className="mt-16">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="text-muted-foreground mb-6">
                  Book a free consultation to discuss how our AI-powered services can help your organization thrive in the digital age.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
