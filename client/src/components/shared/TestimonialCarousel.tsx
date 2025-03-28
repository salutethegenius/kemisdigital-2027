import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

// Optimize YouTube embed with memo and lazy loading
const YouTubeEmbed = memo(({ embedId }: { embedId: string }) => {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      title="Video testimonial"
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="lazy"
      referrerPolicy="no-referrer"
      allowFullScreen
    ></iframe>
  );
});

YouTubeEmbed.displayName = 'YouTubeEmbed';

export default function TestimonialCarousel({
  testimonials,
  autoplay = true,
  interval = 5000,
  className = ''
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Use useRef to track if component is mounted
  const isMounted = useRef(true);
  
  // Make sure we have valid testimonials
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) {
      console.error("No testimonials provided to TestimonialCarousel");
    }
    
    // Set isMounted to true when component mounts
    isMounted.current = true;
    
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [testimonials]);
  
  // Preload next testimonial image to improve user experience
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    
    // Preload both next and previous images to enhance UX during navigation
    const nextIndex = (currentIndex + 1) % testimonials.length;
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    
    const imagesToPreload = [
      testimonials[nextIndex]?.image,
      testimonials[prevIndex]?.image
    ].filter(Boolean);
    
    imagesToPreload.forEach(imageSrc => {
      if (imageSrc) {
        const img = new Image();
        img.src = imageSrc;
      }
    });
  }, [currentIndex, testimonials]);
  
  const handleNext = useCallback(() => {
    if (!isMounted.current || !testimonials || testimonials.length <= 1) {
      console.log("Next testimonial click ignored - invalid state:", 
                 { isMounted: isMounted.current, 
                   testimonialsLength: testimonials?.length });
      return;
    }
    
    console.log("Next testimonial clicked, moving from index", currentIndex, 
               "to", (currentIndex + 1) % testimonials.length);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials, currentIndex]);

  const handlePrev = useCallback(() => {
    if (!isMounted.current || !testimonials || testimonials.length <= 1) {
      console.log("Previous testimonial click ignored - invalid state:", 
                 { isMounted: isMounted.current, 
                   testimonialsLength: testimonials?.length });
      return;
    }
    
    console.log("Previous testimonial clicked, moving from index", currentIndex, 
               "to", (currentIndex - 1 + testimonials.length) % testimonials.length);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials, currentIndex]);

  // Disabling auto-advancing to prevent UI confusion
  // Users can still use the navigation buttons to advance
  /* Original autoplay code removed:
  useEffect(() => {
    if (!autoplay || isPaused || !isMounted.current || !testimonials || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext, isPaused, testimonials]);
  */

  if (!testimonials.length) return null;

  // Optimize animation variants - reduce motion for better performance
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200, // Reduced from 300 for better performance
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200, // Reduced from 300 for better performance
      opacity: 0,
    }),
  };

  // Check if current testimonial is a video
  const isVideoTestimonial = (quote: string) => {
    return quote.startsWith('https://youtu.be/') || quote.startsWith('https://www.youtube.com/');
  };

  // Get YouTube embed ID
  const getYoutubeEmbedId = (url: string) => {
    if (!url) return '';
    
    try {
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split('?')[0].split('&')[0].split('#')[0];
      } else if (url.includes('youtube.com/watch')) {
        return url.split('v=')[1].split('&')[0].split('#')[0];
      } else if (url.includes('youtube.com/embed/')) {
        return url.split('embed/')[1].split('?')[0].split('&')[0].split('#')[0];
      }
    } catch (error) {
      console.error('Error parsing YouTube URL:', error, url);
    }
    return '';
  };

  // Current testimonial for better readability
  const currentTestimonial = testimonials[currentIndex];
  const isCurrentVideoTestimonial = isVideoTestimonial(currentTestimonial.quote);
  const youtubeEmbedId = isCurrentVideoTestimonial ? getYoutubeEmbedId(currentTestimonial.quote) : '';

  // Handler for dot indicator clicks
  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      console.log(`Dot clicked, moving from index ${currentIndex} to ${index}`);
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              duration: 0.4, // Reduced from 0.5 for better performance
              ease: "easeInOut",
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            <Card className="border-[#00A0E3]/10 dark:border-[#00A0E3]/20 bg-transparent shadow-sm overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                {isCurrentVideoTestimonial ? (
                  <div className="w-full aspect-video mb-5 rounded-md overflow-hidden">
                    {youtubeEmbedId && <YouTubeEmbed embedId={youtubeEmbedId} />}
                  </div>
                ) : (
                  <div className="flex items-start gap-2 mb-5">
                    <Quote className="text-[#00A0E3] h-6 w-6 flex-shrink-0 mt-1" />
                    <p className="text-base sm:text-lg leading-relaxed text-pretty">{currentTestimonial.quote}</p>
                  </div>
                )}
                
                <div className="flex items-center mt-4">
                  {currentTestimonial.image && (
                    <div className="mr-4">
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.author}
                        className="w-12 h-12 rounded-full object-cover" 
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{currentTestimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Carousel navigation */}
      <div className="flex justify-center mt-4 gap-2">
        <Button
          onClick={handlePrev}
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full ${testimonials.length > 1 
            ? 'hover:bg-[#00A0E3]/10 hover:text-[#00A0E3] text-foreground dark:text-muted-foreground' 
            : 'opacity-50 cursor-not-allowed'}`}
          aria-label="Previous testimonial"
          type="button"
          disabled={testimonials.length <= 1}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#00A0E3] w-4'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#00A0E3]/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              type="button"
            />
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full ${testimonials.length > 1 
            ? 'hover:bg-[#00A0E3]/10 hover:text-[#00A0E3] text-foreground dark:text-muted-foreground' 
            : 'opacity-50 cursor-not-allowed'}`}
          aria-label="Next testimonial"
          type="button"
          disabled={testimonials.length <= 1}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}
