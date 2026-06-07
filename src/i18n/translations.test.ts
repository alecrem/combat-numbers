import { describe, expect, it } from 'vitest';
import {
  CPU_CHARACTERS,
  CPU_ITEMS,
  PLAYER_CHARACTERS,
  PLAYER_ITEMS,
} from '../game/cards';
import { SUPPORTED_LANGUAGES, translations } from './translations';

const allCardIds = [
  ...PLAYER_CHARACTERS,
  ...CPU_CHARACTERS,
  ...PLAYER_ITEMS,
  ...CPU_ITEMS,
].map((c) => c.id);

describe('translations', () => {
  it('translates every card id in every language', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      for (const id of allCardIds) {
        const name = translations[language].cards[id];
        expect(name, `${language}/${id}`).toBeTruthy();
      }
    }
  });

  it('has no card name entries that do not match a real card', () => {
    const known = new Set(allCardIds);
    for (const language of SUPPORTED_LANGUAGES) {
      for (const id of Object.keys(translations[language].cards)) {
        expect(known.has(id), `${language}/${id}`).toBe(true);
      }
    }
  });

  it('formats the add effect with the amount', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      expect(translations[language].effect.add(100)).toContain('100');
    }
  });
});
