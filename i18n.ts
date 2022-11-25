import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from 'public/locales/en/common.json'
import zhCommon from 'public/locales/zh/common.json'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: enCommon,
  },
  zh: {
    translation: zhCommon,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
