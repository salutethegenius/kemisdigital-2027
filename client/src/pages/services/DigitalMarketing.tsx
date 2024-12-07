import ServiceLayout from "../../components/services/ServiceLayout";

export default function DigitalMarketing() {
  return (
    <ServiceLayout
      title="Digital Marketing Services"
      description="Strategic digital marketing solutions customized for Caribbean businesses, focusing on local market dynamics and international reach"
      features={[
        {
          title: "Social Media Management",
          description: "Strategic content creation and management across all major social platforms"
        },
        {
          title: "Content Marketing",
          description: "High-quality, SEO-optimized content tailored to your target audience"
        },
        {
          title: "PPC Campaigns",
          description: "Targeted advertising campaigns with optimized ROI tracking"
        },
        {
          title: "SEO Optimization",
          description: "Local and international SEO strategies for improved visibility"
        }
      ]}
      benefits={[
        {
          title: "Increased Visibility",
          description: "Enhanced online presence in Caribbean and international markets"
        },
        {
          title: "Lead Generation",
          description: "Consistent flow of qualified leads through targeted campaigns"
        },
        {
          title: "Brand Building",
          description: "Strong brand identity development in the digital space"
        },
        {
          title: "Market Insights",
          description: "Deep understanding of market trends and customer behavior"
        }
      ]}
      technologies={[
        "Advanced social media tools",
        "SEO optimization software",
        "Content management systems",
        "Analytics platforms",
        "Email marketing tools",
        "PPC management systems"
      ]}
      integrations={[
        "Social media platforms",
        "Google Analytics",
        "Email marketing systems",
        "CRM platforms",
        "Content scheduling tools",
        "Analytics dashboards"
      ]}
      pricing={{
        startingAt: "Request Call",
        description: "Customized pricing based on campaign scope and requirements"
      }}
      caseStudy={{
        title: "Caribbean Tourism Business",
        description: "Comprehensive digital marketing campaign for a luxury resort",
        results: [
          "150% increase in social media engagement",
          "200% growth in organic traffic",
          "45% improvement in conversion rates",
          "60% increase in direct bookings"
        ]
      }}
    />
  );
}
