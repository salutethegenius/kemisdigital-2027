import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

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

// Optimized image component
const TestimonialImage = memo(({ image, author, className = '' }: { image: string; author: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  if (error || !image) return null;
  
  return (
    <div className={`overflow-hidden rounded-full border-2 border-[#00A0E3]/30 dark:border-[#00A0E3]/50 ${className}`}>
      <img 
        src={image} 
        alt={author}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
});

TestimonialImage.displayName = 'TestimonialImage';

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
  
  // Preload next testimonial image to improve user experience
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    const nextTestimonial = testimonials[nextIndex];
    
    if (nextTestimonial?.image) {
      const img = new Image();
      img.src = nextTestimonial.image;
    }
    
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [currentIndex, testimonials]);

  const handleNext = useCallback(() => {
    if (!isMounted.current) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    if (!isMounted.current) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay || isPaused || !isMounted.current) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext, isPaused]);

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
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center"
          >
            <Card 
              className={`border-none shadow-lg mx-auto ${
                isCurrentVideoTestimonial 
                  ? 'max-w-4xl bg-gradient-to-r from-[#00A0E3]/10 to-[#F7BE00]/10 dark:from-[#00A0E3]/15 dark:to-[#F7BE00]/15' 
                  : 'max-w-3xl bg-gradient-to-r from-[#00A0E3]/5 to-[#0078A8]/5 dark:from-[#00A0E3]/10 dark:to-[#0078A8]/10'
              }`}
            >
              <CardContent className="pt-6 px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
                {/* Video testimonial gets special treatment */}
                {isCurrentVideoTestimonial ? (
                  <div className="space-y-6">
                    {/* Video badge */}
                    <div className="mx-auto w-fit px-3 py-1 rounded-full bg-[#F7BE00]/20 text-[#F7BE00] dark:bg-[#F7BE00]/30 dark:text-[#F7BE00] text-sm font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m17 5 5 5-5 5" />
                        <path d="M2 5v14" />
                        <path d="M8 5v14" />
                        <rect width="4" height="14" x="4" y="5" />
                      </svg>
                      Video Testimonial
                    </div>
                    
                    {/* Video embed with special border */}
                    <div className="aspect-video w-full max-w-xl mx-auto border-4 border-[#00A0E3]/30 dark:border-[#00A0E3]/40 rounded-lg overflow-hidden shadow-lg">
                      {youtubeEmbedId ? (
                        <YouTubeEmbed embedId={youtubeEmbedId} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/5 dark:bg-black/20">
                          <p className="text-muted-foreground text-sm">Video could not be loaded</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Caption below video */}
                    <div className="flex items-center justify-center gap-3 mt-2">
                      {currentTestimonial.image && (
                        <TestimonialImage 
                          image={currentTestimonial.image} 
                          author={currentTestimonial.author} 
                          className="w-12 h-12"
                        />
                      )}
                      <div className="text-left">
                        <h4 className="font-semibold">{currentTestimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentTestimonial.role}, {currentTestimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Text testimonial - original design with enhancements
                  <>
                    <div className="text-[#00A0E3] dark:text-[#00A0E3]/80 mb-6 flex justify-center">
                      <Quote size={48} strokeWidth={1.5} />
                    </div>
                    <p className="text-lg md:text-xl text-center mb-8 italic">
                      {currentTestimonial.quote}
                    </p>
                    <div className="flex flex-col items-center">
                      {currentTestimonial.image && (
                        <TestimonialImage 
                          image={currentTestimonial.image} 
                          author={currentTestimonial.author}
                          className="mb-4 w-16 h-16"
                        />
                      )}
                      <div className="text-center">
                        <h4 className="font-semibold text-lg">{currentTestimonial.author}</h4>
                        <p className="text-muted-foreground">
                          {currentTestimonial.role}, {currentTestimonial.company}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Enhanced for mobile */}
      <div className="flex justify-center mt-6 gap-2 sm:gap-4">
        <Button 
          onClick={handlePrev} 
          variant="outline" 
          size="icon" 
          className="rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-5 sm:w-6 bg-[#00A0E3] dark:bg-[#00A0E3]' 
                  : 'w-2.5 bg-[#00A0E3]/20 dark:bg-[#00A0E3]/40'
              } ${isVideoTestimonial(testimonial.quote) ? 'sm:h-3 sm:w-8' : ''}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <Button 
          onClick={handleNext} 
          variant="outline" 
          size="icon" 
          className="rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}
