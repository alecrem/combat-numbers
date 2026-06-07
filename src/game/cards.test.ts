import { describe, expect, it } from 'vitest';
import {
  CPU_CHARACTERS,
  CPU_ITEMS,
  PLAYER_CHARACTERS,
  PLAYER_ITEMS,
} from './cards';

describe('initial cards', () => {
  it('gives each side 6 characters and 3 items', () => {
    expect(PLAYER_CHARACTERS).toHaveLength(6);
    expect(CPU_CHARACTERS).toHaveLength(6);
    expect(PLAYER_ITEMS).toHaveLength(3);
    expect(CPU_ITEMS).toHaveLength(3);
  });

  it('every character sums 500 across its three powers', () => {
    for (const card of [...PLAYER_CHARACTERS, ...CPU_CHARACTERS]) {
      const total = card.power.low + card.power.mid + card.power.high;
      expect(total, card.name).toBe(500);
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
