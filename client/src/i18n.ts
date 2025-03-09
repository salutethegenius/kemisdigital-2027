import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import frCommon from './locales/fr/common.json';
import esCommon from './locales/es/common.json';
import htCommon from './locales/ht/common.json';

// Configure i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      fr: {
        common: frCommon,
      },
      es: {
        common: esCommon,
      },
      ht: {
        common: htCommon,
      },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
