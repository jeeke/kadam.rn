import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MMKV_KEYS } from '../constants/mmkvConstants';
import MMKVStorage from '../utils/storages/MMKVStorage/MMKVStorage';


// Initialize i18n once
export const initI18n = (resources: any) => {
  const languageDetector = {
    type: 'languageDetector' as const,
    async: true as const,
    detect: (callback: (lang: string) => void) => {
      const savedLanguage = MMKVStorage.mmkvGetItem(MMKV_KEYS.APP_LANGUAGE);
      callback(savedLanguage || 'en');
    },
    init: () => { },
    cacheUserLanguage: (lng: string) => {
      MMKVStorage.mmkvSetItem(MMKV_KEYS.APP_LANGUAGE, lng);
    },
  };

  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  return i18n;
};