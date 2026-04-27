import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ar',
      fallbackLng: 'ar',
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false, 
      },
    });
}

export default i18n;
