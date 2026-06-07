import type { ItemEffect } from '../game/types';
import type { Translations } from './translations';

/** Etiqueta localizada del efecto de un Item. */
export function effectLabel(t: Translations, effect: ItemEffect): string {
  switch (effect.kind) {
    case 'double':
      return t.effect.double;
    case 'add':
      return t.effect.add(effect.amount);
  }
}
