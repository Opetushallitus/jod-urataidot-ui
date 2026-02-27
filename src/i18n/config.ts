import i18n, { type InitOptions, type Resource } from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import commonEn from './common/en.json';
import commonFi from './common/fi.json';
import commonSv from './common/sv.json';
import urataidotEn from './urataidot/en.json';
import urataidotFi from './urataidot/fi.json';
import urataidotSv from './urataidot/sv.json';

export type LangCode = 'fi' | 'sv' | 'en';
export const supportedLanguageCodes: LangCode[] = ['fi', 'sv', 'en'];
export const defaultLang = 'fi';

export const langLabels = {
  en: 'In English',
  fi: 'Suomeksi',
  sv: 'På svenska',
};
const bundledResources: Record<string, Resource> = {
  en: { common: commonEn, urataidot: urataidotEn },
  fi: { common: commonFi, urataidot: urataidotFi },
  sv: { common: commonSv, urataidot: urataidotSv },
};

await i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLang,
    ns: ['urataidot', 'common'],
    defaultNS: 'urataidot',
    supportedLngs: supportedLanguageCodes,
    preload: supportedLanguageCodes,
    fallbackLng: defaultLang,
    backend: {
      loadPath: '/urataidot/i18n/{{ns}}/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    saveMissing: false,
    maxRetries: 0,
  } as InitOptions);

// Add bundled as fallback
for (const lng of supportedLanguageCodes) {
  for (const ns of ['urataidot', 'common']) {
    i18n.addResourceBundle(
      lng,
      ns,
      bundledResources[lng]?.[ns] ?? {},
      true, // deep merge
      false, // do not overwrite HTTP values
    );
  }
}
export default i18n;
