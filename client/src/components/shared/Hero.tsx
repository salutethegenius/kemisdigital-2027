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
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
}

export default function Hero({ 
  title, 
  description, 
  showCTA = true, 
  videoBackground,
  primaryCTA,
  secondaryCTA 
}: HeroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Simulate loading time for other assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Match with preloader duration

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <section className="relative text-center min-h-screen w-full flex items-center justify-center overflow-hidden">
      {videoBackground && !videoError && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-10" />
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
        </div>
      )}
      <div className={`relative z-20 py-16 md:py-24 ${videoBackground && !videoError ? 'text-white' : ''}`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-6xl font-bold mb-6 ${
            !videoBackground || videoError ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400' : ''
          }`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-lg max-w-2xl mx-auto mb-8 ${
            videoBackground && !videoError ? 'text-gray-200' : 'text-muted-foreground'
          }`}
        >
          {description}
        </motion.p>
        {showCTA && (primaryCTA || secondaryCTA) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            {primaryCTA && renderCTAButton(primaryCTA)}
            {secondaryCTA && renderCTAButton(secondaryCTA)}
          </motion.div>
        )}
      </div>
    </section>
  );
}