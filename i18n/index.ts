import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en/common.json";
import ar from "@/locales/ar/common.json";

export const LANGUAGE_STORAGE_KEY = "app_language";

export function normalizeLanguage(language?: string | null) {
  return language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "ar";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage) {
    return normalizeLanguage(storedLanguage);
  }

  return normalizeLanguage(window.navigator.language);
}

const resources = {
  en: {
    common: en,
  },
  ar: {
    common: ar,
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "ar",
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
