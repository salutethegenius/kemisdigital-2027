import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [shouldExit, setShouldExit] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start longer loading animation (minimum 5 seconds to ensure 50% loading time)
    const minLoadTime = 5000; // 5 seconds minimum loading time
    
    // Update progress every 50ms
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Increase progress gradually, ensuring we stay at 99% until fully loaded
        const nextValue = prev + (prev < 50 ? 1 : prev < 90 ? 0.5 : 0.25);
        return Math.min(nextValue, 99);
      });
    }, 50);
    
    // Exit animation after minimum load time
    const timer = setTimeout(() => {
      setProgress(100);
      setShouldExit(true);
      clearInterval(progressInterval);
    }, minLoadTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldExit ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{ pointerEvents: shouldExit ? 'none' : 'auto' }}
    >
      <div className="relative flex flex-col items-center w-72">
        {/* Outer spinning circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-[#00A0E3]/20 rounded-full border-t-[#00A0E3]"
        />
        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#00A0E3] rounded-full opacity-50"
        />
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-lg font-medium text-[#00A0E3]"
        >
          Loading Kemis Digital...
        </motion.span>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <motion.div 
            className="h-full bg-[#00A0E3]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
}