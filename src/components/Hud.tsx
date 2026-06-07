import { itemEffectLabel } from '../format';
import type { PlayerState } from '../game/types';

/** Victorias necesarias para ganar (mazo de 3 Items + la 4ª victoria). */
export const WINS_TO_WIN = 4;

type Props = {
  title: string;
  side: PlayerState;
  /** Muestra los Items en mano (jugador); si no, sólo el número (CPU). */
  revealItems: boolean;
};

export function Hud({ title, side, revealItems }: Props) {
  return (
    <header className="hud">
      <h2 className="hud-title">{title}</h2>
      <dl className="hud-stats">
        <div>
          <dt>Victorias</dt>
          <dd>
            {side.wins} / {WINS_TO_WIN}
          </dd>
        </div>
        <div>
          <dt>Personajes</dt>
          <dd>{side.characters.length}</dd>
        </div>
        <div>
          <dt>Mazo Items</dt>
          <dd>{side.itemDeck.length}</dd>
        </div>
      </dl>
      <div className="hud-items">
        {side.itemHand.length === 0 ? (
          <span className="muted">Sin objetos en mano</span>
        ) : revealItems ? (
          side.itemHand.map((item) => (
            <span key={item.id} className="item-chip">
              {item.name} ({itemEffectLabel(item.effect)})
            </span>
          ))
        ) : (
          side.itemHand.map((item) => (
            <span key={item.id} className="item-chip hidden">
              Objeto oculto
            </span>
          ))
        )}
      </div>
    </header>
  );
}
