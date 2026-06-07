type Props = {
  value: number;
  spinning?: boolean;
};

/** Cara de dado. `spinning` la anima mientras se está tirando. */
export function Die({ value, spinning }: Props) {
  return <span className={spinning ? 'die spinning' : 'die'}>{value}</span>;
}
