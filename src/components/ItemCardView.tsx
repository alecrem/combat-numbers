import type { ItemCard } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';
import { effectLabel } from '../i18n/effect';

type Props = {
  item: ItemCard;
  onClick?: () => void;
  /** Se dispara al pasar el ratón o enfocar el objeto (previsualizar efecto). */
  onPreviewStart?: () => void;
  /** Se dispara al salir el ratón o quitar el foco. */
  onPreviewEnd?: () => void;
};

export function ItemCardView({ item, onClick, onPreviewStart, onPreviewEnd }: Props) {
  const { t } = useI18n();
  const name = t.cards[item.id] ?? item.name;

  const body = (
    <>
      <span className="card-name">{name}</span>
      <span className="item-effect">{effectLabel(t, item.effect)}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className="card item-card clickable"
        onClick={onClick}
        onMouseEnter={onPreviewStart}
        onMouseLeave={onPreviewEnd}
        onFocus={onPreviewStart}
        onBlur={onPreviewEnd}
      >
        {body}
      </button>
    );
  }
  return <div className="card item-card">{body}</div>;
}
