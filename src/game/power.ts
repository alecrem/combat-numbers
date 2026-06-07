// Resolución del poder de una carta: funciones puras.

import type { CharacterCard, DiceBracket, ItemCard } from './types';

/** Mapea una tirada de dado (1..6) a su tramo de poder. */
export function bracketFromRoll(roll: number): DiceBracket {
  if (roll <= 2) return 'low';
  if (roll <= 4) return 'mid';
  return 'high';
}

/** Poder base de un personaje según la tirada, sin Items. */
export function basePower(card: CharacterCard, roll: number): number {
  return card.power[bracketFromRoll(roll)];
}

/** Aplica el efecto de un Item a un poder. Sin Item, lo deja igual. */
export function applyItem(power: number, item: ItemCard | null): number {
  if (!item) return power;
  switch (item.effect.kind) {
    case 'double':
      return power * 2;
    case 'add':
      return power + item.effect.amount;
  }
}

/** Poder final de un personaje: base del dado con el Item aplicado. */
export function finalPower(
  card: CharacterCard,
  roll: number,
  item: ItemCard | null,
): number {
  return applyItem(basePower(card, roll), item);
}
