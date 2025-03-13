import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface EmailMarketingPopupProps {
  onClose: () => void;
}

export default function EmailMarketingPopup({ onClose }: EmailMarketingPopupProps) {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="p-6 max-w-md w-full border-2 border-[#00A0E3] overflow-hidden relative">
            {/* Background Image with 60% opacity */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60" 
              style={{ backgroundImage: `url('/images/beachbahamas.jpg')` }}
            ></div>
            
            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00A0E3]/50 flex items-center justify-center backdrop-blur-sm">
                <Mail className="w-8 h-8 text-white mx-auto" />
              </div>
              
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {t('homepage.popup.title')}
              </h3>
              
              <p className="text-lg font-medium text-white drop-shadow-md bg-black/30 p-3 rounded-lg">
                {t('homepage.popup.question')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                <Button 
                  variant="outline" 
                  className="w-full bg-white/80 hover:bg-white text-black border-transparent" 
                  onClick={onClose}
                >
                  {t('homepage.popup.button_no')}
                </Button>
                <Button 
                  className="w-full bg-[#00A0E3] hover:bg-[#00A0E3]/90"
                  onClick={() => window.open('https://kemis.net', '_blank')}
                >
                  {t('homepage.popup.button_yes')}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
