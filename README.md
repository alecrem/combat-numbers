# Combat Numbers

Juego de cartas por turnos contra la CPU, jugable en el navegador y 100% en
local (sin servidor). Cada jugador tiene 6 personajes y un mazo de 3 objetos;
cada turno ambos sacan un personaje, se tira un dado que decide su poder, se
puede usar un objeto y gana el de mayor poder. Ganar turnos roba objetos y la 4ª
victoria gana la partida. Las reglas completas están en [`spec.md`](spec.md).

Stack: Vite + React + TypeScript, con la lógica del juego como un reducer puro
separado de la UI.

## Requisitos

- Node 22+
- pnpm

## Puesta en marcha

```bash
pnpm install
pnpm dev      # servidor de desarrollo (http://localhost:5173)
```

## Scripts

- `pnpm dev` — servidor de desarrollo con HMR.
- `pnpm build` — typecheck + build de producción.
- `pnpm test` — tests (Vitest).
- `pnpm typecheck` — comprobación de tipos.
- `pnpm lint` — ESLint.
- `pnpm verify` — typecheck + lint + test (lo que corre el hook y CI).

## Calidad y CI

- **Pre-commit hook** (sin dependencias): un script versionado en `.githooks/`
  corre `pnpm verify` antes de cada commit. Se activa solo: el script `prepare`
  apunta git a esa carpeta (`core.hooksPath`) al hacer `pnpm install`.
- **CI** ([.github/workflows/ci.yml](.github/workflows/ci.yml)): en cada Pull
  Request y push a `main` se ejecutan typecheck, lint, test y build.

## Idiomas

La interfaz está localizada en **español, japonés e inglés**, con selector de
idioma arriba a la derecha. La preferencia se guarda en `localStorage`. Las
traducciones viven en [`src/i18n/`](src/i18n/).

## Estructura

- `src/game/` — lógica pura del juego (tipos, cartas, dados, IA, reducer) y sus
  tests. No depende de React.
- `src/i18n/` — diccionario de traducciones y contexto de idioma.
- `src/components/` — componentes de UI.
- `src/useGame.ts` — hook que conecta el reducer puro con React (dados + IA).
