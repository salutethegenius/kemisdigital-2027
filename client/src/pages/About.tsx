import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Users, Target, Briefcase } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

export default function About() {
  const leadershipTeam = [
    {
      name: "Kenneth C. Moncur, CIPM",
      role: "President",
      description: "Expert in digital marketing with over 15 years of experience."
    },
    {
      name: "Sarah Johnson",
      role: "Vice President",
      description: "Specializes in social media strategy and content marketing."
    },
    {
      name: "Michael Thompson",
      role: "Director of Education",
      description: "Leads professional development and certification programs."
    }
  ];

  return (
    <div>
      <Hero
        title="About Us"
        description="Welcome to the Bahamas Digital Marketing Association (BDMA) – your partner in advancing digital marketing excellence across the Bahamas."
        showCTA={false}
      />

      <motion.section
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Foster Community"
            description="Build a vibrant community of digital marketing professionals"
            icon={Users}
          />
          <FeatureCard
            title="Provide Training"
            description="Offer access to certifications and educational resources"
            icon={Award}
          />
          <FeatureCard
            title="Set Standards"
            description="Promote and maintain ethical marketing practices"
            icon={Target}
          />
          <FeatureCard
            title="Industry Advocacy"
            description="Represent members in policy and best practices"
            icon={Briefcase}
          />
        </div>
      </motion.section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership</h2>
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
                  <p className="text-cyan-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Educational Excellence</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-cyan-500">•</span>
                  <span>Industry-leading training programs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cyan-500">•</span>
                  <span>Professional certifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cyan-500">•</span>
                  <span>Workshops and seminars</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Industry Support</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-cyan-500">•</span>
                  <span>Networking opportunities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cyan-500">•</span>
                  <span>Resource library access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cyan-500">•</span>
                  <span>Career development support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
