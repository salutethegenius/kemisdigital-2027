import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { MouseIcon, ChevronDown } from "lucide-react";
import Preloader from "./Preloader";

interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface HeroProps {
  title: string;
  description: string;
  showCTA?: boolean;
  videoBackground?: string;
  heroImage?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  pageContext?: 'ngo' | 'professional' | 'tourism' | 'default';
}

// Contextual hero images reflecting Bahamas spirit and "People's Choice" theme
const contextImages = {
  // NGO focused image showing community and collaboration in Bahamas
  ngo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1920&auto=format&fit=crop',
  
  // Professional business setting with tropical Bahamian aesthetic
  professional: 'https://images.unsplash.com/photo-1617170788899-45af79abc4f7?q=80&w=1920&auto=format&fit=crop',
  
  // Tourism image showcasing Bahamas' beautiful beaches and clear waters
  tourism: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=1920&auto=format&fit=crop',
  
  // Default image showing Paradise Island with vibrant colors matching brand
  default: 'https://images.unsplash.com/photo-1575526164828-c31bcd857cf4?q=80&w=1920&auto=format&fit=crop'
};

export default function Hero({ 
  title, 
  description, 
  showCTA = true, 
  videoBackground,
  heroImage,
  primaryCTA,
  secondaryCTA,
  pageContext = 'default'
}: HeroProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get the appropriate hero image based on context
  const getContextImage = () => {
    // If a specific hero image is provided, use that one
    if (heroImage) return heroImage;
    
    // Otherwise use the default image for this page context
    return contextImages[pageContext];
  };
  
  useEffect(() => {
    // Check if this is the first visit to the homepage
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedHomepage');
    
    if (!hasVisitedBefore && window.location.pathname === '/') {
      setIsLoading(true);
      // Simulate loading time for other assets
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark that the user has visited the homepage
        sessionStorage.setItem('hasVisitedHomepage', 'true');
      }, 3500); // Match with preloader duration

      return () => clearTimeout(timer);
    }
    
    // Preload the contextual hero image
    const contextImage = getContextImage();
    if (contextImage) {
      const img = new Image();
      img.src = contextImage;
      img.onerror = () => setImageError(true);
    }
  }, [heroImage, pageContext]);

  const renderCTAButton = (cta: CTAButton) => {
    const buttonProps = {
      size: "lg" as const,
      className: cta === primaryCTA 
        ? "bg-[#00A0E3] hover:bg-[#0078A8] text-white"
        : "border-[#00A0E3] text-[#00A0E3] hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20",
      variant: cta === primaryCTA ? "default" as const : "outline" as const,
      onClick: cta.onClick
    };

    return cta.href ? (
      <Link href={cta.href}>
        <Button {...buttonProps}>
          {cta.text}
        </Button>
      </Link>
    ) : (
      <Button {...buttonProps}>
        {cta.text}
      </Button>
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  // Function to get dark tint overlay with blue/yellow accent
  const getOverlayTint = () => {
    // 60% dark tint overlay with subtle brand color gradient
    return 'bg-gradient-to-br from-black/60 via-black/60 to-[#00A0E3]/30'; // Brand-aware overlay
  };

  return (
    <section className="relative text-center min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background media - prioritize video, fall back to image if video fails or isn't provided */}
      {((videoBackground && !videoError) || (heroImage && !imageError)) && (
        <div className="absolute inset-0 w-full h-full">
          <div className={`absolute inset-0 ${getOverlayTint()} z-10`} />
          
          {/* Video background */}
          {videoBackground && !videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
              onError={() => setVideoError(true)}
            >
              <source src={videoBackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Hero image background - shown when video not available or errored */}
          {(!videoBackground || videoError) && !imageError && (
            <img
              src={getContextImage()}
              alt={`${title} - Hero Image`}
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      )}
      
      {/* Hero content */}
      <div className={`relative z-20 py-16 md:py-24 px-4 ${(videoBackground && !videoError) || (heroImage && !imageError) ? 'text-white' : ''}`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-6xl font-bold mb-6 ${
            (!videoBackground || videoError) && (!heroImage || imageError) 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#00A0E3] to-[#6CCFF6]' 
              : 'text-white drop-shadow-lg'
          }`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-lg max-w-2xl mx-auto mb-8 ${
            (videoBackground && !videoError) || (heroImage && !imageError) 
              ? 'text-gray-100 drop-shadow-md' 
              : 'text-muted-foreground'
          }`}
        >
          {description}
        </motion.p>
        {showCTA && (primaryCTA || secondaryCTA) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {primaryCTA && renderCTAButton(primaryCTA)}
            {secondaryCTA && renderCTAButton(secondaryCTA)}
          </motion.div>
        )}
      </div>
      
      {/* Animated Scroll Icon */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          delay: 1.2,
          duration: 0.5 
        }}
        onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}
      >
        <motion.div
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center"
        >
          <div className={`p-2 rounded-full border-2 ${
            (videoBackground && !videoError) || (heroImage && !imageError) 
              ? 'border-white text-white' 
              : 'border-[#00A0E3] text-[#00A0E3]'
          } mb-2`}>
            <MouseIcon className="w-5 h-5" />
          </div>
          <ChevronDown className={`w-5 h-5 ${
            (videoBackground && !videoError) || (heroImage && !imageError) 
              ? 'text-white' 
              : 'text-[#00A0E3]'
          }`} />
        </motion.div>
      </motion.div>
    </section>
  );
}