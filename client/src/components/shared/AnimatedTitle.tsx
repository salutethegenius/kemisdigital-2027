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
            onHoverStart={() => setLetterHovering(0)}
            onHoverEnd={() => setLetterHovering(null)}
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
            className="relative cursor-pointer"
            onHoverStart={() => setLetterHovering(1)}
            onHoverEnd={() => setLetterHovering(null)}
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="30" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              {/* Waves at the bottom */}
              <path d="M5 90C10 85 15 95 20 90C25 85 30 95 35 90C40 85 45 95 50 90" stroke="#00A0E3" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* E with fish */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Fish */}
              <path d="M40 45C45 45 48 42 48 40C48 38 45 35 40 35L35 40L40 45Z" fill="#F7BE00" />
              <circle cx="43" cy="38" r="1" fill="black" />
              <path d="M35 40L40 45C38 47 38 43 35 40Z" fill="#F7BE00" />
              <path d="M35 40L40 35C38 33 38 37 35 40Z" fill="#F7BE00" />
            </svg>
          </motion.div>

          {/* P with sun */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              <rect x="40" y="25" width="10" height="20" fill="#00A0E3" />
              {/* Sun */}
              <circle cx="25" cy="5" r="5" fill="#F7BE00" />
              <path d="M25 -3L25 -5" stroke="#F7BE00" strokeWidth="2" />
              <path d="M25 13L25 15" stroke="#F7BE00" strokeWidth="2" />
              <path d="M17 5L15 5" stroke="#F7BE00" strokeWidth="2" />
              <path d="M35 5L33 5" stroke="#F7BE00" strokeWidth="2" />
              <path d="M19 11L17 13" stroke="#F7BE00" strokeWidth="2" />
              <path d="M31 -1L33 -3" stroke="#F7BE00" strokeWidth="2" />
              <path d="M19 -1L17 -3" stroke="#F7BE00" strokeWidth="2" />
              <path d="M31 11L33 13" stroke="#F7BE00" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* E with cocktail */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Cocktail glass */}
              <path d="M40 30L35 40L45 40L40 30Z" fill="#FF6B6B" />
              <path d="M40 40L40 45" stroke="#FF6B6B" strokeWidth="2" />
              <path d="M38 45L42 45" stroke="#FF6B6B" strokeWidth="2" />
              <circle cx="40" cy="35" r="2" fill="#FFEC5F" />
            </svg>
          </motion.div>

          {/* O with island */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 15C15 15 10 25 10 45C10 65 15 85 25 85C35 85 40 65 40 45C40 25 35 15 25 15Z" fill="#00A0E3" />
              <path d="M25 25C20 25 18 30 18 45C18 60 20 75 25 75C30 75 32 60 32 45C32 30 30 25 25 25Z" fill="white" />
              {/* Island with palm */}
              <path d="M20 80C20 80 22 75 25 75C28 75 30 80 30 80" fill="#F7BE00" />
              <path d="M20 80C20 80 22 75 25 75C28 75 30 80 30 80" stroke="#F7BE00" strokeWidth="1" />
              <path d="M25 75C25 75 24 70 25 68" stroke="#8B4513" strokeWidth="1" />
              <path d="M25 68C25 68 28 70 26 70" stroke="#00BB77" strokeWidth="1" />
              <path d="M25 68C25 68 22 70 24 70" stroke="#00BB77" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* P with dolphin */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              <rect x="40" y="25" width="10" height="20" fill="#00A0E3" />
              {/* Dolphin */}
              <path d="M40 60C40 60 47 55 45 50C43 45 40 50 40 50C40 50 38 47 35 50C32 53 35 60 40 60Z" fill="#b0c4de" />
              <circle cx="42" cy="52" r="1" fill="black" />
            </svg>
          </motion.div>

          {/* L with boat */}
          <motion.div
            custom={8}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Small boat */}
              <path d="M30 60C30 60 40 60 40 65C40 65 35 65 30 60Z" fill="#8B4513" />
              <path d="M35 55L35 60" stroke="#8B4513" strokeWidth="1" />
              <path d="M35 55C35 55 37 50 40 55" fill="#FFFFFF" />
              <path d="M35 55C35 55 37 50 40 55" stroke="#F7BE00" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* E with shells */}
          <motion.div
            custom={9}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Seashell */}
              <path d="M40 60C40 60 45 58 45 55C45 52 42 50 40 50C38 50 35 52 35 55C35 58 40 60 40 60Z" fill="#FFD8BE" />
              <path d="M40 60C40 60 41 57 40 55C39 53 40 50 40 50" stroke="#FFD8BE" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* APOSTROPHE with starfish */}
          <motion.div
            custom={10}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="20" height="90" viewBox="0 0 20 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 15C5 15 10 15 10 20C10 25 5 30 5 30" stroke="#00A0E3" strokeWidth="5" strokeLinecap="round" />
              {/* Starfish */}
              <path d="M10 5L12 10L17 10L13 13L14 18L10 15L6 18L7 13L3 10L8 10L10 5Z" fill="#FF9A5A" />
            </svg>
          </motion.div>

          {/* S with crab */}
          <motion.div
            custom={11}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 25C10 25 10 15 25 15C40 15 40 25 40 35C40 45 10 45 10 55C10 65 10 75 25 75C40 75 40 65 40 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Crab */}
              <circle cx="40" cy="50" r="5" fill="#FF5A5A" />
              <circle cx="38" cy="48" r="1" fill="black" />
              <circle cx="42" cy="48" r="1" fill="black" />
              <path d="M35 50L30 45" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M35 53L30 55" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M45 50L50 45" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M45 53L50 55" stroke="#FF5A5A" strokeWidth="1" />
              <path d="M40 55L40 58" stroke="#FF5A5A" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* C with coral */}
          <motion.div
            custom={13}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 25C40 25 30 15 20 15C10 15 10 25 10 45C10 65 10 75 20 75C30 75 40 65 40 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Coral */}
              <path d="M45 50C45 50 48 55 45 60C42 65 40 60 40 60C40 60 38 65 35 60C32 55 35 50 35 50" fill="#FF7EB6" />
            </svg>
          </motion.div>

          {/* H with sail */}
          <motion.div
            custom={14}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="30" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="45" width="30" height="10" fill="#00A0E3" />
              {/* Sailboat */}
              <path d="M40 15L50 30H40V15Z" fill="#F7BE00" />
              <path d="M40 30L45 30" stroke="#8B4513" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* O with bubbles */}
          <motion.div
            custom={15}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 15C15 15 10 25 10 45C10 65 15 85 25 85C35 85 40 65 40 45C40 25 35 15 25 15Z" fill="#00A0E3" />
              <path d="M25 25C20 25 18 30 18 45C18 60 20 75 25 75C30 75 32 60 32 45C32 30 30 25 25 25Z" fill="white" />
              {/* Bubbles */}
              <circle cx="45" cy="30" r="3" fill="#81D4FA" fillOpacity="0.6" />
              <circle cx="42" cy="20" r="2" fill="#81D4FA" fillOpacity="0.6" />
              <circle cx="47" cy="40" r="2" fill="#81D4FA" fillOpacity="0.6" />
            </svg>
          </motion.div>

          {/* I with lighthouse */}
          <motion.div
            custom={16}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="0" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="0" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Lighthouse */}
              <path d="M15 0L10 15H20L15 0Z" fill="white" stroke="#FF5A5A" strokeWidth="1" />
              <rect x="14" y="5" width="2" height="5" fill="#FF5A5A" />
            </svg>
          </motion.div>

          {/* C with shell */}
          <motion.div
            custom={17}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 25C40 25 30 15 20 15C10 15 10 25 10 45C10 65 10 75 20 75C30 75 40 65 40 65" stroke="#00A0E3" strokeWidth="10" strokeLinecap="round" />
              {/* Shell */}
              <path d="M45 40C45 40 50 35 45 30C40 25 35 30 35 35C35 40 45 40 45 40Z" fill="#FFD8BE" />
              <path d="M45 40C45 40 46 37 45 35C44 33 45 30 45 30" stroke="#FFD8BE" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* E with bird */}
          <motion.div
            custom={18}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="50" height="90" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="70" fill="#00A0E3" />
              <rect x="10" y="15" width="30" height="10" fill="#00A0E3" />
              <rect x="10" y="45" width="25" height="10" fill="#00A0E3" />
              <rect x="10" y="75" width="30" height="10" fill="#00A0E3" />
              {/* Bird */}
              <path d="M40 30C40 30 45 25 43 23C41 21 40 25 40 25L38 23L40 30Z" fill="#F7BE00" />
              <circle cx="40" cy="24" r="1" fill="black" />
              <path d="M38 23C38 23 36 20 38 20" stroke="#F7BE00" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* ! with flag */}
          <motion.div
            custom={19}
            initial="hidden"
            animate="visible"
            variants={characterVariants}
            className="relative"
          >
            <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="10" height="50" fill="#00A0E3" />
              <circle cx="15" cy="75" r="5" fill="#00A0E3" />
              {/* Flag */}
              <rect x="20" y="15" width="10" height="7" fill="#F7BE00" />
              <path d="M20 15L20 22L25 18.5L20 15Z" fill="#00A0E3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}