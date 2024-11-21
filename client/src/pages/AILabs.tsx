import Hero from "@/components/shared/Hero";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerChildren } from "@/lib/animations";
import { Cpu, Code, Sparkles, Bot, Brain, LineChart } from "lucide-react";

export default function AILabs() {
  const innovationProjects = [
    {
      icon: Brain,
      title: "NeuralSense Marketing Engine",
      description: "AI-powered predictive analytics engine for customer behavior analysis and campaign optimization",
      status: "Released",
      tech: ["TensorFlow", "Python", "AWS", "React"],
      impact: "45% reduction in customer acquisition costs with 30% higher campaign ROI",
    },
    {
      icon: Sparkles,
      title: "ContentGenius AI",
      description: "Advanced content generation platform leveraging latest language models for marketing copy",
      status: "Beta",
      tech: ["GPT-4", "Node.js", "MongoDB", "Next.js"],
      impact: "4x faster content creation with 95% user satisfaction rate",
    },
    {
      icon: LineChart,
      title: "MarketMind Analytics",
      description: "Real-time market intelligence and competitor analysis platform using machine learning",
      status: "Released",
      tech: ["Python", "scikit-learn", "PostgreSQL", "Vue.js"],
      impact: "40% increase in market insight accuracy and decision-making speed",
    },
    {
      icon: Bot,
      title: "ROI Maximizer",
      description: "Smart budget allocation and ROI optimization system powered by AI",
      status: "Beta",
      tech: ["Python", "TensorFlow", "SQL", "D3.js"],
      impact: "35% improvement in marketing ROI across campaigns",
    },
    {
      icon: Cpu,
      title: "AudienceIQ Platform",
      description: "Neural network-powered audience segmentation and targeting system",
      status: "Released",
      tech: ["PyTorch", "FastAPI", "Redis", "React"],
      impact: "50% improvement in targeting accuracy and engagement",
    },
    {
      icon: Code,
      title: "AutoCampaign Builder",
      description: "Automated campaign creation and optimization using reinforcement learning",
      status: "Beta",
      tech: ["TensorFlow", "Django", "Elasticsearch", "React"],
      impact: "60% reduction in campaign setup time with improved performance",
    },
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
                    <h4 className="font-semibold mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Potential Impact:</h4>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
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
