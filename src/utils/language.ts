export type SupportedLanguage = 'en' | 'kr' | 'ja';

export const getLanguageFromUrl = (): SupportedLanguage => {
  const urlParams = new URLSearchParams(window.location.search);
  const language = urlParams.get('language');
  
  if (language === 'korean') {
    return 'kr';
  } else if (language === 'japanese') {
    return 'ja';
  }
  
  return 'en';
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
    case 'ja': return '日本語';
    default: return 'English';
  }
};