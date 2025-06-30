import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
// Removed sound effects import - sounds removed per user request

interface AnimatedTitleProps {
  className?: string;
}

// Enhanced character variants for animation with more Caribbean flair
const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      type: "spring",
      damping: 10,
      stiffness: 250
    }
  }),
  hover: {
    y: -8,
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 8
    }
  }
};

// Enhanced container animations with wave-like motions
const containerVariants = {
  normal: { 
    scale: 1
  },
  pulse: {
    scale: [1, 1.02, 1],
    transition: { 
      duration: 2, 
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

// Special themed characters with Caribbean/island style elements
export default function EnhancedAnimatedTitle({ className = "" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerControls = useAnimationControls();
  const [letterHovering, setLetterHovering] = useState<number | null>(null);
  // Sound effects removed per user request
  
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
    // Sound effects removed per user request
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
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(0)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="20" y="15" width="10" height="70" fill="#00A0E3" />
              {/* Palm tree trunk */}
              <path d="M25 0C25 0 23 5 25 10C27 15 28 12 25 15" stroke="#8B4513" strokeWidth="2" />
              {/* Palm tree leaves - enhanced with more details */}
              <path d="M25 0C25 0 30 3 28 6" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 20 3 22 6" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 27 -2 30 2" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 23 -2 20 2" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 31 0 29 4" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 0C25 0 19 0 21 4" stroke="#00BB77" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* H with waves */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(1)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="30" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              {/* Enhanced waves at the bottom */}
              <path d="M5 90C10 85 15 95 20 90C25 85 30 95 35 90C40 85 45 95 50 90" stroke="#00A0E3" strokeWidth="2" />
              <path d="M5 85C10 80 15 90 20 85C25 80 30 90 35 85C40 80 45 90 50 85" stroke="#81D4FA" strokeWidth="1.5" />
              <path d="M10 95C15 90 20 100 25 95C30 90 35 100 40 95" stroke="#81D4FA" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* E with fish */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(2)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Enhanced tropical fish */}
              <path d="M40 45C45 45 48 42 48 40C48 38 45 35 40 35L35 40L40 45Z" fill="#F7BE00" />
              <circle cx="43" cy="38" r="1" fill="black" />
              <path d="M35 40L40 45C38 47 38 43 35 40Z" fill="#F7BE00" />
              <path d="M35 40L40 35C38 33 38 37 35 40Z" fill="#F7BE00" />
              <path d="M44 41L46 43" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M44 39L46 37" stroke="#FF5A5A" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* P with sun */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(3)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              <rect x="40" y="25" width="10" height="20" fill="#00A0E3" />
              {/* Enhanced tropical sun */}
              <circle cx="25" cy="5" r="5" fill="#F7BE00" />
              <path d="M25 -3L25 -5" stroke="#F7BE00" strokeWidth="2" />
              <path d="M25 13L25 15" stroke="#F7BE00" strokeWidth="2" />
              <path d="M17 5L15 5" stroke="#F7BE00" strokeWidth="2" />
              <path d="M35 5L33 5" stroke="#F7BE00" strokeWidth="2" />
              <path d="M19 11L17 13" stroke="#F7BE00" strokeWidth="2" />
              <path d="M31 -1L33 -3" stroke="#F7BE00" strokeWidth="2" />
              <path d="M19 -1L17 -3" stroke="#F7BE00" strokeWidth="2" />
              <path d="M31 11L33 13" stroke="#F7BE00" strokeWidth="2" />
              {/* Add heat waves */}
              <path d="M23 -8C24 -9 26 -9 27 -8" stroke="#FFDD00" strokeWidth="1" strokeDasharray="1 1" />
              <path d="M21 -10C23 -12 27 -12 29 -10" stroke="#FFDD00" strokeWidth="1" strokeDasharray="1 1" />
            </svg>
          </motion.div>

          {/* E with cocktail */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(4)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Enhanced tropical cocktail */}
              <path d="M40 30L35 40L45 40L40 30Z" fill="#FF6B6B" />
              <path d="M40 40L40 45" stroke="#FF6B6B" strokeWidth="2" />
              <path d="M38 45L42 45" stroke="#FF6B6B" strokeWidth="2" />
              <circle cx="40" cy="35" r="2" fill="#FFEC5F" />
              <path d="M36 33L38 31" stroke="#81D4FA" strokeWidth="1" />
              <path d="M44 33L42 31" stroke="#81D4FA" strokeWidth="1" />
              {/* Umbrella */}
              <path d="M36 34L37 30" stroke="#00BB77" strokeWidth="1" />
              <path d="M39 32C39 32 38 30 37 30" stroke="#00BB77" strokeWidth="1" />
              <path d="M35 32C35 32 36 30 37 30" stroke="#00BB77" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* O with island */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(5)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 15C15 15 10 25 10 45C10 65 15 85 25 85C35 85 40 65 40 45C40 25 35 15 25 15Z" fill="#00A0E3" />
              <path d="M25 25C20 25 18 30 18 45C18 60 20 75 25 75C30 75 32 60 32 45C32 30 30 25 25 25Z" fill="white" />
              {/* Enhanced tropical island */}
              <path d="M20 80C20 80 22 75 25 75C28 75 30 80 30 80" fill="#F7BE00" />
              <path d="M20 80C20 80 22 75 25 75C28 75 30 80 30 80" stroke="#F7BE00" strokeWidth="1" />
              <path d="M25 75C25 75 24 70 25 68" stroke="#8B4513" strokeWidth="1" />
              <path d="M25 68C25 68 28 70 26 70" stroke="#00BB77" strokeWidth="1" />
              <path d="M25 68C25 68 22 70 24 70" stroke="#00BB77" strokeWidth="1" />
              <path d="M25 68C25 68 26 66 28 68" stroke="#00BB77" strokeWidth="1" />
              <path d="M25 68C25 68 24 66 22 68" stroke="#00BB77" strokeWidth="1" />
              {/* Add a tiny beach hut */}
              <path d="M21 74L23 74L23 72L21 72Z" fill="#8B4513" />
              <path d="M20 72L24 72L22 70Z" fill="#F7BE00" />
            </svg>
          </motion.div>

          {/* P with dolphin */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(6)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              <rect x="40" y="25" width="10" height="20" fill="#00A0E3" />
              {/* Enhanced Caribbean dolphin */}
              <path d="M40 60C40 60 47 55 45 50C43 45 40 50 40 50C40 50 38 47 35 50C32 53 35 60 40 60Z" fill="#b0c4de" />
              <circle cx="42" cy="52" r="1" fill="black" />
              <path d="M37 56C37 56 38 58 41 59" stroke="#87CEEB" strokeWidth="1" />
              <path d="M44 58C44 58 45 56 46 54" stroke="#87CEEB" strokeWidth="1" />
              {/* Water splash */}
              <path d="M41 62C42 63 43 64 44 63" stroke="#81D4FA" strokeWidth="1" strokeDasharray="1 1" />
              <path d="M38 62C37 63 36 64 35 63" stroke="#81D4FA" strokeWidth="1" strokeDasharray="1 1" />
            </svg>
          </motion.div>

          {/* L with boat */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(7)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Enhanced Caribbean sailboat */}
              <path d="M30 60C30 60 40 60 40 65C40 65 35 65 30 60Z" fill="#8B4513" />
              <path d="M35 55L35 60" stroke="#8B4513" strokeWidth="1" />
              <path d="M35 55C35 55 37 50 40 55" fill="#FFFFFF" />
              <path d="M35 55C35 55 37 50 40 55" stroke="#F7BE00" strokeWidth="1" />
              <path d="M35 55C35 55 33 50 30 55" fill="#FFFFFF" />
              <path d="M35 55C35 55 33 50 30 55" stroke="#FF6B6B" strokeWidth="1" />
              {/* Water reflection */}
              <path d="M30 67C32 66 38 66 40 67" stroke="#81D4FA" strokeWidth="1" strokeDasharray="1 1" />
            </svg>
          </motion.div>

          {/* E with shells */}
          <motion.div
            custom={8}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(8)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Enhanced Caribbean seashell */}
              <path d="M40 60C40 60 45 58 45 55C45 52 42 50 40 50C38 50 35 52 35 55C35 58 40 60 40 60Z" fill="#FFD8BE" />
              <path d="M40 60C40 60 41 57 40 55C39 53 40 50 40 50" stroke="#FFD8BE" strokeWidth="1" />
              <path d="M40 60C40 60 39 57 40 55C41 53 40 50 40 50" stroke="#FFD8BE" strokeWidth="1" />
              <path d="M40 50C40 50 38 51 38 53" stroke="#FFBEA0" strokeWidth="1" />
              <path d="M40 50C40 50 42 51 42 53" stroke="#FFBEA0" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* APOSTROPHE with starfish */}
          <motion.div
            custom={9}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(9)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="20" height="90" viewBox="0 0 20 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 15C5 15 10 15 10 20L5 30" stroke="#00A0E3" strokeWidth="5" strokeLinecap="round" />
              {/* Starfish */}
              <path d="M10 35L12 40L7 38L10 42L5 42L10 44L5 48L12 46L10 50L15 45" fill="#FF6B6B" />
              <path d="M10 35L12 40L7 38L10 42L5 42L10 44L5 48L12 46L10 50L15 45" stroke="#FF6B6B" strokeWidth="1" />
              <circle cx="10" cy="42" r="1" fill="#FFEC5F" />
            </svg>
          </motion.div>

          {/* S with sea turtle */}
          <motion.div
            custom={10}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(10)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 25C15 20 20 15 25 15C30 15 35 20 35 25C35 30 30 35 25 35C20 35 15 40 15 45C15 50 20 55 25 55C30 55 35 50 35 45" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Sea Turtle */}
              <path d="M25 65C22 65 20 70 25 72C30 74 35 70 32 67C29 64 28 65 25 65Z" fill="#00BB77" />
              <path d="M25 65C25 65 23 69 25 70" stroke="#008855" strokeWidth="1" />
              <path d="M25 65C25 65 27 69 25 70" stroke="#008855" strokeWidth="1" />
              <circle cx="24" cy="67" r="0.5" fill="black" />
              <circle cx="26" cy="67" r="0.5" fill="black" />
              <path d="M22 66L20 64" stroke="#00BB77" strokeWidth="1" />
              <path d="M28 66L30 64" stroke="#00BB77" strokeWidth="1" />
              <path d="M23 70L20 72" stroke="#00BB77" strokeWidth="1" />
              <path d="M27 70L30 72" stroke="#00BB77" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* D with beach umbrella */}
          <motion.div
            custom={11}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(11)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <path d="M10 15C10 15 25 15 35 25C45 35 45 65 35 75C25 85 10 85 10 85" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Beach Umbrella */}
              <path d="M45 60L45 75" stroke="#8B4513" strokeWidth="1" />
              <path d="M45 60C40 55 35 60 45 60" fill="#FF6B6B" />
              <path d="M45 60C50 55 55 60 45 60" fill="#F7BE00" />
              <path d="M45 60C40 65 35 60 45 60" fill="#00BB77" />
              <path d="M45 60C50 65 55 60 45 60" fill="#FF9EAB" />
              <path d="M45 60C40 55 35 60 45 60" stroke="#FF6B6B" strokeWidth="0.5" />
              <path d="M45 60C50 55 55 60 45 60" stroke="#F7BE00" strokeWidth="0.5" />
              <path d="M45 60C40 65 35 60 45 60" stroke="#00BB77" strokeWidth="0.5" />
              <path d="M45 60C50 65 55 60 45 60" stroke="#FF9EAB" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* I with lighthouse */}
          <motion.div
            custom={12}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(12)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              {/* Lighthouse */}
              <path d="M15 0L10 15L20 15L15 0Z" fill="#FF6B6B" />
              <rect x="11" y="5" width="8" height="2" fill="white" />
              <rect x="11" y="9" width="8" height="2" fill="white" />
              <path d="M14 0L16 0L15 -2L14 0Z" fill="#F7BE00" />
              <circle cx="15" cy="2" r="1" fill="#F7BE00" />
              {/* Light beams */}
              <path d="M12 0L10 -2" stroke="#F7BE00" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
              <path d="M18 0L20 -2" stroke="#F7BE00" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
              <path d="M20 4L22 2" stroke="#F7BE00" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
              <path d="M10 4L8 2" stroke="#F7BE00" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
            </svg>
          </motion.div>

          {/* G with parrot */}
          <motion.div
            custom={13}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(13)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35 25C35 20 30 15 25 15C20 15 15 20 15 25C15 45 15 65 15 65C15 70 20 75 25 75C30 75 35 70 35 65L35 45L25 45" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              {/* Tropical Parrot */}
              <path d="M45 25C45 25 40 20 35 25C30 30 35 35 40 35C45 35 48 30 45 25Z" fill="#FF6B6B" />
              <path d="M40 30C40 30 36 35 39 40C42 45 45 40 45 35" fill="#F7BE00" />
              <path d="M45 25C45 25 48 20 43 20C38 20 40 30 45 25Z" fill="#00BB77" />
              <circle cx="43" cy="28" r="1" fill="black" />
              <path d="M44 26C44 26 46 26 46 28" stroke="#F7BE00" strokeWidth="1" />
              <path d="M45 30L48 35" stroke="#F7BE00" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* I with floating balloon */}
          <motion.div
            custom={14}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(14)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              {/* Floating Balloon */}
              <path d="M15 5C13 5 11 7 11 10C11 13 13 15 15 15C17 15 19 13 19 10C19 7 17 5 15 5Z" fill="#FF6B6B" />
              <path d="M15 15L15 20" stroke="#F7BE00" strokeWidth="1" />
              <path d="M15 20L14 18" stroke="#F7BE00" strokeWidth="1" />
              <path d="M15 20L16 18" stroke="#F7BE00" strokeWidth="1" />
              {/* Reflections on balloon */}
              <path d="M14 8C14 8 15 7 16 8" stroke="white" strokeWidth="0.5" />
              <path d="M16 6L17 7" stroke="white" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* T with coconut */}
          <motion.div
            custom={15}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(15)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="20" y="15" width="10" height="70" fill="#00A0E3" />
              {/* Coconut */}
              <circle cx="15" cy="5" r="5" fill="#8B4513" />
              <path d="M15 0C15 0 13 3 16 5" stroke="#8B4513" strokeWidth="1" />
              <path d="M15 0C15 0 17 3 14 5" stroke="#8B4513" strokeWidth="1" />
              <path d="M15 0C15 0 10 0 12 5" stroke="#8B4513" strokeWidth="1" />
              <path d="M11 3C11 3 10 5 13 5" stroke="#5D3A1A" strokeWidth="0.5" />
              <path d="M15 2C15 2 18 1 17 4" stroke="#5D3A1A" strokeWidth="0.5" />
              {/* Palm tree stem */}
              <path d="M15 5L17 10" stroke="#8B4513" strokeWidth="1" />
              {/* Palm tree leaves */}
              <path d="M17 10C17 10 20 8 21 10" stroke="#00BB77" strokeWidth="1" />
              <path d="M17 10C17 10 20 12 21 10" stroke="#00BB77" strokeWidth="1" />
              <path d="M17 10C17 10 14 8 13 10" stroke="#00BB77" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* A with mermaid's tail */}
          <motion.div
            custom={16}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(16)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 85L25 15L40 85" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              <path d="M15 65L35 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Mermaid's Tail */}
              <path d="M25 5C25 5 20 0 20 4C20 8 25 12 25 12C25 12 30 8 30 4C30 0 25 5 25 5Z" fill="#00BB77" />
              <path d="M25 12L25 15" stroke="#00BB77" strokeWidth="1" />
              <path d="M20 4C20 4 21 3 22 4" stroke="#008855" strokeWidth="0.5" />
              <path d="M28 4C28 4 29 3 30 4" stroke="#008855" strokeWidth="0.5" />
              <path d="M23 8C23 8 24 10 25 9" stroke="#008855" strokeWidth="0.5" />
              <path d="M27 8C27 8 26 10 25 9" stroke="#008855" strokeWidth="0.5" />
              {/* Bubbles */}
              <circle cx="22" cy="2" r="1" fill="#81D4FA" />
              <circle cx="28" cy="2" r="0.5" fill="#81D4FA" />
              <circle cx="23" cy="6" r="0.5" fill="#81D4FA" />
            </svg>
          </motion.div>

          {/* L with beach chair */}
          <motion.div
            custom={17}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => handleHoverStart(17)}
            onHoverEnd={handleHoverEnd}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Beach Chair */}
              <path d="M35 45L40 60" stroke="#F7BE00" strokeWidth="2" />
              <path d="M45 45L40 60" stroke="#F7BE00" strokeWidth="2" />
              <path d="M35 45L45 45" stroke="#F7BE00" strokeWidth="2" />
              <path d="M37 50L43 50" stroke="#FF6B6B" strokeWidth="4" />
              <path d="M36 55L44 55" stroke="#FF6B6B" strokeWidth="4" />
              <path d="M40 60L38 65" stroke="#F7BE00" strokeWidth="1" />
              <path d="M40 60L42 65" stroke="#F7BE00" strokeWidth="1" />
              {/* Beach Ball */}
              <circle cx="47" cy="63" r="3" fill="white" />
              <path d="M45 61L49 65" stroke="#FF6B6B" strokeWidth="1" />
              <path d="M49 61L45 65" stroke="#00BB77" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
