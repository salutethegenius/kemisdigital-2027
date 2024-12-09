import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  description: string;
  showCTA?: boolean;
  videoBackground?: string;
}

export default function Hero({ title, description, showCTA = true, videoBackground }: HeroProps) {
  return (
    <section className="relative text-center h-screen w-screen flex items-center justify-center overflow-hidden">
      {videoBackground && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className={`relative z-20 py-16 md:py-24 ${videoBackground ? 'text-white' : ''}`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-6xl font-bold mb-6 ${
            !videoBackground ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400' : ''
          }`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-lg max-w-2xl mx-auto mb-8 ${
            videoBackground ? 'text-gray-200' : 'text-muted-foreground'
          }`}
        >
          {description}
        </motion.p>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10"
            >
              Schedule Demo
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
