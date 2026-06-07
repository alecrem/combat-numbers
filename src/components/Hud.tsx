import type { PlayerState } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';
import { effectLabel } from '../i18n/effect';

/** Victorias necesarias para ganar (mazo de 3 Items + la 4ª victoria). */
export const WINS_TO_WIN = 4;

type Props = {
  title: string;
  side: PlayerState;
  /** Muestra los Items en mano (jugador); si no, sólo el número (CPU). */
  revealItems: boolean;
};

export function Hud({ title, side, revealItems }: Props) {
  const { t } = useI18n();

  return (
    <header className="hud">
      <h2 className="hud-title">{title}</h2>
      <dl className="hud-stats">
        <div>
          <dt>{t.hud.wins}</dt>
          <dd>
            {side.wins} / {WINS_TO_WIN}
          </dd>
        </div>
        <div>
          <dt>{t.hud.characters}</dt>
          <dd>{side.characters.length}</dd>
        </div>
        <div>
          <dt>{t.hud.itemDeck}</dt>
          <dd>{side.itemDeck.length}</dd>
        </div>
      </dl>
      <div className="hud-items">
        {side.itemHand.length === 0 ? (
          <span className="muted">{t.hud.noItems}</span>
        ) : revealItems ? (
          side.itemHand.map((item) => (
            <span key={item.id} className="item-chip">
              {t.cards[item.id] ?? item.name} ({effectLabel(t, item.effect)})
            </span>
          ))
        ) : (
          side.itemHand.map((item) => (
            <span key={item.id} className="item-chip hidden">
              {t.hud.hiddenItem}
            </span>
          ))
        )}
      </div>
    </header>
  );
}
