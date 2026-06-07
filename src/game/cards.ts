// Datos iniciales de las cartas. Cada personaje suma 500 entre sus 3 poderes
// (de momento; ver spec.md). Se verifica con un test.

import type { CharacterCard, ItemCard } from './types';

export const PLAYER_CHARACTERS: CharacterCard[] = [
  { id: 'p-char-1', name: 'Caballero', power: { low: 150, mid: 170, high: 180 } },
  { id: 'p-char-2', name: 'Arquera', power: { low: 100, mid: 180, high: 220 } },
  { id: 'p-char-3', name: 'Guardián', power: { low: 200, mid: 160, high: 140 } },
  { id: 'p-char-4', name: 'Pícaro', power: { low: 120, mid: 160, high: 220 } },
  { id: 'p-char-5', name: 'Bárbaro', power: { low: 250, mid: 150, high: 100 } },
  { id: 'p-char-6', name: 'Mago', power: { low: 160, mid: 170, high: 170 } },
];

export const PLAYER_ITEMS: ItemCard[] = [
  { id: 'p-item-1', name: 'Doble Filo', effect: { kind: 'double' } },
  { id: 'p-item-2', name: 'Refuerzo', effect: { kind: 'add', amount: 100 } },
  { id: 'p-item-3', name: 'Talismán', effect: { kind: 'add', amount: 60 } },
];

export const CPU_CHARACTERS: CharacterCard[] = [
  { id: 'c-char-1', name: 'Centinela', power: { low: 170, mid: 160, high: 170 } },
  { id: 'c-char-2', name: 'Cazadora', power: { low: 110, mid: 170, high: 220 } },
  { id: 'c-char-3', name: 'Coloso', power: { low: 240, mid: 150, high: 110 } },
  { id: 'c-char-4', name: 'Asesino', power: { low: 130, mid: 150, high: 220 } },
  { id: 'c-char-5', name: 'Berserker', power: { low: 230, mid: 160, high: 110 } },
  { id: 'c-char-6', name: 'Hechicera', power: { low: 150, mid: 180, high: 170 } },
];

export const CPU_ITEMS: ItemCard[] = [
  { id: 'c-item-1', name: 'Furia', effect: { kind: 'double' } },
  { id: 'c-item-2', name: 'Vigor', effect: { kind: 'add', amount: 100 } },
  { id: 'c-item-3', name: 'Amuleto', effect: { kind: 'add', amount: 60 } },
];
