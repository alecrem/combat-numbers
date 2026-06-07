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
  /** Texto del objeto usado; undefined = no mostrar la línea. */
  itemName?: string | null;
  /** Resultado del duelo para este lado, al resolver el turno. */
  status?: 'winner' | 'loser' | 'tie';
};

export function DuelSide({ label, card, roll, die, power, itemName, status }: Props) {
  const { t } = useI18n();
  const className = status ? `duel-side ${status}` : 'duel-side';

  return (
    <div className={className}>
      {status === 'winner' && (
        <span className="winner-badge">🏆 {t.result.winnerBadge}</span>
      )}
      <span className="duel-label">{label}</span>
      <CharacterCardView card={card} roll={roll} />
      {die && <Die value={die.value} spinning={die.spinning} />}
      {itemName !== undefined && (
        <span className="duel-item">{itemName ?? t.noItem}</span>
      )}
      {power != null && <span className="big-power">{power}</span>}
    </div>
  );
}
