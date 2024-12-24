import Hero from "@/components/shared/Hero";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerChildren } from "@/lib/animations";
import { Globe, Target, Code, Sparkles } from "lucide-react";

export default function AILabs() {
  const innovationProjects = [
    {
      icon: Globe,
      title: "Digital Sales",
      description: "Complete digital sales solution including landing page, sales funnel, and professional PPC campaign management for maximum ROI.",
      status: "Released",
      tech: ["Landing Page", "Sales Funnel", "PPC", "Analytics"],
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
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      <Hero
        title="KemisDigital Innovation Lab"
        description="Welcome to our AI Innovation Hub - where cutting-edge artificial intelligence meets practical marketing solutions. Explore our latest projects pushing the boundaries of digital marketing technology."
      />

      <section className="py-16 bg-purple-50 dark:bg-purple-900/10">
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
                className="border-2 border-purple-100 dark:border-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-600"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <project.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className={`${getStatusColor(project.status)} text-white mb-4`}>
                    {project.status}
                  </Badge>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Investment:</h4>
                    <p className="text-lg font-semibold text-purple-600">{project.impact}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
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
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}