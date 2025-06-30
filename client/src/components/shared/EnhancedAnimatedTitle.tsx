import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface AnimatedTitleProps {
  className?: string;
}

// Enhanced character variants for animation with Caribbean flair
const characterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.1,
    y: -5,
    rotateY: 15,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Container variants for pulsing effect
const containerVariants = {
  normal: { 
    scale: 1,
    filter: "drop-shadow(0 0 0px rgba(0, 160, 227, 0))"
  },
  pulse: {
    scale: [1, 1.02, 1],
    filter: [
      "drop-shadow(0 0 0px rgba(0, 160, 227, 0))",
      "drop-shadow(0 0 20px rgba(0, 160, 227, 0.3))",
      "drop-shadow(0 0 0px rgba(0, 160, 227, 0))"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut"
    }
  }
};

// Special themed characters with Caribbean/island style elements
export default function EnhancedAnimatedTitle({ className = "" }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerControls = useAnimationControls();
  
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
          {/* K - KemisDigital branding */}
          <motion.div
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-6xl font-bold bg-gradient-to-b from-[#00A0E3] to-[#0077B3] bg-clip-text text-transparent cursor-pointer select-none"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            K
          </motion.div>
          
          {/* E */}
          <motion.div
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-6xl font-bold bg-gradient-to-b from-[#F7BE00] to-[#E6A600] bg-clip-text text-transparent cursor-pointer select-none"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            E
          </motion.div>
          
          {/* M */}
          <motion.div
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-6xl font-bold bg-gradient-to-b from-[#00A0E3] to-[#0077B3] bg-clip-text text-transparent cursor-pointer select-none"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            M
          </motion.div>
          
          {/* I */}
          <motion.div
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-6xl font-bold bg-gradient-to-b from-[#F7BE00] to-[#E6A600] bg-clip-text text-transparent cursor-pointer select-none"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            I
          </motion.div>
          
          {/* S */}
          <motion.div
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-6xl font-bold bg-gradient-to-b from-[#00A0E3] to-[#0077B3] bg-clip-text text-transparent cursor-pointer select-none"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            S
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}