import { useState, useEffect } from "react";
import Hero from "@/components/shared/Hero";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CaseStudy {
  icon: LucideIcon;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  timeframe: string;
  roi: string;
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { staggerChildren } from "@/lib/animations";
import { Shield, Gift, Brain, Target, BarChart, Globe, ArrowRight } from "lucide-react";
import Preloader from "@/components/shared/Preloader";

const caseStudies: CaseStudy[] = [
  {
    icon: Shield,
    title: "AI-Powered Digital Banking Transformation",
    client: "Major Bahamian Commercial Bank",
    industry: "Financial Services",
    challenge: "Manual onboarding processes and limited digital service offerings were causing customer attrition and operational inefficiencies",
    solution: "Implemented comprehensive AI-driven digital banking platform with automated KYC, personalized product recommendations, and integrated compliance monitoring",
    results: [
      "300% increase in digital account openings",
      "90% reduction in KYC processing time",
      "75% decrease in compliance-related queries",
      "50% improvement in customer satisfaction scores"
    ],
    technologies: ["AI-Powered KYC", "Automated Compliance Monitoring", "Digital Onboarding Platform"],
    timeframe: "6 months",
    roi: "450% ROI within first year"
  },
  {
    icon: Gift,
    title: "Digital Transformation for Environmental NGO",
    client: "Bahamas National Trust",
    industry: "Non-Profit",
    challenge: "Needed to expand donor base and improve program impact tracking while streamlining grant management processes",
    solution: "Implemented AI-powered donor management system with integrated impact tracking and automated grant reporting",
    results: [
      "250% increase in international donations",
      "85% improvement in grant application success rate",
      "60% reduction in reporting time",
      "200% growth in recurring donors"
    ],
    technologies: ["AI Donor Analytics", "Impact Tracking System", "Automated Grant Management"],
    timeframe: "4 months",
    roi: "300% ROI within six months"
  },
  {
    icon: BarChart,
    title: "Credit Union Digital Transformation",
    client: "Regional Credit Union",
    industry: "Financial Services",
    challenge: "Manual member services and limited digital presence were hindering growth and member satisfaction in the Caribbean market",
    solution: "Implemented comprehensive AI-powered member services platform with integrated analytics and digital onboarding",
    results: [
      "90% reduction in service response time",
      "70% increase in member satisfaction",
      "50% cost reduction in operations",
      "35% growth in new memberships from digital channels"
    ],
    technologies: ["AI Customer Service", "Data Analytics", "Digital Onboarding"],
    timeframe: "6 months",
    roi: "280% ROI within first year"
  },
  {
    icon: Target,
    title: "Financial Advisory Marketing",
    client: "Leading Bahamian Investment Firm",
    industry: "Financial Services",
    challenge: "Traditional marketing approaches were ineffective in reaching and engaging high-net-worth clients in the Caribbean market",
    solution: "Developed targeted AI-driven marketing strategy with personalized content delivery and automated lead nurturing",
    results: [
      "150% increase in qualified leads from Caribbean markets",
      "45% higher conversion rate for investment services",
      "60% improvement in client engagement metrics",
      "30% reduction in client acquisition costs"
    ],
    technologies: ["AI Marketing Analytics", "Lead Generation", "Content Personalization"],
    timeframe: "5 months",
    roi: "220% ROI within first year"
  },
  {
    icon: Brain,
    title: "NGO Impact Measurement & Analytics",
    client: "Caribbean Healthcare Initiative",
    industry: "Non-Profit",
    challenge: "Struggled with quantifying healthcare program effectiveness and communicating impact to international donors",
    solution: "Implemented comprehensive AI-powered impact tracking system with real-time analytics and automated donor reporting",
    results: [
      "95% improvement in impact measurement accuracy",
      "65% increase in international grant success rate",
      "40% boost in donor engagement and reporting clarity",
      "80% reduction in impact reporting preparation time"
    ],
    technologies: ["Healthcare Analytics", "AI Impact Tracking", "Automated Grant Reporting"],
    timeframe: "4 months",
    roi: "200% ROI within first year"
  },
  {
    icon: Globe,
    title: "Caribbean Regional Payment Network",
    client: "Pan-Caribbean Financial Consortium",
    industry: "Financial Services",
    challenge: "Fragmented payment infrastructure across Caribbean nations leading to high costs and delays in cross-border transactions",
    solution: "Implemented unified AI-powered payment platform with integrated compliance and real-time fraud detection",
    results: [
      "99.9% reduction in fraudulent transactions",
      "75% improvement in cross-border processing speed",
      "50% decrease in transaction fees for member institutions",
      "200% growth in regional payment volume"
    ],
    technologies: ["Cross-Border Payments", "AI Fraud Prevention", "Regulatory Compliance"],
    timeframe: "6 months",
    roi: "320% ROI within first year"
  },
  {
    icon: Target,
    title: "AI-Driven Tourism Marketing Platform",
    client: "Caribbean Tourism Association",
    industry: "Tourism",
    challenge: "Needed to increase visitor engagement and bookings while optimizing marketing spend across multiple Caribbean destinations",
    solution: "Implemented AI-powered tourism marketing platform with predictive analytics and personalized destination recommendations",
    results: [
      "180% increase in digital bookings",
      "45% reduction in marketing spend",
      "90% improvement in visitor engagement",
      "150% increase in repeat visitors"
    ],
    technologies: ["AI Marketing Analytics", "Predictive Analytics", "Personalization Engine"],
    timeframe: "4 months",
    roi: "280% ROI within first year"
  }
];

export default function CaseStudies() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedSolution, setSelectedSolution] = useState<string>("all");
  const [selectedResult, setSelectedResult] = useState<string>("all");
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>(caseStudies);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter case studies based on selections
  useEffect(() => {
    let filtered = [...caseStudies];
    
    if (selectedIndustry !== "all") {
      filtered = filtered.filter(study => study.industry === selectedIndustry);
    }
    
    if (selectedSolution !== "all") {
      filtered = filtered.filter(study => study.technologies.some(tech => 
        tech.toLowerCase().includes(selectedSolution.toLowerCase())
      ));
    }
    
    if (selectedResult !== "all") {
      filtered = filtered.filter(study => 
        study.results.some(result => {
          const resultLower = result.toLowerCase();
          switch(selectedResult) {
            case "ROI":
              return resultLower.includes("roi") || resultLower.includes("return");
            case "Growth":
              return resultLower.includes("increase") || resultLower.includes("growth");
            case "Cost Reduction":
              return resultLower.includes("reduction") || resultLower.includes("decrease") || resultLower.includes("cost");
            case "Performance":
              return resultLower.includes("improvement") || resultLower.includes("efficiency");
            case "Time Efficiency":
              return resultLower.includes("time") || resultLower.includes("faster");
            default:
              return false;
          }
        })
      );
    }
    
    setFilteredStudies(filtered);
  }, [selectedIndustry, selectedSolution, selectedResult]);

  // Get unique values for filters
  const industries = Array.from(new Set(caseStudies.map(study => study.industry)));
  const solutions = Array.from(new Set(caseStudies.flatMap(study => study.technologies)));
  // Extract result types from actual case studies
const resultTypes = Array.from(new Set(caseStudies.flatMap(study => 
  study.results.map(result => {
    if (result.toLowerCase().includes("roi")) return "ROI";
    if (result.toLowerCase().includes("increase")) return "Growth";
    if (result.toLowerCase().includes("reduction") || result.toLowerCase().includes("decrease")) return "Cost Reduction";
    if (result.toLowerCase().includes("improvement")) return "Performance";
    if (result.toLowerCase().includes("time")) return "Time Efficiency";
    return "Other";
  })
)));

  return (
    <div>
      <Hero
        title="Case Studies"
        description="Discover how KemisDigital's AI-powered marketing solutions have transformed businesses across industries, delivering measurable results and exceptional ROI."
      />

      <section className="py-16 bg-purple-50 dark:bg-purple-900/10">
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSolution} onValueChange={setSelectedSolution}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Solution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Solutions</SelectItem>
                {solutions.map(solution => (
                  <SelectItem key={solution} value={solution}>{solution}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedResult} onValueChange={setSelectedResult}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Results" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                {resultTypes.map(result => (
                  <SelectItem key={result} value={result}>{result}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="min-h-[500px] flex items-center justify-center">
              <Preloader />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedIndustry}-${selectedSolution}-${selectedResult}`}
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredStudies.map((study) => (
                  <Card
                    key={study.title}
                    className="border-2 border-purple-100 dark:border-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-600 group"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <study.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardTitle className="text-xl">{study.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Badge className="bg-purple-600 text-white mb-2">{study.industry}</Badge>
                          <p className="text-sm text-muted-foreground">{study.client}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Challenge:</h4>
                          <p className="text-sm text-muted-foreground">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Solution:</h4>
                          <p className="text-sm text-muted-foreground">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Key Results:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {study.results.map((result, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
                          <span>Timeframe: {study.timeframe}</span>
                          <span className="text-purple-600 font-semibold">{study.roi}</span>
                        </div>
                        
                        <Button 
                          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                          onClick={() => console.log(`Viewing details for ${study.title}`)}
                        >
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
