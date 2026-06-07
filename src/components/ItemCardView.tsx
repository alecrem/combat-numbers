import type { ItemCard } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';
import { effectLabel } from '../i18n/effect';

type Props = {
  item: ItemCard;
  onClick?: () => void;
  /** Poder resultante de tu personaje si usas este objeto. */
  resultPower?: number;
};

export function ItemCardView({ item, onClick, resultPower }: Props) {
  const { t } = useI18n();
  const name = t.cards[item.id] ?? item.name;

  const body = (
    <>
      <span className="card-name">{name}</span>
      <span className="item-effect">{effectLabel(t, item.effect)}</span>
      {resultPower != null && <span className="item-result">→ {resultPower}</span>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className="card item-card clickable" onClick={onClick}>
        {body}
      </button>
    );
  }
  return <div className="card item-card">{body}</div>;
}
