import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect, useRef, memo } from "react";
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
// Optimized with better performance loading patterns and strategies
// Using pre-generated optimized images for better performance
const contextImages = {
  // NGO focused image showing community and collaboration in Bahamas
  ngo: {
    small: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=75&w=800&auto=format&fit=crop',
    medium: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=75&w=1280&auto=format&fit=crop',
    large: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=75&w=1920&auto=format&fit=crop',
    blur: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=10&w=20&auto=format&fit=crop&blur=10'
  },

  // Professional business setting with tropical Bahamian aesthetic
  professional: {
    small: 'https://images.unsplash.com/photo-1617170788899-45af79abc4f7?q=75&w=800&auto=format&fit=crop',
    medium: 'https://images.unsplash.com/photo-1617170788899-45af79abc4f7?q=75&w=1280&auto=format&fit=crop',
    large: 'https://images.unsplash.com/photo-1617170788899-45af79abc4f7?q=75&w=1920&auto=format&fit=crop',
    blur: 'https://images.unsplash.com/photo-1617170788899-45af79abc4f7?q=10&w=20&auto=format&fit=crop&blur=10'
  },

  // Tourism image - KemisDigital Beach Bahamas brand image
  // Using pre-optimized images with proper sizes for different devices
  tourism: {
    small: '/images/optimized/beachbahamas-small.jpg', // 800px width, optimized for mobile
    medium: '/images/optimized/beachbahamas-medium.jpg', // 1280px width, optimized for tablets
    large: '/images/optimized/beachbahamas-large.jpg', // Full size for desktops
    blur: '/images/optimized/beachbahamas-blur.jpg' // Tiny blurred image for immediate display
  },

  // Default image showing Paradise Island with vibrant colors matching brand
  default: {
    small: 'https://images.unsplash.com/photo-1575526164828-c31bcd857cf4?q=75&w=800&auto=format&fit=crop',
    medium: 'https://images.unsplash.com/photo-1575526164828-c31bcd857cf4?q=75&w=1280&auto=format&fit=crop',
    large: 'https://images.unsplash.com/photo-1575526164828-c31bcd857cf4?q=75&w=1920&auto=format&fit=crop',
    blur: 'https://images.unsplash.com/photo-1575526164828-c31bcd857cf4?q=10&w=20&auto=format&fit=crop&blur=10'
  }
};

// Enhanced memoized optimal image loading component with performance improvements
const OptimizedBackgroundImage = memo(({ 
  imageKey, 
  title, 
  onError 
}: { 
  imageKey: keyof typeof contextImages; 
  title: string; 
  onError: () => void 
}) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Prefetch higher resolution images once component mounts
  useEffect(() => {
    // Only prefetch if this is a local image (tourism context with beachbahamas.jpg)
    // For external images like Unsplash, browser will handle caching automatically
    if (imageKey === 'tourism') {
      // Timeout to ensure it doesn't compete with critical resources
      const prefetchTimeout = setTimeout(() => {
        const prefetchMedium = new Image();
        prefetchMedium.src = contextImages[imageKey].medium;

        // Wait until medium resolution is loaded before loading the large one
        prefetchMedium.onload = () => {
          const prefetchLarge = new Image();
          prefetchLarge.src = contextImages[imageKey].large;
        };
      }, 1000); // 1 second delay to prioritize visible content

      return () => clearTimeout(prefetchTimeout);
    }
  }, [imageKey]);

  return (
    <>
      {/* Enhanced low quality blur-up placeholder with early loading */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat filter blur-md scale-105 transition-opacity duration-700"
        style={{ 
          backgroundImage: `url(${contextImages[imageKey].blur})`,
          opacity: loaded ? 0 : 1,
          // Adding transform properties for better hardware acceleration
          transform: 'translateZ(0)'
        }}
        aria-hidden="true"
      />

      {/* Main responsive image with improved srcset and fetchpriority */}
      <img
        ref={imageRef}
        src={contextImages[imageKey].large}
        srcSet={`
          ${contextImages[imageKey].small} 800w,
          ${contextImages[imageKey].medium} 1280w,
          ${contextImages[imageKey].large} 1920w
        `}
        sizes="(max-width: 800px) 800px, (max-width: 1280px) 1280px, 1920px"
        alt={`${title} - Hero Background`}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-700"
        style={{ 
          opacity: loaded ? 1 : 0,
          // Adding transform properties for better hardware acceleration
          transform: 'translateZ(0)'
        }}
        onLoad={() => setLoaded(true)}
        onError={onError}
        loading="eager" // Load immediately as it's above the fold
        decoding="async" // Allow the browser to decode the image asynchronously
        fetchPriority="high" // High priority for hero image
      />
    </>
  );
});

OptimizedBackgroundImage.displayName = 'OptimizedBackgroundImage';

// Optimized video component with preload logic
const BackgroundVideo = memo(({ 
  src, 
  onError 
}: { 
  src: string; 
  onError: () => void 
}) => {
  // Using low quality setting for initial load
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      onError={onError}
      preload="metadata" // Only preload metadata to improve initial load time
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

BackgroundVideo.displayName = 'BackgroundVideo';

// Main Hero component
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
  const [backgroundType, setBackgroundType] = useState<'image' | 'video' | 'none'>('none');
  const imagesPreloaded = useRef(false);

  // Get the appropriate hero image based on context
  const getContextImageKey = (): keyof typeof contextImages => {
    return pageContext as keyof typeof contextImages;
  };

  // First effect to handle the loading screen and set visited state
  useEffect(() => {
    // Check if this is the first visit to the homepage
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedHomepage');

    if (!hasVisitedBefore && window.location.pathname === '/') {
      setIsLoading(true);
      // Reduced loading time for better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark that the user has visited the homepage
        sessionStorage.setItem('hasVisitedHomepage', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Second effect to determine background type and preload images
  useEffect(() => {
    // Immediately determine what type of background to show with priority order
    if (videoBackground && !videoError) {
      setBackgroundType('video');
    } else if ((heroImage || pageContext) && !imageError) {
      setBackgroundType('image');
    } else {
      setBackgroundType('none');
    }

    // Preload images but make sure we only do it once
    if (!imagesPreloaded.current) {
      imagesPreloaded.current = true;

      // Preload direct hero image if provided
      if (heroImage) {
        const img = new Image();
        img.src = heroImage;
      }

      // Performance optimization - always preload contextual images when applicable
      if (pageContext && !heroImage) {
        // Create and configure link rel=preload for the blur image
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = contextImages[getContextImageKey()].blur;
        document.head.appendChild(preloadLink);

        // Immediately preload small and medium versions
        const preloadSmall = new Image();
        preloadSmall.src = contextImages[getContextImageKey()].small;

        const preloadMedium = new Image();
        preloadMedium.src = contextImages[getContextImageKey()].medium;

        // Preload the large version immediately as well
        const preloadLarge = new Image();
        preloadLarge.src = contextImages[getContextImageKey()].large;

        // Return cleanup function to remove preload link on unmount
        return () => {
          if (document.head.contains(preloadLink)) {
            document.head.removeChild(preloadLink);
          }
        };
      }
    }
  }, [heroImage, pageContext, videoBackground, videoError, imageError]);

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
    <section className="relative text-center min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden mt-0 pt-0">
      {/* Background media - prioritize video, fall back to image if video fails or isn't provided */}
      {backgroundType !== 'none' && (
        <div className="absolute inset-0 w-full h-full">
          <div className={`absolute inset-0 ${getOverlayTint()} z-10`} />

          {/* Video background */}
          {backgroundType === 'video' && videoBackground && (
            <BackgroundVideo 
              src={videoBackground} 
              onError={() => {
                setVideoError(true);
                setBackgroundType('image');
              }} 
            />
          )}

          {/* Hero image background - shown when video not available or errored */}
          {backgroundType === 'image' && (
            <>
              {heroImage ? (
                // Custom hero image with improved loading attributes
                <img
                  src={heroImage}
                  alt={`${title} - Hero Image`}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                  onError={() => {
                    setImageError(true);
                    setBackgroundType('none');
                  }}
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              ) : (
                // Contextual responsive image
                <OptimizedBackgroundImage 
                  imageKey={getContextImageKey()} 
                  title={title} 
                  onError={() => {
                    setImageError(true);
                    setBackgroundType('none');
                  }} 
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Hero content */}
      <div className={`relative z-20 py-12 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto ${backgroundType !== 'none' ? 'text-white' : ''}`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${
            backgroundType === 'none'
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
          className={`text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8 ${
            backgroundType === 'none'
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
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {primaryCTA && renderCTAButton(primaryCTA)}
            {secondaryCTA && renderCTAButton(secondaryCTA)}
          </motion.div>
        )}
      </div>

      {/* Animated Scroll Icon - Hidden on Mobile */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer hidden sm:flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          delay: 1,  // Reduced for better performance
          duration: 0.4 // Reduced for better performance
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
            backgroundType !== 'none'
              ? 'border-white text-white' 
              : 'border-[#00A0E3] text-[#00A0E3]'
          } mb-2`}>
            <MouseIcon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 ${
            backgroundType !== 'none'
              ? 'text-white' 
              : 'text-[#00A0E3]'
          }`} />
        </motion.div>
      </motion.div>
    </section>
  );
}