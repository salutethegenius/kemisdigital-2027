import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldExit(true);
    }, 3500); // Show for exactly 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldExit ? 0 : 1 }}
      transition={{ duration: 3.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative">
        {/* Outer spinning circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-200 rounded-full border-t-purple-600"
        />
        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full opacity-50"
        />
      </div>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute mt-24 text-lg font-medium text-purple-600"
      >
        Loading...
      </motion.span>
    </motion.div>
  );
}
