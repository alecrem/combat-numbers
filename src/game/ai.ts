// IA de la CPU: decisiones puras. Naïve por ahora (ver spec.md "pendiente").
// La CPU decide sin ver el Item del rival (decisión simultánea y oculta), pero
// sí conoce los dos personajes y las dos tiradas, que ya son públicas.

import { applyItem, basePower } from './power';
import type { PlayerState, TurnState } from './types';

/**
 * Elige personaje entre los disponibles. Con las cartas iniciales (todas suman
 * 500) el valor esperado es igual, así que de momento elige al azar.
 */
export function chooseCpuCharacter(
  cpu: PlayerState,
  rng: () => number = Math.random,
): string {
  const index = Math.floor(rng() * cpu.characters.length);
  return cpu.characters[index].id;
}

/**
 * Decide si jugar un Item. Si va perdiendo o empatando y algún Item le da la
 * victoria, juega el de menor resultado suficiente (conserva los más fuertes).
 * Si ya gana, o ningún Item le hace ganar, no juega.
 */
export function chooseCpuItem(turn: TurnState, cpu: PlayerState): string | null {
  const cpuCard = turn.chosen.cpu;
  const playerCard = turn.chosen.player;
  if (!cpuCard || !playerCard || turn.roll.cpu === null || turn.roll.player === null) {
    return null;
  }
  if (cpu.itemHand.length === 0) return null;

  const cpuBase = basePower(cpuCard, turn.roll.cpu);
  const playerBase = basePower(playerCard, turn.roll.player);
  if (cpuBase > playerBase) return null; // ya gana, conserva el Item

  let best: { id: string; result: number } | null = null;
  for (const item of cpu.itemHand) {
    const result = applyItem(cpuBase, item);
    if (result > playerBase && (!best || result < best.result)) {
      best = { id: item.id, result };
    }
  }
  return best?.id ?? null;
}
