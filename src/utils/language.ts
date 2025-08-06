export type SupportedLanguage = 'en' | 'kr' | 'jp';

export const getLanguageFromUrl = (): SupportedLanguage => {
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get('language');
  
  if (language === 'kr' || language === 'jp') {
    return language;
  }
  
  return 'en'; // Default to English
};

export const updateUrlLanguage = (language: SupportedLanguage) => {
  const url = new URL(window.location.href);
  url.searchParams.set('language', language);
  window.history.replaceState({}, '', url.toString());
};

export const getLanguageName = (language: SupportedLanguage): string => {
  switch (language) {
    case 'en': return 'English';
    case 'kr': return '한국어';
    case 'jp': return '日本語';
    default: return 'English';
  }
};