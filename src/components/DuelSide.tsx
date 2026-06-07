import type { CharacterCard, ItemCard } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';
import { CharacterCardView } from './CharacterCardView';
import { Die } from './Die';
import { ItemCardView } from './ItemCardView';

type Props = {
  label: string;
  card: CharacterCard;
  roll: number | null;
  die?: { value: number; spinning?: boolean };
  /** Poder en grande fuera de la carta (base o final con Item). */
  power?: number | null;
  /** Poder base; si difiere de `power`, se muestra "base → power". */
  baseline?: number | null;
  /** Objeto usado: ItemCard = carta, null = "sin objeto", undefined = no mostrar. */
  item?: ItemCard | null;
  /** Resultado del duelo para este lado, al resolver el turno. */
  status?: 'winner' | 'loser' | 'tie';
};

export function DuelSide({ label, card, roll, die, power, baseline, item, status }: Props) {
  const { t } = useI18n();
  const className = status ? `duel-side ${status}` : 'duel-side';
  const changed = power != null && baseline != null && baseline !== power;

  return (
    <div className={className}>
      {status === 'winner' && (
        <span className="winner-badge">🏆 {t.result.winnerBadge}</span>
      )}
      <span className="duel-label">{label}</span>
      <CharacterCardView card={card} roll={roll} />
      {die && <Die value={die.value} spinning={die.spinning} />}
      {item !== undefined &&
        (item ? (
          <ItemCardView item={item} />
        ) : (
          <span className="duel-item">{t.noItem}</span>
        ))}
      {power != null &&
        (changed ? (
          <span className="power-change">
            <span className="base-power">{baseline}</span>
            <span className="arrow">→</span>
            <span className="big-power">{power}</span>
          </span>
        ) : (
          <span className="big-power">{power}</span>
        ))}
    </div>
  );
}
