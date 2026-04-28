"use client";

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Update HTML dir and lang attributes when language changes
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
