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
    title: "Digital Banking Digital Sales",
    client: "Leading Caribbean Commercial Bank",
    industry: "Financial Services",
    challenge: "Traditional sales processes limiting growth and customer acquisition in digital channels",
    solution: "Implemented AI-powered digital sales platform with automated customer journey and personalized product recommendations",
    results: [
      "250% increase in digital product sales",
      "85% improvement in lead conversion rate",
      "60% reduction in customer acquisition cost",
      "45% increase in cross-selling success"
    ],
    technologies: ["AI Sales Analytics", "Customer Journey Automation", "Digital Onboarding Platform"],
    timeframe: "8 months",
    roi: "400% ROI within first year"
  },
  {
    icon: Gift,
    title: "NGO Digital Fundraising Success",
    client: "Caribbean Environmental Foundation",
    industry: "Non-Profit",
    challenge: "Limited donor reach and inefficient donation processing",
    solution: "Deployed integrated digital fundraising platform with AI-driven donor engagement",
    results: [
      "200% increase in online donations",
      "45% improvement in donor retention",
      "75% reduction in processing time",
      "150% expansion in donor base"
    ],
    technologies: ["Payment Integration", "Donor CRM", "AI Analytics"],
    timeframe: "4 months",
    roi: "250% ROI within six months"
  },
  {
    icon: BarChart,
    title: "Credit Union Digital Transformation",
    client: "Regional Credit Union",
    industry: "Financial Services",
    challenge: "Manual member services and limited digital presence",
    solution: "Implemented AI-powered member services platform with integrated analytics",
    results: [
      "90% reduction in service response time",
      "70% increase in member satisfaction",
      "50% cost reduction in operations",
      "35% growth in new memberships"
    ],
    technologies: ["AI Customer Service", "Data Analytics", "Process Automation"],
    timeframe: "6 months",
    roi: "280% ROI within first year"
  },
  {
    icon: Target,
    title: "Financial Advisory Marketing",
    client: "Caribbean Investment Firm",
    industry: "Financial Services",
    challenge: "Traditional marketing approaches yielding low client acquisition",
    solution: "Developed AI-driven marketing strategy with personalized content delivery",
    results: [
      "150% increase in qualified leads",
      "45% higher conversion rate",
      "60% improvement in client engagement",
      "30% reduction in acquisition costs"
    ],
    technologies: ["AI Marketing", "Lead Generation", "Content Automation"],
    timeframe: "5 months",
    roi: "220% ROI within first year"
  },
  {
    icon: Brain,
    title: "NGO Impact Measurement",
    client: "Regional Healthcare NGO",
    industry: "Non-Profit",
    challenge: "Difficulty in measuring and communicating program impact",
    solution: "Implemented AI-powered impact tracking and reporting system",
    results: [
      "95% accuracy in impact measurement",
      "65% increase in grant success rate",
      "40% improvement in donor reporting",
      "80% reduction in reporting time"
    ],
    technologies: ["Impact Analytics", "AI Reporting", "Data Visualization"],
    timeframe: "4 months",
    roi: "200% ROI within first year"
  },
  {
    icon: Globe,
    title: "Caribbean Payment Integration",
    client: "Regional Financial Network",
    industry: "Financial Services",
    challenge: "Complex payment systems and cross-border transaction issues",
    solution: "Deployed integrated payment platform with AI fraud detection",
    results: [
      "99.9% reduction in fraud incidents",
      "75% faster transaction processing",
      "50% reduction in transaction costs",
      "200% increase in cross-border payments"
    ],
    technologies: ["Payment Processing", "AI Security", "Fraud Detection"],
    timeframe: "6 months",
    roi: "320% ROI within first year"
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
      filtered = filtered.filter(study => study.technologies.includes(selectedSolution));
    }
    
    if (selectedResult !== "all") {
      filtered = filtered.filter(study => 
        study.results.some(result => 
          result.toLowerCase().includes(selectedResult.toLowerCase())
        )
      );
    }
    
    setFilteredStudies(filtered);
  }, [selectedIndustry, selectedSolution, selectedResult]);

  // Get unique values for filters
  const industries = Array.from(new Set(caseStudies.map(study => study.industry)));
  const solutions = Array.from(new Set(caseStudies.flatMap(study => study.technologies)));
  const resultTypes = ["ROI", "Engagement", "Conversion", "Time Savings", "Cost Reduction"];

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
