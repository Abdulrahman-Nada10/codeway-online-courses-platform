"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { LANGUAGE_STORAGE_KEY, normalizeLanguage } from "@/i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const language = normalizeLanguage(lng);

      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
