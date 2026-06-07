// Tipos del dominio del juego. Sin dependencias de React.

export type Side = 'player' | 'cpu';

/** Tramo del dado: 1-2 -> low, 3-4 -> mid, 5-6 -> high. */
export type DiceBracket = 'low' | 'mid' | 'high';

export type CharacterCard = {
  id: string;
  name: string;
  power: Record<DiceBracket, number>;
};

export type ItemEffect =
  | { kind: 'double' }
  | { kind: 'add'; amount: number };

export type ItemCard = {
  id: string;
  name: string;
  effect: ItemEffect;
};

export type PlayerState = {
  /** Personajes disponibles. Se eliminan al consumirse en un turno con ganador. */
  characters: CharacterCard[];
  /** Items por robar. Empieza con 3. */
  itemDeck: ItemCard[];
  /** Items en mano, jugables. Empieza vacío. */
  itemHand: ItemCard[];
  /** Turnos ganados. */
  wins: number;
};

export type Phase = 'choose-character' | 'choose-item' | 'game-over';

/** Datos del turno en curso. */
export type TurnState = {
  chosen: Record<Side, CharacterCard | null>;
  roll: Record<Side, number | null>; // 1..6
  item: Record<Side, ItemCard | null>;
};

/** Resultado de resolver un turno. */
export type Outcome =
  | { kind: 'win'; winner: Side }
  | { kind: 'tie' };

export type GameState = {
  player: PlayerState;
  cpu: PlayerState;
  phase: Phase;
  turn: TurnState;
  /** Ganador de la partida, si la hay. */
  winner: Side | null;
  /** Empate de partida (ambos sin personajes). */
  isDraw: boolean;
  /** Resultado del último turno resuelto, para feedback de UI. */
  lastOutcome: Outcome | null;
};
