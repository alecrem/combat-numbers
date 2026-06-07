type Props = {
  value: number;
  spinning?: boolean;
};

// Celdas (1..9, en orden de lectura) donde va un punto para cada cara.
const PIPS: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

const CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Cara de dado con puntos (pips). `spinning` la anima mientras se tira. */
export function Die({ value, spinning }: Props) {
  const pips = PIPS[value] ?? [];
  return (
    <span
      className={spinning ? 'die spinning' : 'die'}
      role="img"
      aria-label={String(value)}
    >
      <span className="die-face">
        {CELLS.map((cell) => (
          <span key={cell} className={pips.includes(cell) ? 'pip on' : 'pip'} />
        ))}
      </span>
    </span>
  );
}
