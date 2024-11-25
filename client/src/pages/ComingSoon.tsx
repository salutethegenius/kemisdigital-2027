import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import CountdownTimer from "@/components/shared/CountdownTimer";

export default function ComingSoon() {
  // Set launch date to January 1st, 2025
  const launchDate = new Date('2025-01-01T00:00:00');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-8"
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
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
      </motion.div>
    </div>
  );
}
