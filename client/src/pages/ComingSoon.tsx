import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CountdownTimer from "@/components/shared/CountdownTimer";
import Preloader from "@/components/shared/Preloader";
import { Link } from "wouter";

export default function ComingSoon() {
  const [isLoading, setIsLoading] = useState(true);
  // Set launch date to January 1st, 2025
  const launchDate = new Date('2025-01-01T00:00:00');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Match preloader duration

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00A0E3] to-[#F7BE00]"
        >
          KemisDigital AI Marketing Firm
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground mb-12"
        >
          We're working hard to bring you the future of AI-powered marketing. Stay tuned!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <CountdownTimer targetDate={launchDate} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 text-sm text-muted-foreground"
        >
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
