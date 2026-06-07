import { createContext, useContext } from 'react';
import type { Language, Translations } from './translations';

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useI18n debe usarse dentro de <LanguageProvider>');
  }
  return ctx;
}
