import { bracketLabel } from '../format';
import { bracketFromRoll } from '../game/power';
import type { CharacterCard, DiceBracket } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';

const BRACKETS: DiceBracket[] = ['low', 'mid', 'high'];

type Props = {
  card: CharacterCard;
  onClick?: () => void;
  /** Si se pasa, resalta el tramo que ha salido en el dado. */
  roll?: number | null;
};

export function CharacterCardView({ card, onClick, roll }: Props) {
  const { t } = useI18n();
  const active = roll != null ? bracketFromRoll(roll) : null;
  const name = t.cards[card.id] ?? card.name;

  const body = (
    <>
      <span className="card-name">{name}</span>
      <ul className="powers">
        {BRACKETS.map((b) => (
          <li key={b} className={active === b ? 'power active' : 'power'}>
            <span className="bracket">{bracketLabel[b]}</span>
            <span className="value">{card.power[b]}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (onClick) {
    return (
      <button type="button" className="card character-card clickable" onClick={onClick}>
        {body}
      </button>
    );
  }
  return <div className="card character-card">{body}</div>;
}
