import ServiceLayout from "@/components/services/ServiceLayout";
import PortfolioGrid from "@/components/shared/PortfolioGrid";

const portfolioProjects = [
  {
    title: "WaitList Pro",
    description: "Event management platform with an AI-powered chatbot for attendee management and lead collection",
  },
  {
    title: "GitHub Scanner",
    description: "Efficient repository searching and bookmarking tool for streamlined project discovery",
  },
  {
    title: "Lawbey.com",
    description: "Comprehensive digital platform for accessing Bahamas legal resources",
  },
  {
    title: "Start.kemis.net",
    description: "Targeted email marketing service for local Bahamian audiences",
  },
  {
    title: "Autodialer",
    description: "Intelligent calling system optimizing outreach efficiency",
  },
  {
    title: "Smart Contract Escrow",
    description: "Blockchain-powered payment protection platform for project investments",
  },
  {
    title: "BDMA Bahamas",
    description: "Official platform for the Bahamas Digital Marketing Association",
  },
  {
    title: "GitNews",
    description: "Centralized news aggregator for curated local updates",
  },
  {
    title: "KemisAcademy.com",
    description: "Educational platform for digital marketing and entrepreneurship training",
  },
  {
    title: "DonateBubble.com",
    description: "Pioneer crowdfunding platform for community-driven fundraising in the Bahamas",
  },
  {
    title: "AccountEase",
    description: "Simplified bookkeeping software for small business owners",
  },
  {
    title: "BahamasChange Hub",
    description: "Democratic polling platform amplifying citizen voices in local decision-making",
  }
];

export default function WebAppDev() {
  return (
    <div>
      <ServiceLayout
        title="Web & Software Development"
        description="Custom web applications and software solutions designed for modern businesses in the Caribbean"
        features={[
          {
            title: "Custom Web Applications",
            description: "Tailored web solutions built with modern frameworks and best practices"
          },
          {
            title: "Mobile App Development",
            description: "Cross-platform mobile applications for iOS and Android"
          },
          {
            title: "Software Solutions",
            description: "Bespoke software to automate and optimize business processes"
          },
          {
            title: "API Integration",
            description: "Seamless integration with third-party services and systems"
          }
        ]}
        benefits={[
          {
            title: "Scalable Architecture",
            description: "Solutions that grow with your business needs"
          },
          {
            title: "Modern Technology Stack",
            description: "Using latest technologies for optimal performance"
          },
          {
            title: "Security First",
            description: "Built-in security measures and best practices"
          },
          {
            title: "Ongoing Support",
            description: "Continuous maintenance and technical support"
          }
        ]}
        technologies={[
          "React & Next.js",
          "Node.js & Express",
          "React Native",
          "PostgreSQL",
          "AWS Cloud Services",
          "Docker & Kubernetes"
        ]}
        integrations={[
          "Payment gateways",
          "CRM systems",
          "Analytics platforms",
          "Cloud services",
          "Email services",
          "Third-party APIs"
        ]}
        pricing={{
          startingAt: "$10,000",
          description: "Custom pricing based on project scope and requirements"
        }}
        caseStudy={{
          title: "Financial Institution",
          description: "Developed a secure client portal for a leading Caribbean bank",
          results: [
            "200% increase in digital transactions",
            "50% reduction in processing time",
            "99.9% uptime achievement",
            "Zero security incidents"
          ]
        }}
      />

      {/* Portfolio Section */}
      <section className="py-24 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Recent Work</h2>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-16">
            Explore our portfolio of successful projects delivered in the past 12 months, showcasing our expertise in web and software development.
          </p>
          <PortfolioGrid projects={portfolioProjects} />
        </div>
      </section>
    </div>
  );
}