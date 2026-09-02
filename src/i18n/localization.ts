const localeEntries = [
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'pt',
    label: 'Português',
  },
  {
    code: 'ar',
    label: 'العربية',
    rtl: true,
  },
  {
    code: 'es',
    label: 'Español',
  },
  {
    code: 'fr',
    label: 'Français',
  },
  {
    code: 'ru',
    label: 'Русский',
  },
] as const

export type LocaleCode = (typeof localeEntries)[number]['code']

const localization = {
  defaultLocale: 'en' as const,
  locales: localeEntries,
}

export default localization