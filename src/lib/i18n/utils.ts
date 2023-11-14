import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang], variables?: Record<string, string>): string {
    // @ts-ignore
    const translated = ui[lang][key] || ui[defaultLang][key];

    if (!translated) {
      console.warn(`Missing translation for ${key}`);
      return key;
    }

    if (!variables) return translated;

    // @ts-ignore
    return Object.entries(variables).reduce((acc, [key, value]) => {
      return acc.replace(`{${key}}`, value);
    }, translated);
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return `/${l}${path}`
  }
}