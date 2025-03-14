import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SoundButton } from '@/components/ui/sound-button';
import { useSound } from '@/hooks/use-sound-effects';

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
  const { play } = useSound();
  
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
    play("click");
  }, [testimonials, currentIndex, play]);

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
    play("click");
  }, [testimonials, currentIndex, play]);

  useEffect(() => {
    if (!autoplay || isPaused || !isMounted.current || !testimonials || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext, isPaused, testimonials]);

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
      play("click");
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
                
                <div className="flex items-center mt-4 gap-3">
                  {currentTestimonial.image && (
                    <TestimonialImage 
                      image={currentTestimonial.image} 
                      author={currentTestimonial.author} 
                      className="h-12 w-12 sm:h-14 sm:w-14" 
                    />
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
      
      <div className="flex items-center justify-between mt-4">
        <SoundButton 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (testimonials.length > 1) {
              console.log("Previous button clicked");
              handlePrev();
            }
          }} 
          variant="outline" 
          size="icon" 
          className={`rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0 
            ${testimonials.length > 1 
              ? 'hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'}`}
          aria-label="Previous testimonial"
          type="button"
          disabled={testimonials.length <= 1}
          soundEffect="click"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </SoundButton>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDotClick(index);
              }}
              onMouseEnter={() => play("hover")}
              type="button"
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-5 sm:w-6 bg-[#00A0E3] dark:bg-[#00A0E3]' 
                  : 'w-2.5 bg-[#00A0E3]/20 dark:bg-[#00A0E3]/40 hover:bg-[#00A0E3]/60'
              } ${isVideoTestimonial(testimonial.quote) ? 'sm:h-3 sm:w-8' : ''}`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        <SoundButton 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (testimonials.length > 1) {
              console.log("Next button clicked");
              handleNext();
            }
          }} 
          variant="outline" 
          size="icon" 
          className={`rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0 
            ${testimonials.length > 1 
              ? 'hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'}`}
          aria-label="Next testimonial"
          type="button"
          disabled={testimonials.length <= 1}
          soundEffect="click"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </SoundButton>
      </div>
    </div>
  );
}
