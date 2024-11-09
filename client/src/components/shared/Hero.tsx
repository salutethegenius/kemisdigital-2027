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
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
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
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
            Join Us Today
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gold dark:border-gold-dark text-gold-dark dark:text-gold hover:bg-gold/10 dark:hover:bg-gold-dark/10"
          >
            Explore Benefits
          </Button>
        </motion.div>
      )}
    </section>
  );
}
