import type { CharacterCard } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';
import { CharacterCardView } from './CharacterCardView';
import { Die } from './Die';

type Props = {
  label: string;
  card: CharacterCard;
  /** Tirada para resaltar el tramo aplicado; null si aún no se ha tirado. */
  roll: number | null;
  /** Dado mostrado junto a la carta; gira mientras `spinning`. */
  die?: { value: number; spinning?: boolean };
  /** Poder en grande fuera de la carta (base o final con Item). */
  power?: number | null;
  /** Poder base; si difiere de `power`, se muestra "base → power" (proyección). */
  baseline?: number | null;
  /** Texto del objeto usado; undefined = no mostrar la línea. */
  itemName?: string | null;
  /** Resalta al ganador del duelo. */
  winner?: boolean;
};

export function DuelSide({
  label,
  card,
  roll,
  die,
  power,
  baseline,
  itemName,
  winner,
}: Props) {
  const { t } = useI18n();
  const projecting = power != null && baseline != null && baseline !== power;

  return (
    <div className={winner ? 'duel-side winner' : 'duel-side'}>
      <span className="duel-label">{label}</span>
      <CharacterCardView card={card} roll={roll} />
      {die && <Die value={die.value} spinning={die.spinning} />}
      {itemName !== undefined && (
        <span className="duel-item">{itemName ?? t.noItem}</span>
      )}
      {power != null &&
        (projecting ? (
          <span className="power-change">
            <span className="base-power">{baseline}</span>
            <span className="arrow">→</span>
            <span className="big-power preview">{power}</span>
          </span>
        ) : (
          <span className="big-power">{power}</span>
        ))}
    </div>
  );
}
