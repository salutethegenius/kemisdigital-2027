import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

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
            onHoverStart={() => setLetterHovering(0)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(1)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(2)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(3)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(4)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(5)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(6)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(7)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(8)}
            onHoverEnd={() => setLetterHovering(null)}
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
            onHoverStart={() => setLetterHovering(9)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="20" height="90" viewBox="0 0 20 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 15C5 15 10 15 10 20C10 25 5 30 5 30" stroke="#00A0E3" strokeWidth="5" strokeLinecap="round" />
              {/* Enhanced Caribbean starfish */}
              <path d="M10 5L12 10L17 10L13 13L14 18L10 15L6 18L7 13L3 10L8 10L10 5Z" fill="#FF9A5A" />
              <path d="M10 5L12 10L17 10L13 13L14 18L10 15L6 18L7 13L3 10L8 10L10 5Z" stroke="#FF7F50" strokeWidth="0.5" />
              <circle cx="10" cy="11" r="1" fill="#FF7F50" />
            </svg>
          </motion.div>

          {/* S with crab */}
          <motion.div
            custom={10}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(10)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 25C10 25 10 15 25 15C40 15 40 25 40 35C40 45 10 45 10 55C10 65 10 75 25 75C40 75 40 65 40 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Enhanced Caribbean crab */}
              <circle cx="40" cy="50" r="5" fill="#FF5A5A" />
              <circle cx="38" cy="48" r="1" fill="black" />
              <circle cx="42" cy="48" r="1" fill="black" />
              <path d="M35 50L30 45" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M35 53L30 55" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M45 50L50 45" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M45 53L50 55" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M40 55L40 58" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M38 52L40 54L42 52" stroke="#FF0000" strokeWidth="1" />
              <path d="M29 44L31 46" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M29 56L31 54" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M51 44L49 46" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M51 56L49 54" stroke="#FF5A5A" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* C with coral */}
          <motion.div
            custom={11}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(11)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 25C40 25 30 15 20 15C10 15 10 25 10 45C10 65 10 75 20 75C30 75 40 65 40 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Enhanced Caribbean coral */}
              <path d="M45 50C45 50 48 55 45 60C42 65 40 60 40 60C40 60 38 65 35 60C32 55 35 50 35 50" fill="#FF7EB6" />
              <path d="M45 50C45 50 48 55 45 60C42 65 40 60 40 60C40 60 38 65 35 60C32 55 35 50 35 50" stroke="#FF5A8C" strokeWidth="0.5" />
              <path d="M40 50C40 50 41 46 40 42" stroke="#FF5A8C" strokeWidth="1" />
              <path d="M40 50C40 50 39 46 40 42" stroke="#FF5A8C" strokeWidth="1" />
              <path d="M38 52C38 52 36 50 37 47" stroke="#FF5A8C" strokeWidth="1" />
              <path d="M42 52C42 52 44 50 43 47" stroke="#FF5A8C" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* H with sail */}
          <motion.div
            custom={12}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(12)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="30" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              {/* Enhanced Caribbean sailboat */}
              <path d="M40 15L50 30H40V15Z" fill="#F7BE00" />
              <path d="M40 30L45 30" stroke="#8B4513" strokeWidth="2" />
              <path d="M45 25L47 22" stroke="#00BFFF" strokeWidth="1" strokeDasharray="1 1" />
              <path d="M45 28L47 29" stroke="#00BFFF" strokeWidth="1" strokeDasharray="1 1" />
              <path d="M40 15L50 30H40V15Z" stroke="#FF7F00" strokeWidth="0.5" />
              <path d="M43 22L46 20" stroke="#FF7F00" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* O with bubbles */}
          <motion.div
            custom={13}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(13)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 15C15 15 10 25 10 45C10 65 15 85 25 85C35 85 40 65 40 45C40 25 35 15 25 15Z" fill="#00A0E3" />
              <path d="M25 25C20 25 18 30 18 45C18 60 20 75 25 75C30 75 32 60 32 45C32 30 30 25 25 25Z" fill="white" />
              {/* Enhanced Caribbean bubbles */}
              <circle cx="45" cy="30" r="3" fill="#81D4FA" fillOpacity="0.7" />
              <circle cx="45" cy="30" r="3" stroke="#5DADE2" strokeWidth="0.5" />
              <circle cx="42" cy="20" r="2" fill="#81D4FA" fillOpacity="0.7" />
              <circle cx="42" cy="20" r="2" stroke="#5DADE2" strokeWidth="0.5" />
              <circle cx="47" cy="40" r="2" fill="#81D4FA" fillOpacity="0.7" />
              <circle cx="47" cy="40" r="2" stroke="#5DADE2" strokeWidth="0.5" />
              <circle cx="44" cy="25" r="1" fill="#81D4FA" fillOpacity="0.7" />
              <circle cx="46" cy="36" r="1" fill="#81D4FA" fillOpacity="0.7" />
              <circle cx="43" cy="35" r="1" fill="#81D4FA" fillOpacity="0.7" />
              <path d="M43 33L44 30" stroke="#5DADE2" strokeWidth="0.5" strokeDasharray="1 1" />
              <path d="M44 23L43 18" stroke="#5DADE2" strokeWidth="0.5" strokeDasharray="1 1" />
            </svg>
          </motion.div>

          {/* I with lighthouse */}
          <motion.div
            custom={14}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(14)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="5" y="15" width="20" height="10" fill="#00A0E3" />
              <rect x="5" y="75" width="20" height="10" fill="#00A0E3" />
              {/* Enhanced Caribbean lighthouse */}
              <rect x="12" y="0" width="6" height="12" fill="#FFFFFF" />
              <rect x="10" y="12" width="10" height="3" fill="#FF0000" />
              <rect x="12" y="6" width="6" height="3" fill="#FF0000" />
              <circle cx="15" cy="3" r="2" fill="#FFDD00" />
              <path d="M17 3L19 1" stroke="#FFDD00" strokeWidth="0.5" />
              <path d="M17 3L19 5" stroke="#FFDD00" strokeWidth="0.5" />
              <path d="M13 3L11 1" stroke="#FFDD00" strokeWidth="0.5" />
              <path d="M13 3L11 5" stroke="#FFDD00" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* C with flamingo */}
          <motion.div
            custom={15}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(15)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 25C40 25 30 15 20 15C10 15 10 25 10 45C10 65 10 75 20 75C30 75 40 65 40 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Caribbean flamingo */}
              <path d="M45 45C44 38 40 38 40 40C40 42 42 43 42 46C42 49 40 50 40 50" stroke="#FF80AB" strokeWidth="2" />
              <circle cx="45" cy="45" r="1.5" fill="#FF80AB" />
              <path d="M42 46L38 54" stroke="#FF80AB" strokeWidth="1" />
              <path d="M38 54L36 54" stroke="#FF80AB" strokeWidth="1" />
              <path d="M36 54L37 56" stroke="#FF80AB" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* E with turtle */}
          <motion.div
            custom={16}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(16)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Caribbean sea turtle */}
              <ellipse cx="40" cy="40" rx="5" ry="4" fill="#00BB77" />
              <path d="M43 38L46 36" stroke="#00BB77" strokeWidth="1" />
              <path d="M37 38L34 36" stroke="#00BB77" strokeWidth="1" />
              <path d="M43 42L46 44" stroke="#00BB77" strokeWidth="1" />
              <path d="M37 42L34 44" stroke="#00BB77" strokeWidth="1" />
              <path d="M40 44L40 46" stroke="#00BB77" strokeWidth="1" />
              <path d="M38 40L39 41" stroke="#004D34" strokeWidth="1" />
              <path d="M42 40L41 41" stroke="#004D34" strokeWidth="1" />
              <path d="M38 38L42 38" stroke="#004D34" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* ! with beach ball */}
          <motion.div
            custom={17}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={characterVariants}
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(17)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="50" fill="#00A0E3" />
              <rect x="10" y="75" width="10" height="10" fill="#00A0E3" />
              {/* Caribbean beach ball */}
              <circle cx="15" cy="5" r="5" fill="#FFFFFF" />
              <path d="M15 0L15 10" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M10 5L20 5" stroke="#5DADE2" strokeWidth="1" />
              <path d="M11 1L19 9" stroke="#FFDD00" strokeWidth="1" />
              <path d="M11 9L19 1" stroke="#00BB77" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
