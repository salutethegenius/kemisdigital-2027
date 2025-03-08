import { useState, useEffect, useCallback } from 'react';
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

export default function TestimonialCarousel({
  testimonials,
  autoplay = true,
  interval = 5000,
  className = ''
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext, isPaused]);

  if (!testimonials.length) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
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
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Card className="border-none shadow-lg max-w-3xl mx-auto bg-gradient-to-r from-[#00A0E3]/5 to-[#0078A8]/5 dark:from-[#00A0E3]/10 dark:to-[#0078A8]/10">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="text-[#00A0E3] dark:text-[#00A0E3]/80 mb-6 flex justify-center">
                  <Quote size={48} strokeWidth={1.5} />
                </div>
                <p className="text-lg md:text-xl text-center mb-8 italic">
                  {testimonials[currentIndex].quote}
                </p>
                <div className="flex flex-col items-center">
                  {testimonials[currentIndex].image && (
                    <div className="mb-4 w-16 h-16 overflow-hidden rounded-full border-2 border-[#00A0E3]/30 dark:border-[#00A0E3]/50">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].author}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{testimonials[currentIndex].author}</h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <Button 
          onClick={handlePrev} 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 p-0 hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-6 bg-[#00A0E3] dark:bg-[#00A0E3]' 
                  : 'w-2.5 bg-[#00A0E3]/20 dark:bg-[#00A0E3]/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <Button 
          onClick={handleNext} 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 p-0 hover:bg-[#00A0E3]/10 dark:hover:bg-[#00A0E3]/20"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}