import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { X } from 'lucide-react';

interface FirstVisitPopupProps {
  onClose: () => void;
}

export default function FirstVisitPopup({ onClose }: FirstVisitPopupProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <img 
            src="/images/logo.png"
            alt="KemisDigital Logo"
            className="w-24 h-auto mb-4"
            onError={(e) => {
              console.warn('Logo failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome to KemisDigital!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Where Bahamian-driven innovation meets your digital needs. 
            We're passionate about delivering top-tier digital services with 
            island spirit.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Explore our services for NGOs, businesses, and tourism companies.
          </p>
          
          <div className="flex gap-3">
            <Link href="/services">
              <button
                className="bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white px-4 py-2 rounded-md transition-colors"
                onClick={onClose}
              >
                Explore Now
              </button>
            </Link>
            <button
              onClick={onClose}
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
