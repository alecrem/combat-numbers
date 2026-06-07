// Tirada de dado. La aleatoriedad se inyecta para mantener la pureza/testabilidad.

/** Tira un d6 (1..6). El RNG se inyecta; por defecto Math.random. */
export function rollDie(rng: () => number = Math.random): number {
  return Math.floor(rng() * 6) + 1;
}
