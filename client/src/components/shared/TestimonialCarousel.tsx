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
            <Card className="border-none shadow-lg max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="text-purple-600 dark:text-purple-400 mb-6 flex justify-center">
                  <Quote size={48} strokeWidth={1.5} />
                </div>
                <p className="text-lg md:text-xl text-center mb-8 italic">
                  {testimonials[currentIndex].quote}
                </p>
                <div className="flex flex-col items-center">
                  {testimonials[currentIndex].image && (
                    <div className="mb-4 w-16 h-16 overflow-hidden rounded-full border-2 border-purple-300 dark:border-purple-700">
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
          className="rounded-full h-10 w-10 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/30"
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
                  ? 'w-6 bg-purple-600 dark:bg-purple-500' 
                  : 'w-2.5 bg-purple-200 dark:bg-purple-800'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <Button 
          onClick={handleNext} 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/30"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}