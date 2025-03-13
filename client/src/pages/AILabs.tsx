import { useState } from "react";
import Hero from "@/components/shared/Hero";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerChildren } from "@/lib/animations";
import { Globe, Target, Code, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AIServicePaymentModal from "@/components/payment/AIServicePaymentModal";

export default function AILabs() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    price: number;
    description: string;
  } | null>(null);

  const innovationProjects = [
    {
      icon: Globe,
      title: "Digital Sales",
      description: "Complete digital sales solution including landing page, sales funnel, and professional PPC campaign management for maximum ROI.",
      status: "Released",
      tech: ["Landing Page", "Sales Funnel", "PPC", "Analytics"],
      price: 1499,
      adBudget: 300,
      impact: "$1,499 + $300 minimum ad budget",
      benefits: [
        "Professional landing page design",
        "Complete sales funnel setup",
        "PPC campaign setup and management",
        "Monthly campaign optimization",
        "Performance tracking & reporting"
      ]
    },
    {
      icon: Target,
      title: "Startup Growth Package",
      description: "Comprehensive digital marketing solution for startups, including evergreen funnel, content creation, and multi-channel marketing.",
      status: "Released",
      tech: ["Content Creation", "Social Media", "Email Marketing", "PPC"],
      price: 2497,
      adBudget: 300,
      impact: "$2,497 + $300 minimum ad budget",
      benefits: [
        "Evergreen marketing funnel",
        "Strategic email marketing",
        "Professional content creation",
        "Social media management",
        "High-converting landing pages"
      ]
    },
    {
      icon: Code,
      title: "Tourism Sector Solutions",
      description: "Tailored digital solutions for tourism businesses, combining local market expertise with cutting-edge technology for maximum impact.",
      status: "Released",
      tech: ["Booking Systems", "Multi-language", "SEO", "Analytics"],
      price: 5000,
      impact: "Starting from $5,000",
      benefits: [
        "Custom booking system integration",
        "Multi-language support",
        "Virtual tour capabilities",
        "Mobile booking optimization",
        "Local SEO optimization"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Released":
        return "bg-green-500";
      case "Beta":
        return "bg-blue-500";
      case "In Development":
        return "bg-[#00A0E3]";
      default:
        return "bg-gray-500";
    }
  };

  const handlePaymentClick = (project: any) => {
    setSelectedService({
      title: project.title,
      price: project.price,
      description: project.description
    });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    toast({
      title: "Payment Successful",
      description: `Thank you for your purchase! Our team will contact you shortly to get started.`,
    });
    setIsPaymentModalOpen(false);
  };

  return (
    <div>
      <Hero
        title="KemisDigital Innovation Lab"
        description="Welcome to our AI Innovation Hub - where cutting-edge artificial intelligence meets practical marketing solutions. Explore our latest projects pushing the boundaries of digital marketing technology."
      />

      {selectedService && (
        <AIServicePaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={handlePaymentSuccess}
          serviceName={selectedService.title}
          servicePrice={selectedService.price}
          serviceDescription={selectedService.description}
        />
      )}

      <section className="py-16 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {innovationProjects.map((project) => (
              <Card
                key={project.title}
                className="border-2 border-[#00A0E3]/20 dark:border-[#00A0E3]/30 transition-all duration-300 hover:shadow-xl hover:border-[#00A0E3] dark:hover:border-[#00A0E3] flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#00A0E3]/10 dark:bg-[#00A0E3]/20 rounded-lg">
                      <project.icon className="w-6 h-6 text-[#00A0E3] dark:text-[#00A0E3]" />
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Badge className={`${getStatusColor(project.status)} text-white mb-4`}>
                    {project.status}
                  </Badge>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Investment:</h4>
                    <p className="text-lg font-semibold text-[#00A0E3]">{project.impact}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#F7BE00] flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-4 pt-4 border-t">
                  <Button 
                    className="w-full bg-[#00A0E3] hover:bg-[#0085bb]"
                    onClick={() => handlePaymentClick(project)}
                  >
                    Purchase Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
