import { describe, expect, it } from 'vitest';
import { applyItem, basePower, bracketFromRoll, finalPower } from './power';
import type { CharacterCard, ItemCard } from './types';

const card: CharacterCard = {
  id: 'x',
  name: 'X',
  power: { low: 100, mid: 200, high: 300 },
};

describe('bracketFromRoll', () => {
  it('maps each dice face to its bracket', () => {
    expect([1, 2].map(bracketFromRoll)).toEqual(['low', 'low']);
    expect([3, 4].map(bracketFromRoll)).toEqual(['mid', 'mid']);
    expect([5, 6].map(bracketFromRoll)).toEqual(['high', 'high']);
  });
});

describe('basePower', () => {
  it('reads the power of the rolled bracket', () => {
    expect(basePower(card, 1)).toBe(100);
    expect(basePower(card, 4)).toBe(200);
    expect(basePower(card, 6)).toBe(300);
  });
});

describe('applyItem', () => {
  const double: ItemCard = { id: 'd', name: 'D', effect: { kind: 'double' } };
  const add: ItemCard = { id: 'a', name: 'A', effect: { kind: 'add', amount: 50 } };

  it('returns the power unchanged without an item', () => {
    expect(applyItem(200, null)).toBe(200);
  });

  it('doubles the power', () => {
    expect(applyItem(200, double)).toBe(400);
  });

  it('adds a fixed amount', () => {
    expect(applyItem(200, add)).toBe(250);
  });
});

describe('finalPower', () => {
  it('combines bracket and item', () => {
    const double: ItemCard = { id: 'd', name: 'D', effect: { kind: 'double' } };
    expect(finalPower(card, 6, double)).toBe(600);
    expect(finalPower(card, 1, null)).toBe(100);
  });
});
