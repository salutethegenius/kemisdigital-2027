import ServiceLayout from "../../components/services/ServiceLayout";

export default function TrainingSupport() {
  return (
    <ServiceLayout
      title="Training & Support"
      description="Comprehensive digital skills training and ongoing support for Caribbean businesses and organizations"
      features={[
        {
          title: "Custom Training Programs",
          description: "Tailored training sessions designed for your team's specific needs"
        },
        {
          title: "Technical Support",
          description: "Ongoing technical assistance and troubleshooting"
        },
        {
          title: "Strategy Consulting",
          description: "Expert guidance on digital transformation strategies"
        },
        {
          title: "Knowledge Transfer",
          description: "Documentation and resources for sustainable skill development"
        }
      ]}
      benefits={[
        {
          title: "Empowered Teams",
          description: "Staff equipped with the latest digital skills and knowledge"
        },
        {
          title: "Reduced Downtime",
          description: "Quick resolution of technical issues through dedicated support"
        },
        {
          title: "Continuous Improvement",
          description: "Regular updates and training on new technologies"
        },
        {
          title: "Self-Sufficiency",
          description: "Teams become more independent in managing digital tools"
        }
      ]}
      technologies={[
        "Learning management systems",
        "Virtual training platforms",
        "Support ticket systems",
        "Knowledge base software",
        "Video conferencing tools",
        "Training analytics"
      ]}
      integrations={[
        "HR systems",
        "Project management tools",
        "Communication platforms",
        "Documentation systems",
        "Assessment tools",
        "Feedback systems"
      ]}
      pricing={{
        startingAt: "Request Call",
        description: "Custom pricing based on training needs and support requirements"
      }}
      caseStudy={{
        title: "Caribbean NGO",
        description: "Comprehensive digital skills training program for staff and volunteers",
        results: [
          "90% improvement in digital literacy",
          "50% reduction in technical support tickets",
          "100% staff completion rate",
          "30% increase in operational efficiency"
        ]
      }}
    />
  );
}
