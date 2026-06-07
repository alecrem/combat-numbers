# Combat Numbers — Especificación

Juego de cartas por turnos, 1 jugador contra la máquina (CPU). Corre 100% en el
navegador, sin servidor. Stack: Vite + TypeScript + React + `useReducer`.

## Principio de arquitectura

La **lógica del juego** vive separada de React por completo:

- `src/game/` — tipos, datos de las cartas y el reducer con funciones puras de
  resolución. Testeable sin React.
- React solo dibuja el estado y despacha acciones.
- La IA de la CPU es una función pura sobre el estado.

## Componentes del juego

### Carta de personaje

- Tiene 3 valores de poder, uno por cada *bracket* del dado:
  - `low` → dado 1-2
  - `mid` → dado 3-4
  - `high` → dado 5-6
- Las primeras cartas de prueba suman 500 entre sus 3 valores (dato de balance,
  no invariante del tipo; se verifica con un test de los datos).

### Carta de Item

- Efecto sobre el poder de **tu** carta este turno:
  - `double` — dobla el ataque.
  - `add` — suma `amount` al ataque.
- Es de un solo uso: al jugarse se descarta.

### Estado de cada jugador

- `characters`: 6 personajes disponibles. **Se consumen** (salen de la mano al
  resolverse un turno con ganador). No se barajan.
- `itemDeck`: mazo de 3 Items por robar. Empieza con 3.
- `itemHand`: Items en mano, jugables. Empieza vacío.
- `wins`: turnos ganados.

## Ciclo de un turno

1. **`choose-character`** — cada jugador elige un personaje boca abajo. Decisión
   simultánea y oculta. Jugador por UI, CPU por IA.
2. **`reveal-roll`** — se descubren los dos personajes y cada jugador tira su
   propio dado (d6) → bracket → poder base. Automático.
3. **`choose-item`** — quien tenga Items en mano decide jugar uno o ninguno.
   Simultáneo y oculto. Ya conoce el poder final del dado al decidir.
4. **`resolve`** — se aplican los Items y se comparan los poderes finales.

## Resolución del turno

`finalPower(card, roll, item)` = poder base del bracket del dado, con el efecto
del Item aplicado (si hay).

- **Gana uno** (poder final mayor):
  - Los **dos** personajes jugados se consumen (salen de la mano).
  - Los Items jugados (de ambos) se descartan.
  - El ganador roba un Item de su `itemDeck` a su `itemHand` si le queda mazo.
  - Si al ganar su `itemDeck` está **vacío** → ha ganado la partida.
- **Empate** (poderes finales iguales):
  - Los dos personajes **vuelven a la mano** (se podrán reusar).
  - Los Items jugados sí se gastan (se descartan).
  - Nadie roba.

## Condición de victoria

- Se ganan turnos. Al ganar un turno se roba un Item; con 3 Items en el mazo,
  las victorias 1, 2 y 3 dan Item, y la **4ª victoria** (mazo vacío) gana la
  partida.
- **Sin personajes:** si en el momento de elegir personaje un jugador no tiene
  ninguno disponible, **pierde**. Si ninguno de los dos puede sacar personaje,
  la partida queda en **empate**.

## Datos iniciales

- Jugador: 6 personajes + 3 Items.
- CPU: otros 6 personajes + 3 Items.
- Cada set de 3 valores de poder de un personaje suma 500 (de momento).

## Pendiente / futuro

- Más efectos de Item.
- Balance de cartas más allá del "suma 500".
- IA de la CPU más allá de lo básico.

## Registro de cambios

- **Inicial:** reglas cerradas (consumo de personajes, empate devuelve cartas,
  decisión de Item simultánea y oculta tras ver el dado, sin-personajes =
  derrota / doble = empate). Modelo de datos y máquina de estados definidos.
- **Esqueleto + lógica pura:** scaffold Vite + React 19 + TS (pnpm) y Vitest.
  Módulo `src/game/` con tipos, datos de cartas, `power`, `dice`, `ai` y el
  `reducer`. 26 tests en verde; typecheck y lint limpios. UI aún sin tocar.
