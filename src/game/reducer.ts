// Reducer del juego: transiciones puras de la máquina de estados.
// La aleatoriedad (tiradas) y las decisiones de la CPU entran como datos en las
// acciones, de modo que el reducer es determinista y testeable.

import {
  CPU_CHARACTERS,
  CPU_ITEMS,
  PLAYER_CHARACTERS,
  PLAYER_ITEMS,
} from './cards';
import { finalPower } from './power';
import type {
  GameState,
  ItemCard,
  Outcome,
  PlayerState,
  Side,
  TurnState,
} from './types';

export type GameAction =
  | { type: 'SELECT_CHARACTER'; playerCharacterId: string; cpuCharacterId: string }
  | { type: 'ROLL_DICE'; playerRoll: number; cpuRoll: number }
  | { type: 'SELECT_ITEM'; playerItemId: string | null; cpuItemId: string | null }
  | { type: 'NEW_GAME' };

const emptyTurn: TurnState = {
  chosen: { player: null, cpu: null },
  roll: { player: null, cpu: null },
  item: { player: null, cpu: null },
};

function createPlayer(
  characters: PlayerState['characters'],
  items: ItemCard[],
): PlayerState {
  return {
    characters: characters.map((c) => ({ ...c })),
    itemDeck: items.map((i) => ({ ...i })),
    itemHand: [],
    wins: 0,
  };
}

export function createInitialState(): GameState {
  return {
    player: createPlayer(PLAYER_CHARACTERS, PLAYER_ITEMS),
    cpu: createPlayer(CPU_CHARACTERS, CPU_ITEMS),
    phase: 'choose-character',
    turn: emptyTurn,
    winner: null,
    isDraw: false,
    lastOutcome: null,
  };
}

function findCard<T extends { id: string }>(cards: T[], id: string | null): T | null {
  if (id === null) return null;
  return cards.find((c) => c.id === id) ?? null;
}

/** Aplica la victoria de un turno a un jugador: roba Item o gana la partida. */
function applyWin(state: PlayerState): { next: PlayerState; gameWon: boolean } {
  const wins = state.wins + 1;
  if (state.itemDeck.length === 0) {
    return { next: { ...state, wins }, gameWon: true };
  }
  const [drawn, ...restDeck] = state.itemDeck;
  return {
    next: {
      ...state,
      wins,
      itemDeck: restDeck,
      itemHand: [...state.itemHand, drawn],
    },
    gameWon: false,
  };
}

const without = <T extends { id: string }>(cards: T[], id: string): T[] =>
  cards.filter((c) => c.id !== id);

function selectCharacter(
  state: GameState,
  action: Extract<GameAction, { type: 'SELECT_CHARACTER' }>,
): GameState {
  if (state.phase !== 'choose-character') return state;

  const playerCard = findCard(state.player.characters, action.playerCharacterId);
  const cpuCard = findCard(state.cpu.characters, action.cpuCharacterId);
  if (!playerCard || !cpuCard) return state;

  return {
    ...state,
    phase: 'reveal-roll',
    turn: {
      chosen: { player: playerCard, cpu: cpuCard },
      roll: { player: null, cpu: null },
      item: { player: null, cpu: null },
    },
  };
}

function rollDice(
  state: GameState,
  action: Extract<GameAction, { type: 'ROLL_DICE' }>,
): GameState {
  if (state.phase !== 'reveal-roll') return state;
  if (!state.turn.chosen.player || !state.turn.chosen.cpu) return state;

  return {
    ...state,
    phase: 'choose-item',
    turn: {
      ...state.turn,
      roll: { player: action.playerRoll, cpu: action.cpuRoll },
    },
  };
}

function selectItem(
  state: GameState,
  action: Extract<GameAction, { type: 'SELECT_ITEM' }>,
): GameState {
  if (state.phase !== 'choose-item') return state;

  const { chosen, roll } = state.turn;
  if (!chosen.player || !chosen.cpu || roll.player === null || roll.cpu === null) {
    return state;
  }

  const playerItem = findCard(state.player.itemHand, action.playerItemId);
  const cpuItem = findCard(state.cpu.itemHand, action.cpuItemId);

  // Los Items jugados se descartan siempre (también en empate).
  let player: PlayerState = {
    ...state.player,
    itemHand: playerItem
      ? without(state.player.itemHand, playerItem.id)
      : state.player.itemHand,
  };
  let cpu: PlayerState = {
    ...state.cpu,
    itemHand: cpuItem ? without(state.cpu.itemHand, cpuItem.id) : state.cpu.itemHand,
  };

  const playerPower = finalPower(chosen.player, roll.player, playerItem);
  const cpuPower = finalPower(chosen.cpu, roll.cpu, cpuItem);

  // Empate: los personajes vuelven a la mano, nadie roba.
  if (playerPower === cpuPower) {
    return startNextTurn(
      { ...state, player, cpu },
      { kind: 'tie' },
      { player, cpu },
    );
  }

  // Gana uno: se consumen ambos personajes.
  const winnerSide: Side = playerPower > cpuPower ? 'player' : 'cpu';
  player = { ...player, characters: without(player.characters, chosen.player.id) };
  cpu = { ...cpu, characters: without(cpu.characters, chosen.cpu.id) };

  const winnerState = winnerSide === 'player' ? player : cpu;
  const { next: winnerNext, gameWon } = applyWin(winnerState);
  if (winnerSide === 'player') player = winnerNext;
  else cpu = winnerNext;

  const outcome: Outcome = { kind: 'win', winner: winnerSide };

  if (gameWon) {
    return {
      ...state,
      player,
      cpu,
      phase: 'game-over',
      winner: winnerSide,
      turn: emptyTurn,
      lastOutcome: outcome,
    };
  }

  return startNextTurn({ ...state, player, cpu }, outcome, { player, cpu });
}

/**
 * Prepara el siguiente turno tras una resolución sin victoria de partida.
 * Aplica la regla de quedarse sin personajes: quien no pueda sacar, pierde;
 * si ninguno puede, empate de partida.
 */
function startNextTurn(
  state: GameState,
  outcome: Outcome,
  sides: { player: PlayerState; cpu: PlayerState },
): GameState {
  const playerOut = sides.player.characters.length === 0;
  const cpuOut = sides.cpu.characters.length === 0;

  if (playerOut && cpuOut) {
    return {
      ...state,
      phase: 'game-over',
      winner: null,
      isDraw: true,
      turn: emptyTurn,
      lastOutcome: outcome,
    };
  }
  if (playerOut || cpuOut) {
    return {
      ...state,
      phase: 'game-over',
      winner: playerOut ? 'cpu' : 'player',
      turn: emptyTurn,
      lastOutcome: outcome,
    };
  }

  return {
    ...state,
    phase: 'choose-character',
    turn: emptyTurn,
    lastOutcome: outcome,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NEW_GAME':
      return createInitialState();
    case 'SELECT_CHARACTER':
      return selectCharacter(state, action);
    case 'ROLL_DICE':
      return rollDice(state, action);
    case 'SELECT_ITEM':
      return selectItem(state, action);
  }
}
