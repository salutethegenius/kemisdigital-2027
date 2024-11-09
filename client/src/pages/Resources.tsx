import Hero from "@/components/shared/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Book, Video, FileText, Tool } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

export default function Resources() {
  const tools = [
    {
      category: "AI Tools",
      items: [
        { name: "ChatGPT", description: "AI-powered content generation and assistance" },
        { name: "Notion AI", description: "Intelligent workspace and note-taking" },
        { name: "Copy.ai", description: "AI copywriting and content creation" }
      ]
    },
    {
      category: "Analytics",
      items: [
        { name: "Google Analytics", description: "Web analytics and tracking" },
        { name: "Hotjar", description: "User behavior analysis and heatmaps" },
        { name: "SEMrush", description: "SEO and competitive analysis" }
      ]
    },
    {
      category: "Social Media",
      items: [
        { name: "Hootsuite", description: "Social media management platform" },
        { name: "Buffer", description: "Social media scheduling and analytics" },
        { name: "Canva", description: "Graphic design for social media" }
      ]
    }
  ];

  return (
    <div>
      <Hero
        title="Resources"
        description="Access our comprehensive collection of digital marketing tools, guides, and educational materials."
        showCTA={false}
      />

      <Tabs defaultValue="tools" className="mb-16">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
          <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
          <TabsTrigger value="guides">Guides & Templates</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>

        <TabsContent value="tools">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {tools.map((category) => (
              <Card key={category.category}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Tool className="w-5 h-5 mr-2 text-cyan-500" />
                    {category.category}
                  </h3>
                  <ul className="space-y-4">
                    {category.items.map((tool) => (
                      <li key={tool.name}>
                        <h4 className="font-semibold">{tool.name}</h4>
                        <p className="text-gray-600 text-sm">{tool.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="guides">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-cyan-500" />
                  Marketing Guides
                </h3>
                <ul className="space-y-2">
                  <li>Social Media Strategy Guide</li>
                  <li>Email Marketing Best Practices</li>
                  <li>SEO Optimization Checklist</li>
                  <li>Content Marketing Playbook</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-cyan-500" />
                  Templates
                </h3>
                <ul className="space-y-2">
                  <li>Marketing Plan Template</li>
                  <li>Social Media Calendar</li>
                  <li>Content Brief Template</li>
                  <li>Campaign Tracking Sheet</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="webinars">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Video className="w-5 h-5 mr-2 text-cyan-500" />
                  Upcoming Webinars
                </h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-semibold">Digital Marketing Trends 2024</h4>
                    <p className="text-gray-600">Date: March 15, 2024</p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Advanced SEO Techniques</h4>
                    <p className="text-gray-600">Date: April 1, 2024</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Recorded Sessions</h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-semibold">Social Media Marketing Masterclass</h4>
                    <p className="text-gray-600">Duration: 1h 30min</p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Email Marketing Automation</h4>
                    <p className="text-gray-600">Duration: 1h 15min</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="research">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Industry Reports</h3>
                <ul className="space-y-2">
                  <li>Bahamas Digital Marketing Report 2024</li>
                  <li>Social Media Usage Statistics</li>
                  <li>E-commerce Trends Analysis</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Case Studies</h3>
                <ul className="space-y-2">
                  <li>Local Business Success Stories</li>
                  <li>Campaign Performance Analysis</li>
                  <li>ROI Optimization Studies</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Market Research</h3>
                <ul className="space-y-2">
                  <li>Consumer Behavior Insights</li>
                  <li>Digital Adoption Trends</li>
                  <li>Competitive Analysis</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
