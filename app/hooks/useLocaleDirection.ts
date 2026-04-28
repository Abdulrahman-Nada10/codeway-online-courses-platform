"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useLocaleDirection() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const language = i18n.resolvedLanguage ?? i18n.language ?? "ar";
    const dir = language.startsWith("ar") ? "rtl" : "ltr";

    return {
      language,
      dir,
      isRTL: dir === "rtl",
      isLTR: dir === "ltr",
    };
  }, [i18n.language, i18n.resolvedLanguage]);
}
