import type { ItemEffect } from '../game/types';

type Props = {
  effect: ItemEffect;
};

/**
 * Icono del objeto según su efecto. Decorativo (`aria-hidden`): la etiqueta de
 * efecto en texto ya describe lo que hace.
 *  - double: doble chevrón hacia arriba (doblar).
 *  - add: flecha hacia arriba (sumar ataque).
 */
export function ItemIcon({ effect }: Props) {
  return (
    <svg
      className="item-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {effect.kind === 'double' ? (
        <>
          <path d="M6 13l6-6 6 6" />
          <path d="M6 19l6-6 6 6" />
        </>
      ) : (
        <>
          <path d="M12 19V5" />
          <path d="M6 11l6-6 6 6" />
        </>
      )}
    </svg>
  );
}
