import { describe, expect, it } from 'vitest';
import {
  CPU_CHARACTERS,
  CPU_ITEMS,
  PLAYER_CHARACTERS,
  PLAYER_ITEMS,
} from './cards';
import type { CharacterCard } from './types';

const total = (card: CharacterCard) =>
  card.power.low + card.power.mid + card.power.high;

describe('initial cards', () => {
  it('gives each side 6 characters and 3 items', () => {
    expect(PLAYER_CHARACTERS).toHaveLength(6);
    expect(CPU_CHARACTERS).toHaveLength(6);
    expect(PLAYER_ITEMS).toHaveLength(3);
    expect(CPU_ITEMS).toHaveLength(3);
  });

  it('every character sums 500 or 1000 across its three powers', () => {
    for (const card of [...PLAYER_CHARACTERS, ...CPU_CHARACTERS]) {
      expect([500, 1000], card.name).toContain(total(card));
    }
  });

  it('gives each side two 1000-point characters and totals 4000', () => {
    for (const side of [PLAYER_CHARACTERS, CPU_CHARACTERS]) {
      const big = side.filter((card) => total(card) === 1000);
      expect(big).toHaveLength(2);
      const sideTotal = side.reduce((sum, card) => sum + total(card), 0);
      expect(sideTotal).toBe(4000);
    }
  });

  it('uses unique card ids', () => {
    const ids = [
      ...PLAYER_CHARACTERS,
      ...CPU_CHARACTERS,
      ...PLAYER_ITEMS,
      ...CPU_ITEMS,
    ].map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
