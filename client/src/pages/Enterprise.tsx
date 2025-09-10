
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Shield, 
  Clock, 
  Database, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  FileText,
  Search,
  Server
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/shared/Hero";
import { fadeIn, staggerChildren } from "@/lib/animations";
import { toast } from "@/hooks/use-toast";

const problems = [
  {
    icon: Clock,
    title: "Junior associates buried in case files",
    description: "Hours spent manually searching through documents"
  },
  {
    icon: AlertTriangle,
    title: "Missed precedents slowing down litigation prep",
    description: "Critical case law overlooked due to time constraints"
  },
  {
    icon: FileText,
    title: "High billable hours lost to admin work",
    description: "Valuable attorney time wasted on research tasks"
  }
];

const solutions = [
  {
    icon: Search,
    title: "Search & Chat with Court Cases",
    description: "Instantly query rulings from Bahamian courts and beyond"
  },
  {
    icon: Shield,
    title: "Secure In-House Deployment",
    description: "No third-party SaaS risk, data never leaves your control"
  },
  {
    icon: Database,
    title: "Expandable",
    description: "Easily add new case files and client documents as you go"
  },
  {
    icon: Users,
    title: "Tailored Training",
    description: "We teach your team how to maximize AI-assisted research"
  }
];

const included = [
  "Installation & Setup on your firm's server (on-prem or private cloud)",
  "Initial Data Load (we'll upload up to 3GB of cases to get you started)",
  "Training Session for your attorneys and staff",
  "Ongoing Support & Updates with monthly service plan"
];

const pricingTiers = [
  {
    title: "Small Firms",
    subtitle: "2–5 lawyers",
    setupPrice: "$7,500",
    monthlyPrice: "$500/month",
    color: "from-[#00A0E3] to-[#6CCFF6]"
  },
  {
    title: "Mid-Sized Firms",
    subtitle: "6–20 lawyers",
    setupPrice: "$12,500",
    monthlyPrice: "$1,500/month",
    color: "from-[#F7BE00] to-[#FFD700]",
    featured: true
  },
  {
    title: "Large Firms",
    subtitle: "21+ lawyers",
    setupPrice: "$20,000+",
    monthlyPrice: "$3,000+/month",
    color: "from-[#00A0E3] to-[#F7BE00]"
  }
];

const addOns = [
  {
    title: "Extra Data Ingestion",
    price: "$250 per GB",
    description: "Additional case files and documents"
  },
  {
    title: "Custom Integrations",
    price: "Priced per project",
    description: "Integration with case management tools"
  },
  {
    title: "Advanced Staff Training",
    price: "$1,500 per session",
    description: "Comprehensive team training sessions"
  }
];

export default function Enterprise() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    firmName: "",
    firmSize: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.firmName || !formData.firmSize) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Inquiry Submitted Successfully",
      description: "We'll contact you within 24 hours with a custom quote for your firm."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      firmName: "",
      firmSize: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      <Hero
        title="LawBey Enterprise"
        description="Bring the Power of AI Legal Research Into Your Firm. Cut research time, access past rulings instantly, and keep your case files secure — all within your own private server environment."
        showCTA={false}
        pageContext="professional"
      />

      {/* Trusted By Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Created by <span className="text-[#00A0E3] font-semibold">KemisDigital</span>. 
            Trusted by Bahamian innovators.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-red-50/30 dark:bg-red-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold">The Problem</h2>
            </motion.div>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Law firms spend countless hours digging through court records, case law, and internal files. 
              Traditional research is slow, expensive, and difficult to scale.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-red-200 dark:border-red-800">
                  <CardContent className="p-6 text-center">
                    <problem.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold">The Solution: Your Own Private AI Legal Assistant</h2>
            </motion.div>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We install LawBuddy Enterprise directly on your firm's servers, pre-loaded with over 3GB of court records and your private case files.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <solution.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What's Included</h2>
          </motion.div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {included.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pricing</h2>
            <p className="text-xl text-muted-foreground">One-Time Setup & Installation (Based on firm size)</p>
          </motion.div>

          {/* Setup Pricing */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${tier.featured ? 'border-2 border-[#F7BE00] scale-105' : ''}`}>
                  {tier.featured && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F7BE00] text-black">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.title}</CardTitle>
                    <p className="text-muted-foreground">{tier.subtitle}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div className={`text-4xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-2`}>
                        {tier.setupPrice}
                      </div>
                      <p className="text-sm text-muted-foreground">One-time setup</p>
                    </div>
                    <div className="mb-6">
                      <div className="text-2xl font-semibold text-[#00A0E3] mb-2">
                        {tier.monthlyPrice}
                      </div>
                      <p className="text-sm text-muted-foreground">Monthly Support & Service</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Includes setup, first data ingestion, and staff training.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Add-ons */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold mb-8">Optional Add-Ons</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={addon.title}>
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold mb-2">{addon.title}</h4>
                    <p className="text-[#00A0E3] font-bold mb-2">{addon.price}</p>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Diagram Section */}
      <section className="py-16 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-8">How It Works</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#00A0E3] rounded-full flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Court Records</h4>
                <p className="text-sm text-muted-foreground text-center">3GB+ of legal precedents</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-[#00A0E3] transform md:transform-none rotate-90 md:rotate-0" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#F7BE00] rounded-full flex items-center justify-center mb-4">
                  <Server className="w-8 h-8 text-black" />
                </div>
                <h4 className="font-semibold mb-2">LawBey AI</h4>
                <p className="text-sm text-muted-foreground text-center">Your private AI assistant</p>
              </div>
              
              <ArrowRight className="w-8 h-8 text-[#00A0E3] transform md:transform-none rotate-90 md:rotate-0" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#00A0E3] rounded-full flex items-center justify-center mb-4">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Lawyers</h4>
                <p className="text-sm text-muted-foreground text-center">Instant research results</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to modernize your legal research?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We'll help you cut hours of manual work, increase efficiency, and keep your firm ahead. 
              Fill out the form below to get a custom quote for your firm.
            </p>
          </motion.div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Get Your Custom Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="firmName">Law Firm Name *</Label>
                    <Input
                      id="firmName"
                      value={formData.firmName}
                      onChange={(e) => handleInputChange("firmName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="firmSize">Size of Firm *</Label>
                  <Select value={formData.firmSize} onValueChange={(value) => handleInputChange("firmSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select firm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-5">2–5 lawyers</SelectItem>
                      <SelectItem value="6-20">6–20 lawyers</SelectItem>
                      <SelectItem value="21+">21+ lawyers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes / Special Requirements</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Tell us about your specific needs..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#00A0E3] hover:bg-[#0078A8] text-white font-semibold py-3"
                >
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
