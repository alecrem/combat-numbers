import { itemEffectLabel } from '../format';
import type { ItemCard } from '../game/types';

type Props = {
  item: ItemCard;
  onClick?: () => void;
};

export function ItemCardView({ item, onClick }: Props) {
  const body = (
    <>
      <span className="card-name">{item.name}</span>
      <span className="item-effect">{itemEffectLabel(item.effect)}</span>
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
