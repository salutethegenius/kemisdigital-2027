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
import { TrendingUp, Users, Target, BarChart, LineChart, Globe, ArrowRight } from "lucide-react";
import Preloader from "@/components/shared/Preloader";

const caseStudies: CaseStudy[] = [
  {
    icon: TrendingUp,
    title: "E-commerce Revenue Growth",
    client: "Leading Online Retailer",
    industry: "E-commerce",
    challenge: "Struggling with low product description engagement and conversion rates",
    solution: "Implemented AI-powered content generation for product descriptions and recommendations",
    results: [
      "3x increase in product engagement",
      "40% boost in conversion rates",
      "65% reduction in content creation time",
      "28% increase in average order value"
    ],
    technologies: ["GPT-4", "Custom NLP", "Analytics Dashboard"],
    timeframe: "3 months",
    roi: "280% ROI within first quarter"
  },
  {
    icon: BarChart,
    title: "Financial Services Analytics Transformation",
    client: "Regional Financial Institution",
    industry: "Financial Services",
    challenge: "Inefficient market analysis and customer targeting",
    solution: "Deployed predictive analytics system for market trends and customer behavior",
    results: [
      "45% improvement in ROI",
      "95% accuracy in trend forecasting",
      "60% faster market analysis",
      "32% increase in client acquisition"
    ],
    technologies: ["Machine Learning", "Data Analytics", "BI Tools"],
    timeframe: "6 months",
    roi: "320% ROI within first year"
  },
  {
    icon: Target,
    title: "Retail Marketing Automation",
    client: "National Retail Chain",
    industry: "Retail",
    challenge: "Time-consuming campaign management and inconsistent results",
    solution: "Implemented automated campaign management system with AI optimization",
    results: [
      "90% reduction in campaign setup time",
      "20 hours saved weekly",
      "35% improvement in campaign ROI",
      "50% increase in customer engagement"
    ],
    technologies: ["Marketing Automation", "AI Optimization", "Cross-channel Integration"],
    timeframe: "4 months",
    roi: "250% ROI within six months"
  },
  {
    icon: Users,
    title: "Travel Industry Personalization",
    client: "International Travel Company",
    industry: "Travel & Tourism",
    challenge: "Generic marketing approaches leading to low engagement",
    solution: "Implemented personalized marketing system with AI-driven customer segmentation",
    results: [
      "65% higher engagement rates",
      "45% increase in booking conversions",
      "30% improvement in customer satisfaction",
      "25% reduction in marketing costs"
    ],
    technologies: ["AI Personalization", "CRM Integration", "Behavioral Analytics"],
    timeframe: "5 months",
    roi: "200% ROI within first year"
  },
  {
    icon: LineChart,
    title: "SaaS Growth Optimization",
    client: "B2B Software Provider",
    industry: "SaaS",
    challenge: "High customer acquisition costs and inefficient targeting",
    solution: "Implemented real-time optimization system for marketing campaigns",
    results: [
      "35% reduction in CAC",
      "50% improvement in lead quality",
      "40% increase in conversion rate",
      "28% boost in customer lifetime value"
    ],
    technologies: ["Real-time Analytics", "AI Optimization", "Lead Scoring"],
    timeframe: "4 months",
    roi: "180% ROI within first six months"
  },
  {
    icon: Globe,
    title: "Global Content Localization",
    client: "International Consumer Brand",
    industry: "Consumer Goods",
    challenge: "Inconsistent global messaging and slow content adaptation",
    solution: "Deployed AI-powered content localization and generation system",
    results: [
      "75% faster content localization",
      "40% improvement in regional engagement",
      "50% reduction in content costs",
      "85% increase in global brand consistency"
    ],
    technologies: ["NLP", "Translation AI", "Content Management"],
    timeframe: "6 months",
    roi: "220% ROI within first year"
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
