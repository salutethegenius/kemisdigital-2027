import Hero from "@/components/shared/Hero";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, ChevronRight } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

export default function Resources() {
  // Sample resources
  const resources = [
    {
      title: "Digital Marketing Playbook",
      description: "A comprehensive guide to building effective digital marketing strategies for businesses of all sizes.",
      type: "guide",
      format: "PDF",
      size: "4.2 MB",
      downloadLink: "#",
      isFeatured: true,
    },
    {
      title: "SEO Best Practices 2025",
      description: "Stay ahead of the curve with the latest search engine optimization techniques and algorithm changes.",
      type: "whitepaper",
      format: "PDF",
      size: "2.8 MB",
      downloadLink: "#",
      isFeatured: true,
    },
    {
      title: "Social Media Content Calendar Template",
      description: "Plan your social media content strategy with this ready-to-use template.",
      type: "template",
      format: "XLSX",
      size: "1.5 MB",
      downloadLink: "#",
      isFeatured: false,
    },
    {
      title: "Email Marketing Automation Workflow",
      description: "Visualize and implement effective email marketing automation sequences.",
      type: "template",
      format: "PDF",
      size: "3.1 MB",
      downloadLink: "#",
      isFeatured: false,
    },
    {
      title: "Digital Advertising Benchmark Report 2025",
      description: "Industry benchmarks for digital advertising performance across multiple channels.",
      type: "report",
      format: "PDF",
      size: "5.7 MB",
      downloadLink: "#",
      isFeatured: true,
    },
    {
      title: "Customer Journey Mapping Toolkit",
      description: "Visualize and optimize your customer's experience with these mapping tools.",
      type: "toolkit",
      format: "ZIP",
      size: "8.3 MB",
      downloadLink: "#",
      isFeatured: false,
    },
  ];

  // Webinars
  const webinars = [
    {
      title: "Mastering AI in Marketing Automation",
      date: "March 15, 2025",
      host: "Kenneth Moncur",
      description: "Learn how to leverage AI to create sophisticated marketing automation workflows.",
      registerLink: "#",
      isUpcoming: true,
    },
    {
      title: "Local SEO Strategies for Bahamian Businesses",
      date: "March 22, 2025",
      host: "Jeffery Ujumadu",
      description: "Discover techniques to improve your local search visibility in the Bahamas.",
      registerLink: "#",
      isUpcoming: true,
    },
    {
      title: "Data-Driven Content Marketing",
      date: "February 28, 2025",
      host: "Mauro Hurtado",
      description: "How to use data analytics to guide your content marketing decisions.",
      recordingLink: "#",
      isUpcoming: false,
    },
  ];

  function getTypeBadgeColor(type: string) {
    const colors: Record<string, string> = {
      guide: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
      whitepaper: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
      template: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
      report: "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100",
      toolkit: "bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100",
    };
    return colors[type.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }

  return (
    <div>
      <Hero
        title="Resources"
        description="Access our library of digital marketing guides, templates, and reports to help you grow your business."
        showCTA={false}
        pageContext="tourism"
      />

      {/* Featured Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Resources</h2>
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {resources
              .filter(resource => resource.isFeatured)
              .map((resource, index) => (
                <Card key={index} className="overflow-hidden border-2 border-[#00A0E3]/10 hover:border-[#00A0E3]/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className={getTypeBadgeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                      <span className="text-sm text-gray-500">{resource.format} • {resource.size}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-6">{resource.description}</p>
                    <Button asChild variant="default" className="w-full">
                      <a href={resource.downloadLink}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {webinars
              .filter(webinar => webinar.isUpcoming)
              .map((webinar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {webinar.date}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                      <p className="text-[#00A0E3] mb-2">Hosted by: {webinar.host}</p>
                      <p className="text-gray-600 mb-6">{webinar.description}</p>
                      <Button asChild variant="default">
                        <a href={webinar.registerLink}>
                          Register Now
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Resource Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="flex flex-col md:flex-row overflow-hidden">
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="outline" className={getTypeBadgeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                    <span className="text-sm text-gray-500">{resource.format}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{resource.size}</span>
                    <Button asChild variant="ghost" size="sm">
                      <a href={resource.downloadLink} className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Webinar Recordings */}
      <section className="py-16 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Webinar Recordings</h2>
          <div className="space-y-6">
            {webinars
              .filter(webinar => !webinar.isUpcoming)
              .map((webinar, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="secondary">
                        Recorded: {webinar.date}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                    <p className="text-[#00A0E3] mb-2">Hosted by: {webinar.host}</p>
                    <p className="text-gray-600 mb-6">{webinar.description}</p>
                    <Button asChild variant="default">
                      <a href={webinar.recordingLink} className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Watch Recording
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="group">
              View All Webinar Recordings
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
