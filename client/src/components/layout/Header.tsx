import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Menu, X, ArrowRight, ChevronDown, Home, Info, Calendar, Newspaper, Code, CreditCard, Award, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import SoundLink from "@/components/shared/SoundLink";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const navigation = [
    { name: t('header.home'), href: "/", icon: Home, description: "Return to our homepage" },
    { name: t('header.about'), href: "/about", icon: Info, description: "Learn about our company" },
    { name: "AI Labs", href: "/ai-labs", icon: Sparkles, description: "Explore our AI-powered solutions" },
    { name: "Web Development", href: "/services/web-app-dev", icon: Code, description: "Custom web and mobile app development" },
    { name: "Payment Solutions", href: "/payment-solutions", icon: CreditCard, description: "Secure payment processing and financial solutions" },
    { name: "US Company Formation", href: "/us-company-formation", icon: Award, description: "Form your US company with our expert assistance" },
    { name: t('header.events'), href: "/events", icon: Calendar, description: "Our events and workshops" },
    { name: t('header.latest_news'), href: "/latest-news", icon: Newspaper, description: "Stay updated with our latest news" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <SoundLink href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="KemisDigital Logo" 
              className="h-8 md:h-10"
              onError={(e) => {
                e.currentTarget.src = "/images/kemis-icon.png"; // Fallback to icon if logo fails
              }}
            />
          </SoundLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <SoundLink
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center ${
                  location === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon size={16} className="mr-1.5" />
                {item.name}
              </SoundLink>
            ))}
            
            <SoundLink
              href="/contact"
              className="ml-4 px-4 py-2 text-sm font-semibold rounded-md bg-[#00A0E3] text-white hover:bg-[#0085B9] transition-colors flex items-center"
            >
              <ChevronDown size={16} className="mr-1.5" />
              {t('header.contact')}
            </SoundLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A0E3]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden w-full bg-background border-t"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <SoundLink
                      href={item.href}
                      className={`flex items-center px-3 py-3 rounded-md ${
                        location === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon size={18} className="mr-2" />
                      <span>{item.name}</span>
                      {location === item.href && <ArrowRight size={16} className="ml-auto" />}
                    </SoundLink>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants}>
                  <SoundLink
                    href="/contact"
                    className="flex items-center px-3 py-3 mt-4 rounded-md bg-[#00A0E3] text-white"
                  >
                    <ChevronDown size={18} className="mr-2" />
                    <span>{t('header.contact')}</span>
                    <ArrowRight size={16} className="ml-auto" />
                  </SoundLink>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
