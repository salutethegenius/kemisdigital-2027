import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, CheckCircle2, Infinity, X } from 'lucide-react';

import Hero from '../components/shared/Hero';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import TestimonialCarousel from '../components/shared/TestimonialCarousel';
import { testimonials } from '../data/testimonials';
import EmailMarketingPopup from '../components/shared/EmailMarketingPopup';
import FirstVisitPopup from '../components/shared/FirstVisitPopup';

export default function Home() {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const scrollRef = useRef(false);
  const [showFirstVisitPopup, setShowFirstVisitPopup] = useState(false);
  const imagesPreloaded = useRef(false);

  // Preload critical images as soon as the component mounts
  useEffect(() => {
    if (!imagesPreloaded.current) {
      imagesPreloaded.current = true;
      
      // Preload the hero background image with high priority
      const heroImage = new Image();
      heroImage.src = '/images/optimized/beachbahamas-large.jpg';
      heroImage.fetchPriority = 'high';
      
      // Preload other sizes for responsive display
      const preloadImageSizes = [
        '/images/optimized/beachbahamas-medium.jpg',
        '/images/optimized/beachbahamas-small.jpg',
        '/images/optimized/beachbahamas-blur.jpg'
      ];
      
      preloadImageSizes.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, []);

  // First visit popup
  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem('kemisDigital_firstVisit') === 'true';
    
    if (!hasVisitedBefore) {
      // Show the popup with a slight delay for better UX
      setTimeout(() => {
        setShowFirstVisitPopup(true);
      }, 1500);
    }
  }, []);

  const handleCloseFirstVisitPopup = () => {
    setShowFirstVisitPopup(false);
    // Mark as visited in localStorage
    localStorage.setItem('kemisDigital_firstVisit', 'true');
  };

  useEffect(() => {
    // Check if popup has already been shown to this user
    const hasShownPopup = sessionStorage.getItem('emailPopupShown');
    
    // Only set up scroll listener if popup hasn't been shown before
    if (hasShownPopup !== 'true') {
      // Set up scroll event listener
      const handleScroll = () => {
        if (!scrollRef.current && !showPopup) {
          // Only show popup on first scroll and if not shown before
          scrollRef.current = true;
          
          // Add a short delay before showing the popup
          setTimeout(() => {
            setShowPopup(true);
            // Store in session storage that popup has been shown - moved here to ensure it's set right when popup shows
            sessionStorage.setItem('emailPopupShown', 'true');
          }, 800);
          
          // Remove event listener after first trigger
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Store in session storage that popup has been shown
    sessionStorage.setItem('emailPopupShown', 'true');
  };

  return (
    <div>
      {/* Email Marketing Popup */}
      {showPopup && <EmailMarketingPopup onClose={handleClosePopup} />}
      
      {/* First Visit Popup */}
      <AnimatePresence>
        {showFirstVisitPopup && <FirstVisitPopup onClose={handleCloseFirstVisitPopup} />}
      </AnimatePresence>
      
      {/* Hero Section */}
      <Hero
        title="The People's Choice!"
        description="Clients say we've earned this title because we're in the game with them. Backed by 20 years in the Bahamas market, we've crafted top-tier strategies that brought ideas to life with measurable success."
        showCTA={false}
        heroImage="/images/optimized/beachbahamas-large.jpg"
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

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Marketing Services</h2>
            <p className="text-muted-foreground">
              Online campaigns that combine cutting-edge AI technology with marketing experts, strategists, and developers to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Strategy & Planning",
                description: "We develop comprehensive AI-driven marketing strategies tailored to your specific business goals and target audience.",
                icon: "chart-pie"
              },
              {
                title: "Content Creation",
                description: "Our AI tools and creative team work together to produce engaging, conversion-focused content across all platforms.",
                icon: "document-text"
              },
              {
                title: "Performance Analytics",
                description: "Advanced AI analytics provide deep insights into your marketing performance, allowing for continuous optimization.",
                icon: "chart-bar"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-transform duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="mt-4">
                      <Button variant="link" className="p-0 text-[#00A0E3]">
                        Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-24 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-muted-foreground">
              Hear what our clients have to say about their experience working with KemisDigital.
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} autoplay={false} />
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

      {/* Why Choose Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16 relative inline-block">
            Why Choose KemisDigital
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#00A0E3]"></div>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-[#00A0E3]/20 dark:border-[#00A0E3]/30">
              <h4 className="text-xl font-bold mb-4">Leadership</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00A0E3] mr-2 mt-0.5" />
                  <p>Our AI-powered solutions deliver targeted campaigns that reach the right audience at the right time.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00A0E3] mr-2 mt-0.5" />
                  <p>We use advanced machine learning algorithms to analyze market trends and fine-tune your marketing strategy for maximum impact.</p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-[#00A0E3]/20 dark:border-[#00A0E3]/30">
              <h4 className="text-xl font-bold mb-4">Innovation</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00A0E3] mr-2 mt-0.5" />
                  <p>We stay at the forefront of digital marketing technology, bringing innovative solutions to the Caribbean market.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00A0E3] mr-2 mt-0.5" />
                  <p>Our team continuously explores new technologies and methodologies to give your business a competitive edge.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-[#00A0E3]/5 dark:bg-[#00A0E3]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest updates, industry insights, and digital marketing tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-[#00A0E3]/30 focus:outline-none focus:ring-2 focus:ring-[#00A0E3] flex-grow"
              />
              <Button className="bg-[#00A0E3] hover:bg-[#00A0E3]/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
