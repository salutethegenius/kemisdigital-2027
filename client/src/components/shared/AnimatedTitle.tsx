import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface AnimatedTitleProps {
  className?: string;
}

// Enhanced character variants for animation
const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }),
  hover: {
    y: -5,
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

// Enhanced container animations
const containerVariants = {
  normal: { 
    scale: 1
  },
  pulse: {
    scale: [1, 1.02, 1],
    transition: { 
      duration: 1.5, 
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

// Special themed characters with Caribbean/island style elements
export default function AnimatedTitle({ className = "" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerControls = useAnimationControls();
  const [letterHovering, setLetterHovering] = useState<number | null>(null);
  
  // Calculate responsive scale based on container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scale = Math.min(container.clientWidth / 600, 1);
        container.style.transform = `scale(${scale})`;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Start the container pulse animation after initial render
  useEffect(() => {
    const timeout = setTimeout(() => {
      containerControls.start("pulse");
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [containerControls]);

  // Function to handle hover start
  const handleHoverStart = (index: number) => {
    setLetterHovering(index);
  };

  // Function to handle hover end
  const handleHoverEnd = () => {
    setLetterHovering(null);
  };

  return (
    <div className={`flex justify-center items-center overflow-hidden ${className}`}>
      <motion.div 
        ref={containerRef}
        className="origin-center transform-gpu"
        style={{ height: '120px', transformOrigin: 'center' }}
        variants={containerVariants}
        initial="normal"
        animate={containerControls}
      >
        <div className="flex items-end gap-2 h-full">
          {/* T with palm tree */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(0)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="20" y="15" width="10" height="70" fill="#00A0E3" />
              {/* Palm tree trunk */}
              <path d="M25 0C25 0 23 5 25 10C27 15 28 12 25 15" stroke="#8B4513" strokeWidth="2" />
              {/* Palm tree leaves */}
              <path d="M25 0C25 0 30 3 28 6" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 20 3 22 6" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 27 -2 30 2" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 23 -2 20 2" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* H with waves */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(1)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="30" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              {/* Wave decoration */}
              <path d="M0 80C5 75 10 85 15 80C20 75 25 85 30 80C35 75 40 85 45 80" stroke="#00A0E3" strokeWidth="2" />
              <path d="M5 85C10 80 15 90 20 85C25 80 30 90 35 85C40 80 45 90 50 85" stroke="#00A0E3" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* E with sun */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(2)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Sun decoration */}
              <circle cx="40" cy="15" r="8" fill="#F7BE00" />
              {/* Sun rays */}
              <line x1="40" y1="3" x2="40" y2="0" stroke="#F7BE00" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="27" stroke="#F7BE00" strokeWidth="2" />
              <line x1="28" y1="15" x2="25" y2="15" stroke="#F7BE00" strokeWidth="2" />
              <line x1="55" y1="15" x2="52" y2="15" stroke="#F7BE00" strokeWidth="2" />
              <line x1="46" y1="9" x2="48" y2="7" stroke="#F7BE00" strokeWidth="2" />
              <line x1="34" y1="21" x2="32" y2="23" stroke="#F7BE00" strokeWidth="2" />
              <line x1="46" y1="21" x2="48" y2="23" stroke="#F7BE00" strokeWidth="2" />
              <line x1="34" y1="9" x2="32" y2="7" stroke="#F7BE00" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* K with fish */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(3)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <path d="M20 45L40 15" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              <path d="M20 45L40 75" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Fish decoration */}
              <path d="M45 35C50 35 50 40 45 40C48 42 48 33 45 35Z" fill="#F7BE00" />
              <circle cx="42" cy="37" r="1" fill="black" />
              <path d="M38 37C40 35 40 39 38 37" stroke="#F7BE00" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* E with shell */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(4)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Shell decoration */}
              <path d="M40 60C45 55 45 65 40 65C35 65 35 55 40 60Z" fill="#FFC0CB" />
              <path d="M40 60C42 58 42 62 40 62C38 62 38 58 40 60Z" fill="#FFECF1" />
            </svg>
          </motion.div>

          {/* M with coconuts */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(5)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="45" y="15" width="10" height="70" fill="#00A0E3" />
              <path d="M5 15L30 45L55 15" stroke="#00A0E3" strokeWidth="10" strokeLinejoin="round" />
              {/* Coconut decorations */}
              <circle cx="15" cy="10" r="5" fill="#8B4513" />
              <circle cx="25" cy="8" r="5" fill="#8B4513" />
              <circle cx="20" cy="14" r="5" fill="#8B4513" />
            </svg>
          </motion.div>

          {/* I with starfish */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(6)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              {/* Starfish decoration */}
              <path d="M15 5L18 10L23 8L20 13L25 16L19 18L20 23L15 20L10 23L11 18L5 16L10 13L7 8L12 10L15 5Z" fill="#FF7F50" />
            </svg>
          </motion.div>

          {/* S with coral */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative"
            onHoverStart={() => handleHoverStart(7)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 30C15 20 35 20 35 30C35 40 15 50 15 60C15 70 35 70 35 60" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Coral decoration */}
              <path d="M40 80C42 75 44 80 46 75C48 80 50 75 48 85" stroke="#FF6B6B" strokeWidth="2" />
              <path d="M35 85C37 80 39 85 41 80C43 85 45 80 43 90" stroke="#FF6B6B" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
