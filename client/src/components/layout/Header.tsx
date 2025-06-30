import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Menu, X, ArrowRight, ChevronDown, Home, Info, Calendar, Newspaper, Code, CreditCard, Award, Sparkles, Phone, Video } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import SoundLink from "@/components/shared/SoundLink";
import LanguageSelector from "../shared/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // Handle scroll effect for glass-like background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Services", href: "/services", icon: Sparkles, description: "Our AI-powered solutions and services" },
    { name: "Web Development", href: "/web-app-development", icon: Code, description: "Custom web and mobile app development" },
    { name: "Payment Solutions", href: "/payment-solutions", icon: CreditCard, description: "Secure payment processing and financial solutions" },
    { name: "Resources", href: "/resources", icon: Award, description: "Helpful resources and guides" },
  ];

  const contactOptions = [
    { name: t('header.contact'), href: "/contact", icon: Phone, description: "Get in touch with us" },
    { name: t('header.meet'), href: "/meet", icon: Video, description: "Schedule a virtual meeting" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/75 backdrop-blur-md shadow-sm" 
          : "bg-background/30 backdrop-blur-sm"
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <SoundLink href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="KemisDigital Logo" 
              className="h-8 md:h-10"
              onError={(e) => {
                e.currentTarget.src = "/images/fav.png"; // Fallback to icon if logo fails
              }}
            />
          </SoundLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <SoundLink
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/70 hover:text-accent-foreground transition-colors flex items-center ${
                  location === item.href ? "bg-accent/80 text-accent-foreground" : "text-foreground/80"
                }`}
              >
                <item.icon size={16} className="mr-1.5" />
                {item.name}
              </SoundLink>
            ))}
            
            {/* Contact Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-4 px-4 py-2 text-sm font-semibold rounded-md bg-[#00A0E3] text-white hover:bg-[#F7BE00] hover:text-black transition-colors flex items-center">
                  <ChevronDown size={16} className="mr-1.5" />
                  {t('header.contact')}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {contactOptions.map((option) => (
                  <DropdownMenuItem key={option.name} asChild>
                    <SoundLink href={option.href} className="flex items-center w-full">
                      <option.icon size={16} className="mr-2" />
                      {option.name}
                    </SoundLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Language Selector */}
            <div className="ml-2">
              <LanguageSelector />
            </div>
          </nav>

          {/* Mobile Menu Button and Language Selector */}
          <div className="md:hidden flex items-center">
            <div className="mr-2">
              <LanguageSelector />
            </div>
            <button
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A0E3]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
            className="md:hidden w-full bg-background/95 backdrop-blur-lg border-t"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <SoundLink
                      href={item.href}
                      className={`flex items-center px-3 py-3 rounded-md ${
                        location === item.href
                          ? "bg-accent/80 text-accent-foreground"
                          : "hover:bg-accent/70 hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon size={18} className="mr-2" />
                      <span>{item.name}</span>
                      {location === item.href && <ArrowRight size={16} className="ml-auto" />}
                    </SoundLink>
                  </motion.div>
                ))}
                
                {/* Contact options in mobile menu */}
                <div className="mt-4 border-t pt-2">
                  <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {t('header.contact_us')}
                  </h3>
                  {contactOptions.map((option) => (
                    <motion.div key={option.name} variants={itemVariants}>
                      <SoundLink
                        href={option.href}
                        className={`flex items-center px-3 py-3 rounded-md ${
                          location === option.href
                            ? "bg-accent/80 text-accent-foreground"
                            : "hover:bg-accent/70 hover:text-accent-foreground"
                        }`}
                      >
                        <option.icon size={18} className="mr-2" />
                        <span>{option.name}</span>
                        {location === option.href && <ArrowRight size={16} className="ml-auto" />}
                      </SoundLink>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
