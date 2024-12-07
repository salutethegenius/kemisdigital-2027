import ServiceLayout from "../../components/services/ServiceLayout";

export default function AnalyticsDashboards() {
  return (
    <ServiceLayout
      title="Analytics & Reporting Dashboards"
      description="Custom analytics solutions tailored for Caribbean businesses to make data-driven decisions with real-time insights"
      features={[
        {
          title: "Real-Time Analytics",
          description: "Live data tracking and visualization for immediate insights into business performance"
        },
        {
          title: "Custom KPI Dashboards",
          description: "Tailored dashboards focusing on your organization's most important metrics"
        },
        {
          title: "Automated Reporting",
          description: "Scheduled reports delivered automatically to key stakeholders"
        },
        {
          title: "Data Integration",
          description: "Seamless integration with your existing systems and data sources"
        }
      ]}
      benefits={[
        {
          title: "Data-Driven Decisions",
          description: "Make informed business decisions based on real-time data and insights"
        },
        {
          title: "Time Savings",
          description: "Automated reporting saves hours of manual data compilation and analysis"
        },
        {
          title: "Performance Optimization",
          description: "Identify trends and opportunities for improvement through detailed analytics"
        },
        {
          title: "Stakeholder Communication",
          description: "Clear, visual representation of data for better stakeholder understanding"
        }
      ]}
      technologies={[
        "Power BI for data visualization",
        "Python for data processing",
        "SQL for data management",
        "Custom API integrations",
        "Cloud-based infrastructure",
        "Machine learning algorithms"
      ]}
      integrations={[
        "CRM systems",
        "Marketing platforms",
        "Financial software",
        "Social media analytics",
        "E-commerce platforms",
        "Custom data sources"
      ]}
      pricing={{
        startingAt: "Request Call",
        description: "Custom pricing based on data volume and complexity of requirements"
      }}
      caseStudy={{
        title: "Caribbean Financial Institution",
        description: "Implemented comprehensive analytics dashboard for tracking customer engagement and financial metrics",
        results: [
          "40% reduction in reporting time",
          "25% improvement in decision-making speed",
          "Real-time visibility into key metrics",
          "300% increase in data-driven decisions"
        ]
      }}
    />
  );
}
