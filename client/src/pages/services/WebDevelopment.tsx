import ServiceLayout from "../../components/services/ServiceLayout";

export default function WebDevelopment() {
  return (
    <ServiceLayout
      title="Custom Website Development"
      description="Secure, mobile-responsive websites with client portals for financial institutions and NGOs"
      features={[
        {
          title: "Secure Client Portals",
          description: "Custom-built secure portals for client access with role-based permissions and encrypted data transmission"
        },
        {
          title: "Mobile Responsiveness",
          description: "Fully responsive design ensuring optimal viewing and interaction experience across all devices"
        },
        {
          title: "Payment Integration",
          description: "Seamless integration with major payment gateways and banking systems"
        },
        {
          title: "ADA Compliance",
          description: "Websites built to meet WCAG 2.1 guidelines ensuring accessibility for all users"
        }
      ]}
      benefits={[
        {
          title: "Enhanced Client Experience",
          description: "Streamlined user interface and intuitive navigation improving client satisfaction and engagement"
        },
        {
          title: "Increased Security",
          description: "Bank-grade security measures protecting sensitive data and transactions"
        },
        {
          title: "Improved Efficiency",
          description: "Automated processes reducing manual workload and operational costs"
        },
        {
          title: "Better Compliance",
          description: "Built-in compliance features meeting regulatory requirements"
        }
      ]}
      technologies={[
        "React & Next.js for modern web applications",
        "Node.js & Express for backend services",
        "PostgreSQL for secure data storage",
        "AWS for cloud infrastructure",
        "SSL/TLS encryption",
        "OAuth 2.0 & JWT authentication"
      ]}
      integrations={[
        "Major payment gateways",
        "Banking systems",
        "CRM platforms",
        "Analytics tools",
        "Email marketing services",
        "Document management systems"
      ]}
      pricing={{
        startingAt: "$5,000",
        description: "Custom pricing based on specific requirements and complexity"
      }}
      caseStudy={{
        title: "Caribbean Financial Institution",
        description: "Transformed a traditional banking website into a modern digital platform with secure client portal",
        results: [
          "200% increase in digital client onboarding",
          "50% reduction in support tickets",
          "99.9% uptime achievement",
          "30% improvement in client satisfaction scores"
        ]
      }}
    />
  );
}
