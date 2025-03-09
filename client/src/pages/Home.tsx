import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import testimonials from "@/data/testimonials";
import { useTranslation } from "react-i18next";
import {
  Globe,
  Target,
  Sparkles,
  Code2 as Code,
  CheckCircle2,
  ArrowUpRight,
  Infinity,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
  const { t } = useTranslation();

  const aiServices = [
    {
      icon: Globe,
      title: "Digital Sales",
      description: "Complete digital sales solution including landing page, sales funnel, and professional PPC campaign management for maximum ROI.",
      benefits: [
        "Professional landing page design",
        "Complete sales funnel setup",
        "PPC campaign setup and management",
        "Monthly campaign optimization",
        "Performance tracking & reporting",
        "Lead capture integration"
      ],
      caseStudy: "A local business achieved 150% increase in qualified leads through our digital sales package",
      integration: "Seamless integration with CRM platforms and analytics systems",
      pricing: "$1,499 + $300 minimum ad budget\nPro: $1,999 + $500 ad budget\nCustom: Contact us"
    },
    {
      icon: Target,
      title: "Startup Growth Package",
      description: "Comprehensive digital marketing solution for startups, including evergreen funnel, content creation, and multi-channel marketing.",
      benefits: [
        "Evergreen marketing funnel",
        "Strategic email marketing",
        "Professional content creation",
        "Social media management",
        "High-converting landing pages",
        "PPC campaign setup & management"
      ],
      caseStudy: "A Bahamian startup saw 250% increase in monthly revenue within 6 months",
      integration: "Integration with marketing platforms and analytics systems",
      pricing: "$2,497 + $300 minimum ad budget\nPro: $3,497 + $500 ad budget\nEnterprise: Custom pricing"
    },
    {
      icon: Code,
      title: "Tourism Sector Solutions",
      description: "Tailored digital solutions for tourism businesses, combining local market expertise with cutting-edge technology for maximum impact.",
      benefits: [
        "Custom booking system integration",
        "Multi-language support",
        "Virtual tour capabilities",
        "Mobile booking optimization",
        "Local SEO optimization",
        "Review management system"
      ],
      caseStudy: "A Caribbean resort achieved 180% increase in direct bookings",
      integration: "Integration with booking systems and payment processors",
      pricing: "Essential: $5,000\nPremium: $10,000\nLuxury: $15,000+"
    }
  ];

  const successMetrics = [
    {
      icon: CheckCircle2,
      metric: "95%",
      label: "Client Success Rate",
      description: "Clients achieving their marketing goals",
    },
    {
      icon: ArrowUpRight,
      metric: "250%",
      label: "Average ROI",
      description: "Return on marketing investment",
    },
    {
      icon: Infinity,
      metric: "85%",
      label: "Client Retention",
      description: "Long-term partnership success",
    },
  ];
  
  return (
    <div>
      <SEO 
        title="KemisDigital - The People's Choice | Digital Marketing & Development"
        description="Backed by 20 years of experience in the Bahamian marketplace, we've crafted A-player strategies that brought ideas to life with measured success."
        keywords="digital marketing, web development, Bahamas, tourism, startups, NGOs"
        ogImage="/images/fav.png"
      />
      
      <Hero
        title={t('homepage.hero.title')}
        description={t('homepage.hero.description')}
        pageContext="tourism"
        primaryCTA={{
          text: t('homepage.cta.learn_more'),
          href: "/about"
        }}
      />

      {/* Our Mission Section */}
      <section className="py-24 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8 relative">
              {t('homepage.mission_section.title')}
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-[#00A0E3]" 
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('homepage.mission_section.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Service Showcase Section */}
      <section id="ai-marketing-services" className="py-24 bg-background relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#00A0E3]/20 dark:bg-[#00A0E3]/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-16 right-16 w-96 h-96 bg-[#F7BE00]/20 dark:bg-[#F7BE00]/20 rounded-full blur-3xl opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 inline-block relative">
              {t('homepage.services_section.title')}
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-[#00A0E3]" 
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('homepage.services_section.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aiServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  className="border-2 border-[#00A0E3]/20 dark:border-[#00A0E3]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#00A0E3] dark:hover:border-[#00A0E3] overflow-hidden group"
                >
                  {/* Card top colorful decoration bar */}
                  <div className="h-2 bg-gradient-to-r from-[#00A0E3] to-[#F7BE00] transform origin-left transition-all duration-500 group-hover:scale-x-110"></div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#00A0E3]/10 dark:bg-[#00A0E3]/20 rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <service.icon className="w-6 h-6 text-[#00A0E3] dark:text-[#00A0E3]" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Pricing Section - Now at the top */}
                    <div className="mb-6 bg-[#F7BE00]/10 dark:bg-[#F7BE00]/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-xl text-[#00A0E3] mb-2">Investment Plans:</h4>
                      <div className="space-y-2">
                        {service.pricing.split('\n').map((plan, index) => (
                          <div key={index} className="text-lg">
                            {plan}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <motion.li 
                            key={benefit} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2"
                          >
                            <div className="p-1 bg-[#F7BE00]/20 dark:bg-[#F7BE00]/30 rounded-full">
                              <Sparkles className="w-3 h-3 text-[#F7BE00] flex-shrink-0" />
                            </div>
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 p-3 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10 rounded-lg border-l-4 border-[#00A0E3]">
                      <h4 className="font-semibold mb-2">Success Story:</h4>
                      <p className="text-sm text-muted-foreground italic">{service.caseStudy}</p>
                    </div>

                    <Link href="/services">
                      <Button className="w-full bg-[#00A0E3] hover:bg-[#0085bb] transition-colors">
                        {t('homepage.cta.learn_more')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Client Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 inline-block relative">
              {t('homepage.testimonials.title')}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#00A0E3]"></div>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('homepage.testimonials.subtitle')}
            </p>
          </div>
          
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
      
      {/* Success Metrics Section (Our Impact) */}
      <section className="py-24 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16 inline-block relative">
            {t('homepage.impact_section.title')}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#00A0E3]"></div>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
            >
              <Card className="text-center transition-all duration-300 hover:shadow-lg border-2 border-[#00A0E3]/20 dark:border-[#00A0E3]/30 hover:border-[#00A0E3] dark:hover:border-[#00A0E3]">
                <CardContent className="pt-6">
                  <div className="p-4 bg-[#00A0E3]/10 dark:bg-[#00A0E3]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#00A0E3] mx-auto" />
                  </div>
                  <div className="text-4xl font-bold text-[#00A0E3] mb-2">95%</div>
                  <h4 className="text-xl font-semibold mb-2">{t('homepage.impact_section.client_success_rate')}</h4>
                  <p className="text-muted-foreground">{t('homepage.impact_section.client_success_desc')}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center transition-all duration-300 hover:shadow-lg border-2 border-[#00A0E3]/20 dark:border-[#00A0E3]/30 hover:border-[#00A0E3] dark:hover:border-[#00A0E3]">
                <CardContent className="pt-6">
                  <div className="p-4 bg-[#00A0E3]/10 dark:bg-[#00A0E3]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <ArrowUpRight className="w-8 h-8 text-[#00A0E3] mx-auto" />
                  </div>
                  <div className="text-4xl font-bold text-[#00A0E3] mb-2">250%</div>
                  <h4 className="text-xl font-semibold mb-2">{t('homepage.impact_section.average_roi')}</h4>
                  <p className="text-muted-foreground">{t('homepage.impact_section.average_roi_desc')}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center transition-all duration-300 hover:shadow-lg border-2 border-[#00A0E3]/20 dark:border-[#00A0E3]/30 hover:border-[#00A0E3] dark:hover:border-[#00A0E3]">
                <CardContent className="pt-6">
                  <div className="p-4 bg-[#00A0E3]/10 dark:bg-[#00A0E3]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Infinity className="w-8 h-8 text-[#00A0E3] mx-auto" />
                  </div>
                  <div className="text-4xl font-bold text-[#00A0E3] mb-2">85%</div>
                  <h4 className="text-xl font-semibold mb-2">{t('homepage.impact_section.client_retention')}</h4>
                  <p className="text-muted-foreground">{t('homepage.impact_section.client_retention_desc')}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose KemisDigital Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose KemisDigital</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#00A0E3]" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our AI-powered solutions deliver targeted campaigns that reach the right audience at the right time.</p>
                <p>We use advanced machine learning algorithms to analyze market trends and fine-tune your marketing strategy for maximum impact.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#00A0E3]" />
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">We stay at the forefront of digital marketing technology, bringing innovative solutions to the Caribbean marketplace.</p>
                <p>Our team continuously explores new technologies and methodologies to give your business a competitive edge.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-24 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Subscribe to our newsletter for the latest updates, industry insights, and digital marketing tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-background"
              />
              <Button className="bg-[#00A0E3] hover:bg-[#0085bb] transition-colors">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
