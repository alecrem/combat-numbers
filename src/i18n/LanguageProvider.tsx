import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { LanguageContext, type LanguageContextValue } from './LanguageContext';
import { SUPPORTED_LANGUAGES, translations, type Language } from './translations';

const STORAGE_KEY = 'combat-numbers.lang';

const isSupported = (value: string | null): value is Language =>
  value !== null && SUPPORTED_LANGUAGES.includes(value as Language);

/** Idioma inicial: preferencia guardada → idioma del navegador → es. */
function detectInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isSupported(stored)) return stored;
  const fromNavigator = navigator.language.slice(0, 2);
  if (isSupported(fromNavigator)) return fromNavigator;
  return 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
