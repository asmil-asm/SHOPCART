import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from "./ar.json";
import en from "./en.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const applyDirection = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ['en', 'ar'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  });

applyDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
  applyDirection(lng);
});

export default i18n;