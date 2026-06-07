// Etiquetas de presentación compartidas por la UI.

import type { DiceBracket, ItemEffect } from './game/types';

export const bracketLabel: Record<DiceBracket, string> = {
  low: '1-2',
  mid: '3-4',
  high: '5-6',
};

export function itemEffectLabel(effect: ItemEffect): string {
  switch (effect.kind) {
    case 'double':
      return '×2 ataque';
    case 'add':
      return `+${effect.amount} ataque`;
  }
}
