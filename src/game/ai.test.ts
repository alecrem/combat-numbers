import { describe, expect, it } from 'vitest';
import { chooseCpuCharacter, chooseCpuItem } from './ai';
import type { CharacterCard, ItemCard, PlayerState, TurnState } from './types';

const ch = (id: string, low: number, mid: number, high: number): CharacterCard => ({
  id,
  name: id,
  power: { low, mid, high },
});

const player = (over: Partial<PlayerState> = {}): PlayerState => ({
  characters: [],
  itemDeck: [],
  itemHand: [],
  wins: 0,
  ...over,
});

const turnWith = (cpu: CharacterCard, pl: CharacterCard, roll = 1): TurnState => ({
  chosen: { player: pl, cpu },
  roll: { player: roll, cpu: roll },
  item: { player: null, cpu: null },
});

const add = (id: string, amount: number): ItemCard => ({
  id,
  name: id,
  effect: { kind: 'add', amount },
});
const double: ItemCard = { id: 'double', name: 'double', effect: { kind: 'double' } };

describe('chooseCpuCharacter', () => {
  it('picks the character at the rng-selected index', () => {
    const cpu = player({ characters: [ch('a', 1, 1, 1), ch('b', 1, 1, 1), ch('c', 1, 1, 1)] });
    expect(chooseCpuCharacter(cpu, () => 0)).toBe('a');
    expect(chooseCpuCharacter(cpu, () => 0.5)).toBe('b');
    expect(chooseCpuCharacter(cpu, () => 0.99)).toBe('c');
  });
});

describe('chooseCpuItem', () => {
  it('holds the item when already winning', () => {
    const turn = turnWith(ch('ca', 150, 1, 1), ch('pa', 100, 1, 1));
    const cpu = player({ itemHand: [add('x', 50)] });
    expect(chooseCpuItem(turn, cpu)).toBeNull();
  });

  it('returns null with no items in hand', () => {
    const turn = turnWith(ch('ca', 100, 1, 1), ch('pa', 150, 1, 1));
    expect(chooseCpuItem(turn, player())).toBeNull();
  });

  it('plays an item that turns a loss into a win', () => {
    const turn = turnWith(ch('ca', 100, 1, 1), ch('pa', 130, 1, 1));
    const cpu = player({ itemHand: [add('boost', 50)] }); // 100 + 50 = 150 > 130
    expect(chooseCpuItem(turn, cpu)).toBe('boost');
  });

  it('chooses the smallest sufficient item, conserving stronger ones', () => {
    const turn = turnWith(ch('ca', 100, 1, 1), ch('pa', 130, 1, 1));
    // double -> 200, small -> 140; both win, small is enough
    const cpu = player({ itemHand: [double, add('small', 40)] });
    expect(chooseCpuItem(turn, cpu)).toBe('small');
  });

  it('holds when no item can win (avoids wasting on a sure loss)', () => {
    const turn = turnWith(ch('ca', 100, 1, 1), ch('pa', 300, 1, 1));
    const cpu = player({ itemHand: [add('small', 40)] });
    expect(chooseCpuItem(turn, cpu)).toBeNull();
  });
});
