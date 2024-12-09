import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation.json';
import translationFi from './fi/translation.json';
import translationSv from './sv/translation.json';

export type Language = 'fi' | 'en' | 'sv';

export const resources: Resource = {
  en: {
    translation: translationEn,
  },
  fi: {
    translation: translationFi,
  },
  sv: {
    translation: translationSv,
  },
};

export const lng = 'fi';

export const fallbackLng = 'fi';

void i18n.use(initReactI18next).init({
  lng: localStorage.getItem('i18nextLng') ?? lng,
  fallbackLng: localStorage.getItem('i18nextLng') ?? fallbackLng,
  resources,
  detection: {
    order: ['path', 'localStorage', 'navigator'],
    lookupFromPathIndex: 0,
    checkWhitelist: true,
  },
});

export default i18n;
