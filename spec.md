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
2. **`reveal-roll`** — se descubren las dos cartas completas (aún sin dado). El
   jugador pulsa "Tirar dado": breve animación y cada jugador tira su d6 → bracket
   → poder base. El poder se muestra en grande fuera de la carta (luego el Item
   puede modificarlo) y se resalta el tramo aplicado.
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
- Son las cartas reales (las de papel). Cada personaje suma **500 o 1000** entre
  sus 3 poderes; cada jugador tiene 2 cartas de 1000 y suma **4000** en total.

## Internacionalización (i18n)

- Idiomas: español, japonés e inglés. Diccionario tipado propio en `src/i18n/`
  (sin dependencias externas).
- `translations.ts`: textos de chrome (garantizados por el tipo) y nombres de
  carta por id (`cards`, verificados con un test de cobertura).
- `LanguageContext.ts` (contexto + `useI18n`) y `LanguageProvider.tsx` (estado +
  persistencia en `localStorage` + `lang` del `<html>`). Idioma inicial:
  preferencia guardada → idioma del navegador → `es`.
- Selector de idioma en la UI. Se traducen también los nombres de personajes y
  objetos y las etiquetas de efecto (`×2`/`+N`).

## Pendiente / futuro

- Más efectos de Item.
- Balance de cartas.
- IA de la CPU más allá de lo básico.

## Registro de cambios

- **Inicial:** reglas cerradas (consumo de personajes, empate devuelve cartas,
  decisión de Item simultánea y oculta tras ver el dado, sin-personajes =
  derrota / doble = empate). Modelo de datos y máquina de estados definidos.
- **Esqueleto + lógica pura:** scaffold Vite + React 19 + TS (pnpm) y Vitest.
  Módulo `src/game/` con tipos, datos de cartas, `power`, `dice`, `ai` y el
  `reducer`. 26 tests en verde; typecheck y lint limpios. UI aún sin tocar.
- **UI:** hook `useGame` que envuelve el reducer e inyecta dados + decisiones de
  la CPU. Pantalla en `App.tsx` con las fases (elegir personaje → elegir objeto
  → resultado → fin de partida), HUD por jugador y componentes de carta. La foto
  del turno (`TurnSnapshot`) mantiene visible el resultado hasta "Continuar".
- **Tirada interactiva:** la fase `reveal-roll` se separa en una acción propia
  `ROLL_DICE`. Tras elegir personaje se ven ambas cartas; un botón "Tirar dado"
  lanza una animación (~0.8 s) y luego se ven las cartas con el tramo resaltado y
  el poder en grande fuera de la carta. Nuevos `DuelSide` y `RollPhase`.
- **Dado persistente:** el dado (`Die`) es prop de `DuelSide` y se conserva en su
  sitio al cambiar de fase (tirada → objeto → resultado), mostrando el número que
  salió para que no se pierda al pasar de pantalla.
- **i18n (#1):** localización es/ja/en con diccionario tipado propio en
  `src/i18n/`, contexto + `localStorage` y selector de idioma. Se traduce toda la
  UI, incluidos nombres de cartas y etiquetas de efecto. Test de cobertura de
  traducciones. 31 tests en verde.
- **Poder proyectado (#2):** en la fase de objeto, cada carta de objeto muestra
  fijo el poder resultante de tu personaje si lo usas (`→ N`, vía `finalPower`).
  Sin hover, así funciona también en táctil. Sólo presentación.
- **Énfasis del ganador (#3):** en el resultado, `DuelSide` recibe un `status`
  (winner/loser/tie): el ganador se realza (escala + glow + animación + chapa
  "🏆 Ganador" textual), el perdedor se atenúa y el empate tiene estilo propio.
  Respeta `prefers-reduced-motion`. El resultado textual sigue en el titular.
- **Responsive / móvil (#4):** botones con altura de toque mínima (44px) y un
  breakpoint (≤540px) que ajusta paddings, tamaños de carta/dado/poder y el HUD
  para que la mano y el duelo reflowen sin desbordar. Solo CSS.
- **Pulido visual (#5):** el dado (`Die`) muestra puntos (pips) en una rejilla
  3×3 en vez del número (con `aria-label` para accesibilidad); las cartas de
  objeto llevan un icono SVG según el efecto (doble chevrón = doblar, flecha =
  sumar). Nuevo `ItemIcon`. En el resultado, el objeto usado por cada jugador se
  muestra como carta (icono + efecto) y el poder como `base → final` cuando el
  Item lo modifica, para que se vea qué ha pasado con puntos y objetos.
- **Reorden de layout (#12):** los dos HUDs van arriba (jugador, luego CPU) y el
  tablero debajo, para que el HUD del jugador se vea sin scroll. En el duelo, el
  jugador queda a la izquierda y la CPU a la derecha en todas las fases.
- **Cartas reales (#14):** `cards.ts` refleja las cartas de papel (nombres y
  valores). Nueva regla: cada personaje suma 500 o 1000 y cada jugador suma 4000
  (2 cartas de 1000); `cards.test.ts` actualizado. Localizaciones es/ja/en con
  los nombres nuevos (ja = el de las cartas).
- **DevOps (#16):** hook de pre-commit sin dependencias (`.githooks/pre-commit`
  + `core.hooksPath` vía script `prepare`) que corre `pnpm verify` (typecheck +
  lint + test), y workflow de GitHub Actions que ejecuta esos checks + build en
  cada PR y push a `main`.
