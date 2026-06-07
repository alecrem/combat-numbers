// Orquestación con React: envuelve el reducer puro y le inyecta la aleatoriedad
// (tiradas) y las decisiones de la CPU. La lógica de reglas vive en src/game.

import { useReducer, useState } from 'react';
import { chooseCpuCharacter, chooseCpuItem } from './game/ai';
import { rollDie } from './game/dice';
import { createInitialState, gameReducer } from './game/reducer';
import type { CharacterCard, ItemCard } from './game/types';

/** Foto del turno resuelto, para mostrar el resultado antes de continuar. */
export type TurnSnapshot = {
  player: { card: CharacterCard; roll: number; item: ItemCard | null };
  cpu: { card: CharacterCard; roll: number; item: ItemCard | null };
};

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  const [result, setResult] = useState<TurnSnapshot | null>(null);

  function selectCharacter(playerCharacterId: string) {
    const cpuCharacterId = chooseCpuCharacter(state.cpu);
    dispatch({
      type: 'SELECT_CHARACTER',
      playerCharacterId,
      cpuCharacterId,
      playerRoll: rollDie(),
      cpuRoll: rollDie(),
    });
  }

  function selectItem(playerItemId: string | null) {
    const { chosen, roll } = state.turn;
    if (!chosen.player || !chosen.cpu || roll.player === null || roll.cpu === null) {
      return;
    }
    const cpuItemId = chooseCpuItem(state.turn, state.cpu);
    const playerItem = state.player.itemHand.find((i) => i.id === playerItemId) ?? null;
    const cpuItem = state.cpu.itemHand.find((i) => i.id === cpuItemId) ?? null;

    setResult({
      player: { card: chosen.player, roll: roll.player, item: playerItem },
      cpu: { card: chosen.cpu, roll: roll.cpu, item: cpuItem },
    });
    dispatch({ type: 'SELECT_ITEM', playerItemId, cpuItemId });
  }

  function continueAfterResult() {
    setResult(null);
  }

  function newGame() {
    setResult(null);
    dispatch({ type: 'NEW_GAME' });
  }

  return { state, result, selectCharacter, selectItem, continueAfterResult, newGame };
}
