import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations - English only for performance
import enCommon from './locales/en/common.json';

const resources = {
  en: {
    common: enCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Force English only
    debug: false,

    // Common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;