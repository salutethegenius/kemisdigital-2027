import React from 'react';

export const TitleEnhancementStyles = () => {
  return (
    <style jsx global>{`
      /* Glow effect for characters on hover */
      .animated-title-char:hover {
        filter: drop-shadow(0 0 8px rgba(0, 160, 227, 0.7));
      }

      /* Ripple animation for wave elements */
      .wave-animation {
        animation: wave 3s ease-in-out infinite;
      }

      @keyframes wave {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }

      /* Shine effect for sun and bright elements */
      .shine-effect {
        animation: shine 5s ease-in-out infinite;
      }

      @keyframes shine {
        0%, 100% {
          filter: brightness(1);
        }
        50% {
          filter: brightness(1.3);
        }
      }

      /* Bubble float animation */
      .bubble-float {
        animation: float 4s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      
      /* Caribbean-themed color palette */
      .caribbean-blue {
        color: #00A0E3;
      }
      
      .caribbean-sand {
        color: #F7BE00;
      }
      
      .caribbean-coral {
        color: #FF5A5A;
      }
      
      .caribbean-palm {
        color: #00BB77;
      }
    `}</style>
  );
};

export default TitleEnhancementStyles;
