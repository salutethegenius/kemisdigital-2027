import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  description: string;
  showCTA?: boolean;
}

export default function Hero({ title, description, showCTA = true }: HeroProps) {
  return (
    <section className="text-center py-16 md:py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
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
    </section>
  );
}
