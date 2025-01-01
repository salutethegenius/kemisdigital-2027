import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Target, Sparkles, Code, MessageSquare, LineChart } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

export default function About() {
  const leadershipTeam = [
    {
      name: "Kenneth C. Moncur, CIPM",
      role: "Founder & CEO, Project Lead",
      description: "Digital transformation pioneer focused on AI integration and marketing innovation across the Caribbean."
    },
    {
      name: "Jeffery Nikolai Ujumadu",
      role: "CTO & Innovation Director", 
      description: "Technical architect specializing in scalable web solutions and blockchain implementations."
    },
    {
      name: "Mauro Hurtado",
      role: "Digital Marketing Specialist",
      description: "Data-driven marketer focused on AI campaign optimization and market analysis."
    },
    {
      name: "Jason Sawyer",
      role: "Customer Success Agent",
      description: "Customer experience specialist focused on AI-enhanced service delivery."
    },
    {
      name: "Daodu Olaoluwa",
      role: "Graphic Design Specialist",
      description: "Creative designer specializing in brand identity and UI/UX for Caribbean markets."
    },
    {
      name: "Naomi Dohiling",
      role: "Social Media Manager",
      description: "Social strategy expert focused on AI-powered content optimization."
    },
    {
      name: "Angel Andonov",
      role: "Email Marketing Specialist",
      description: "Email campaign strategist specializing in automated marketing sequences."
    },
    {
    name: "Mike Khlebas",
    role: "Digital Strategist",
    description: "Digital transformation expert specializing in online business growth strategies."
    },
    {
    name: "Tony S.",
    role: "Backend Framework Architect",
    description: "Framework architecture specialist focused on scalable backend solutions."
    }
  ];
  

  return (
    <div>
      <Hero
        title="About KemisDigital"
        description="Pioneering the future of marketing with artificial intelligence and data-driven strategies that deliver exceptional results."
        showCTA={false}
      />

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Our Vision</h2>
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard
              title="Innovation First"
              description="Leading the AI marketing revolution with cutting-edge solutions"
              icon={Brain}
            />
            <FeatureCard
              title="Client Success"
              description="Delivering measurable results through AI-powered strategies"
              icon={Target}
            />
            <FeatureCard
              title="Technology Excellence"
              description="Leveraging advanced AI tools for marketing automation"
              icon={Sparkles}
            />
            <FeatureCard
              title="Data-Driven Approach"
              description="Making informed decisions with AI analytics"
              icon={LineChart}
            />
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Meet our A-Players!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-purple-600 mb-2">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Our Expertise</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">AI Marketing Solutions</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>Predictive Analytics & Targeting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>Automated Campaign Optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>AI-Powered Content Generation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Client Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>Enhanced ROI Through AI Optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>Real-time Performance Analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>Personalized Marketing Strategies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}