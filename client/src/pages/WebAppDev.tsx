import ServiceLayout from "@/components/services/ServiceLayout";

export default function WebAppDev() {
  return (
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
  );
}
