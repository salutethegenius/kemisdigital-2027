import ServiceLayout from "@/components/services/ServiceLayout";
import PortfolioGrid from "@/components/shared/PortfolioGrid";

const webApplications = [
  {
    title: "AccountEase",
    description: "Simplified bookkeeping software designed for small business owners"
  },
  {
    title: "Autodialer",
    description: "Intelligent calling system that connects you with prospects only when they answer, optimizing outreach efficiency"
  },
  {
    title: "BahamasChange Hub",
    description: "Democratic polling platform amplifying citizen voices in local decision-making"
  },
  {
    title: "BDMA Bahamas",
    description: "Official platform for the Bahamas Digital Marketing Association, promoting digital transformation across local businesses"
  },
  {
    title: "DonateBubble.com",
    description: "The Bahamas' pioneer crowdfunding platform enabling community-driven fundraising"
  },
  {
    title: "GitNews",
    description: "Centralized news aggregator delivering curated local updates"
  },
  {
    title: "GitHub Scanner",
    description: "Tool for efficient GitHub repository searching and bookmarking, streamlining project discovery and management"
  },
  {
    title: "KemisAcademy.com",
    description: "Educational platform specializing in digital marketing and entrepreneurship training"
  },
  {
    title: "Smart Contract Escrow System",
    description: "Secure payment protection platform using blockchain technology to safeguard project investments"
  },
  {
    title: "Start.kemis.net",
    description: "Email marketing service targeting local Bahamian audiences"
  },
  {
    title: "Urban Nassau Rides",
    description: "Local ride-sharing service connecting drivers with passengers"
  },
  {
    title: "WaitList Pro",
    description: "Event management platform featuring a lead-collecting chatbot that handles attendee questions and waitlist signups, with an integrated dashboard for lead communication"
  }
];

const websites = [
  {
    title: "AISM Connect",
    description: "Platform automating social media management and content distribution"
  },
  {
    title: "BACO",
    description: "Event landing page highlighting program details and registration"
  },
  {
    title: "BlueIslandAdventure.com",
    description: "Tourism portal highlighting Bahamian adventures and experiences"
  },
  {
    title: "BT Loyalty Reward Program",
    description: "Customer loyalty platform for single retail location"
  },
  {
    title: "BT Monthly Giveaway",
    description: "Lead generation landing page featuring monthly prize drawings"
  },
  {
    title: "Cryptonoobz.xyz",
    description: "Educational resource for cryptocurrency beginners"
  },
  {
    title: "DAWN and RON",
    description: "Custom landing page for personal brand promotion"
  },
  {
    title: "DigitalMarketingBahamas.com",
    description: "Comprehensive resource for digital marketing services and information in the Bahamas"
  },
  {
    title: "DJ Big L",
    description: "Professional portfolio website for prominent local DJ"
  },
  {
    title: "Elle Events",
    description: "Professional event planning and showcase website"
  },
  {
    title: "First Care/BICCU",
    description: "Informational landing page for healthcare services"
  },
  {
    title: "IzengaBahamas.com",
    description: "E-commerce platform featuring luxury jewelry and accessories"
  },
  {
    title: "KDS Fun Run Walk",
    description: "Fundraising event website for KDS Bahamas' annual charity run"
  },
  {
    title: "Lawbey.com",
    description: "Comprehensive digital platform providing easy access to Bahamas legal resources"
  },
  {
    title: "Mall At Marathon Rewards Program",
    description: "Enterprise-scale customer rewards system"
  },
  {
    title: "OrlandoMaxTax.com",
    description: "Full-service tax consultation and preparation website"
  },
  {
    title: "PatrickMoncur.com",
    description: "Professional portfolio site for insurance services"
  },
  {
    title: "Pledge.mapsweepstakes.com",
    description: "Dedicated pledge platform for MAP Bahamas initiatives"
  },
  {
    title: "Refocus 2025",
    description: "Event landing page for professional growth summit"
  },
  {
    title: "Reset 2025",
    description: "Event website showcasing upcoming professional development conference"
  },
  {
    title: "SmartBlackBook.com",
    description: "The official website for KemisDigital CEO's published work"
  },
  {
    title: "SRL & IDOS",
    description: "Targeted landing page for business services"
  },
  {
    title: "StreetsidePizzeria.com",
    description: "Restaurant website showcasing authentic Italian cuisine and online ordering"
  },
  {
    title: "WindermereDaySpa.com",
    description: "Spa services website featuring booking capabilities and treatment information"
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
      <section className="py-24 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Recent Work</h2>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-16">
            Explore our extensive portfolio of successful projects delivered in the past 12 months, showcasing our expertise in web and software development across various industries.
          </p>

          {/* Web Applications Section */}
          <div className="mb-24">
            <h3 className="text-2xl font-bold mb-12 text-center">Web Applications & Software Solutions</h3>
            <PortfolioGrid projects={webApplications} />
          </div>

          {/* Websites Section */}
          <div>
            <h3 className="text-2xl font-bold mb-12 text-center">Websites & Landing Pages</h3>
            <PortfolioGrid projects={websites} />
          </div>
        </div>
      </section>
    </div>
  );
}