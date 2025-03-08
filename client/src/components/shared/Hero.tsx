import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect } from "react";
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

// Placeholder for hero images (to be replaced with actual photos later)
const contextImages = {
  ngo: '',
  professional: '',
  tourism: '',
  default: ''
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
        ? "bg-purple-600 hover:bg-purple-700 text-white"
        : "border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10",
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

  // Function to get gradient overlay based on page context using KemisDigital brand colors
  const getOverlayGradient = () => {
    // Using brand colors: Blue #00A0E3 and Yellow/Gold #F7BE00
    switch (pageContext) {
      case 'ngo':
        return 'bg-gradient-to-b from-[#00A0E3]/70 to-[#00A0E3]/60'; // Blue brand theme for NGO
      case 'professional':
        return 'bg-gradient-to-b from-[#00A0E3]/70 to-[#0078A8]/60'; // Blue brand theme for professional
      case 'tourism':
        return 'bg-gradient-to-b from-[#00A0E3]/70 to-[#F7BE00]/60'; // Blue-Yellow brand theme for tourism/Bahamas
      default:
        return 'bg-gradient-to-b from-[#00A0E3]/80 to-[#00A0E3]/70'; // Default blue overlay
    }
  };

  return (
    <section className="relative text-center min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background media - prioritize video, fall back to image if video fails or isn't provided */}
      {((videoBackground && !videoError) || (heroImage && !imageError)) && (
        <div className="absolute inset-0 w-full h-full">
          <div className={`absolute inset-0 ${getOverlayGradient()} z-10`} />
          
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
    </section>
  );
}