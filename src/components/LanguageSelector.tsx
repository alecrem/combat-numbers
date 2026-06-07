import { useI18n } from '../i18n/LanguageContext';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '../i18n/translations';

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <nav className="lang-selector" aria-label={t.languageLabel}>
      {SUPPORTED_LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className={code === language ? 'lang active' : 'lang'}
          aria-pressed={code === language}
          onClick={() => setLanguage(code)}
        >
          {LANGUAGE_LABELS[code]}
        </button>
      ))}
    </nav>
  );
}
