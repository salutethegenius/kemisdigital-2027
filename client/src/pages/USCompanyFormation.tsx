import { useState } from "react";
import { Check, Building, FileCheck, CreditCard, Landmark, Globe, Award, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/shared/Hero";
import SEOHelmet from "@/components/shared/SEOHelmet";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function USCompanyFormation() {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState<string>("delaware");

  // Content for different states
  const stateContent = {
    delaware: {
      title: "Delaware LLC Formation",
      description: "Delaware is renowned for its business-friendly laws and court system, making it a preferred choice for companies of all sizes.",
      benefits: [
        "Corporate-friendly legal system and Court of Chancery",
        "No state income tax for companies that don't operate in Delaware",
        "Privacy protection for business owners",
        "Flexible business laws",
        "Prestige and credibility with investors"
      ],
      cost: "$499",
      turnaround: "7-10 business days"
    },
    wyoming: {
      title: "Wyoming LLC Formation",
      description: "Wyoming offers strong privacy protections and minimal fees, making it attractive for small businesses and startups.",
      benefits: [
        "No state income tax",
        "No franchise tax",
        "Strong privacy protections",
        "Low annual fees",
        "Minimal reporting requirements"
      ],
      cost: "$449",
      turnaround: "5-7 business days"
    },
    florida: {
      title: "Florida LLC Formation",
      description: "Florida offers a favorable tax climate and a growing business ecosystem, ideal for businesses in tourism, real estate, and international trade.",
      benefits: [
        "No state income tax",
        "Strong protection against personal liability",
        "Favorable business climate",
        "Growing economy",
        "Strategic location for international business"
      ],
      cost: "$399",
      turnaround: "7-10 business days"
    }
  };

  const selectedContent = stateContent[selectedState as keyof typeof stateContent];

  const services = [
    {
      title: "Business Name Search & Reservation",
      description: "We'll conduct a thorough name search and reserve your chosen business name with the state.",
      icon: Building
    },
    {
      title: "Preparation & Filing of Articles",
      description: "We'll prepare and file all necessary formation documents with the state.",
      icon: FileCheck
    },
    {
      title: "EIN Application",
      description: "We'll obtain your Federal Employer Identification Number (EIN) from the IRS.",
      icon: DollarSign
    },
    {
      title: "Operating Agreement",
      description: "We'll create a customized operating agreement tailored to your business needs.",
      icon: Landmark
    },
    {
      title: "Registered Agent Service",
      description: "We provide a registered agent service for the first year at no additional cost.",
      icon: Award
    },
    {
      title: "Banking Resolution",
      description: "We'll prepare banking resolutions so you can open business accounts.",
      icon: CreditCard
    }
  ];

  const faqs = [
    {
      question: "Why form a company in the US?",
      answer: "Forming a company in the US provides access to the world's largest economy, protection from personal liability, tax benefits, access to banking and payment systems, and enhanced credibility with customers and investors worldwide."
    },
    {
      question: "How long does the formation process take?",
      answer: "The typical formation process takes 7-10 business days, though expedited options are available for an additional fee."
    },
    {
      question: "Do I need to be a US citizen to form a US company?",
      answer: "No, you do not need to be a US citizen or resident to form a US company. International entrepreneurs can own 100% of a US corporation or LLC."
    },
    {
      question: "Do I need to visit the US to form a company?",
      answer: "No, the entire process can be handled remotely. Our services allow you to form your US company without ever setting foot in the United States."
    },
    {
      question: "What ongoing requirements will my company have?",
      answer: "Ongoing requirements typically include annual state filing fees, maintaining a registered agent, annual reports, and tax filings. We offer comprehensive compliance packages to help manage these requirements."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="US Company Formation | KemisDigital"
        description="Form your US company with KemisDigital. We offer comprehensive LLC and Corporation formation services for entrepreneurs and businesses worldwide."
        keywords="US company formation, LLC formation, Delaware corporation, Wyoming LLC, Florida business, international entrepreneurs"
      />

      <Hero
        title="US Company Formation Services"
        description="Launch your business in the United States with our comprehensive formation services. We help entrepreneurs worldwide establish their presence in the world's largest economy."
        heroImage="/images/beachbahamas.jpg"
        showCTA={true}
        primaryCTA={{ text: "Get Started", href: "/contact" }}
        secondaryCTA={{ text: "Learn More", href: "#services" }}
      />

      {/* State Selection */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Formation State</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Select the state that best aligns with your business goals and needs. Each state offers unique advantages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.entries(stateContent).map(([state, content]) => (
              <Card 
                key={state}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedState === state ? 'border-[#00A0E3] shadow-md' : 'border-gray-200'
                }`}
                onClick={() => setSelectedState(state)}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{content.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{content.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-[#00A0E3]">{content.cost}</span>
                    {selectedState === state && (
                      <Check className="h-6 w-6 text-[#00A0E3]" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected State Info */}
      <section className="py-12 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">{selectedContent.title}</h2>
            <p className="text-center text-muted-foreground mb-8">{selectedContent.description}</p>
            
            <div className="bg-background rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-2">
                {selectedContent.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium mb-2">Starting Cost</h4>
                  <p className="text-2xl font-bold text-[#00A0E3]">{selectedContent.cost}</p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium mb-2">Turnaround Time</h4>
                  <p className="text-lg font-semibold">{selectedContent.turnaround}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Included */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive formation packages include everything you need to establish your US business presence quickly and efficiently.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-background rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="h-12 w-12 bg-[#00A0E3]/10 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-[#00A0E3]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button 
              size="lg" 
              className="bg-[#00A0E3] hover:bg-[#0081b4] text-white"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Is This For?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our US company formation services are designed to help various types of entrepreneurs and businesses.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-[#00A0E3]" />
                International Entrepreneurs
              </h3>
              <p className="text-muted-foreground mb-4">
                Entrepreneurs from around the world looking to access the US market, payment systems, or investment opportunities without relocating.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access to global payment processors</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Enhanced credibility with US customers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Opportunity to expand into the US market</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-[#00A0E3]" />
                Digital Business Owners
              </h3>
              <p className="text-muted-foreground mb-4">
                E-commerce sellers, SaaS founders, digital marketers, and content creators looking to structure their business for growth and protection.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Personal liability protection</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Tax advantages and deductions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ability to raise capital more easily</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about forming a US company.
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#001621] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Form Your US Company?</h2>
            <p className="text-gray-300 mb-8">
              Take the first step toward establishing your business presence in the United States. Our team of experts is ready to guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#00A0E3] hover:bg-[#0081b4] text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#001621]"
                onClick={() => window.location.href = '/meet'}
              >
                Schedule a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
