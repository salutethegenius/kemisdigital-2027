import Hero from "@/components/shared/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Shield, Book, Globe, Users, Target, Award } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

export default function Advocacy() {
  const advocacyGoals = [
    {
      icon: Shield,
      title: "Industry Standards",
      description: "Promoting ethical standards and best practices in digital marketing"
    },
    {
      icon: Book,
      title: "Digital Literacy",
      description: "Increasing digital literacy across the Bahamas"
    },
    {
      icon: Globe,
      title: "Policy Engagement",
      description: "Engaging with policymakers on digital marketing regulations"
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Fostering a strong digital marketing community"
    },
    {
      icon: Target,
      title: "Market Growth",
      description: "Supporting the growth of the digital marketing industry"
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Advocating for professional standards and certification"
    }
  ];

  const initiatives = [
    {
      title: "Government Relations",
      content: "Working closely with government bodies to shape policies that affect digital marketing practices and ensuring regulations support industry growth while protecting consumer interests."
    },
    {
      title: "Education Initiatives",
      content: "Partnering with educational institutions to develop curriculum standards for digital marketing education and promoting digital literacy programs."
    },
    {
      title: "Industry Research",
      content: "Conducting and publishing research on digital marketing trends, consumer behavior, and industry best practices in the Bahamas."
    },
    {
      title: "Professional Standards",
      content: "Developing and maintaining professional standards for digital marketing practices, including ethical guidelines and certification requirements."
    }
  ];

  return (
    <div>
      <Hero
        title="Advocacy"
        description="Supporting and advancing the interests of digital marketers while promoting ethical practices and industry growth in the Bahamas."
        showCTA={false}
        pageContext="tourism"
      />

      <motion.section
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Our Advocacy Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advocacyGoals.map((goal) => (
            <Card key={goal.title} className="border-2 border-[#00A0E3]/10 dark:border-[#00A0E3]/30 hover:border-[#00A0E3]/30 hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <goal.icon className="w-6 h-6 text-[#00A0E3] mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{goal.title}</h3>
                    <p className="text-muted-foreground">{goal.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <section className="mb-16">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Current Initiatives</h2>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {initiatives.map((initiative, index) => (
                <AccordionItem key={initiative.title} value={`item-${index}`}>
                  <AccordionTrigger>{initiative.title}</AccordionTrigger>
                  <AccordionContent>{initiative.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Policy Positions</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-[#00A0E3]">•</span>
                <span>Support for data privacy regulations that protect consumers while enabling business growth</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#00A0E3]">•</span>
                <span>Advocacy for digital infrastructure development in the Bahamas</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#00A0E3]">•</span>
                <span>Promotion of fair competition in digital advertising</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#00A0E3]">•</span>
                <span>Support for small business digital transformation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
            <p className="text-gray-600 mb-4">
              Join our advocacy efforts and help shape the future of digital marketing in the Bahamas. Here's how you can participate:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start space-x-3">
                <span className="text-[#F7BE00]">•</span>
                <span>Join our advocacy committees</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#F7BE00]">•</span>
                <span>Participate in industry surveys</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#F7BE00]">•</span>
                <span>Attend policy forums</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#F7BE00]">•</span>
                <span>Share your expertise</span>
              </li>
            </ul>
            <Button className="w-full">Join Our Advocacy Network</Button>
          </CardContent>
        </Card>
      </motion.section>

      <section className="mb-16">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Stay Informed</h2>
            <p className="text-gray-600 mb-6">
              Keep up to date with our advocacy efforts and industry developments. Subscribe to our advocacy newsletter for regular updates on policy changes, initiatives, and opportunities to get involved.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A0E3]"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
