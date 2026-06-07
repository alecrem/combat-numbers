import './App.css';
import { CharacterCardView } from './components/CharacterCardView';
import { Hud } from './components/Hud';
import { ItemCardView } from './components/ItemCardView';
import { basePower, finalPower } from './game/power';
import type { GameState, Side } from './game/types';
import { useGame, type TurnSnapshot } from './useGame';

export default function App() {
  const { state, result, selectCharacter, selectItem, continueAfterResult, newGame } =
    useGame();

  return (
    <div className="game">
      <Hud title="CPU" side={state.cpu} revealItems={false} />

      <main className="board">
        {result ? (
          <TurnResult result={result} state={state} onContinue={continueAfterResult} />
        ) : state.phase === 'choose-character' ? (
          <CharacterPicker state={state} onPick={selectCharacter} />
        ) : state.phase === 'choose-item' ? (
          <ItemPicker state={state} onChoose={selectItem} />
        ) : (
          <GameOver state={state} onRestart={newGame} />
        )}
      </main>

      <Hud title="Tú" side={state.player} revealItems />
    </div>
  );
}

function CharacterPicker({
  state,
  onPick,
}: {
  state: GameState;
  onPick: (id: string) => void;
}) {
  return (
    <section className="phase">
      <p className="prompt">Elige tu personaje</p>
      <div className="hand">
        {state.player.characters.map((card) => (
          <CharacterCardView key={card.id} card={card} onClick={() => onPick(card.id)} />
        ))}
      </div>
    </section>
  );
}

function ItemPicker({
  state,
  onChoose,
}: {
  state: GameState;
  onChoose: (id: string | null) => void;
}) {
  const { chosen, roll } = state.turn;
  if (!chosen.player || !chosen.cpu || roll.player === null || roll.cpu === null) {
    return null;
  }

  return (
    <section className="phase">
      <div className="duel">
        <RevealedCard
          label="CPU"
          name={chosen.cpu.name}
          roll={roll.cpu}
          power={basePower(chosen.cpu, roll.cpu)}
        />
        <span className="vs">vs</span>
        <RevealedCard
          label="Tú"
          name={chosen.player.name}
          roll={roll.player}
          power={basePower(chosen.player, roll.player)}
        />
      </div>

      <p className="prompt">¿Usar un objeto?</p>
      {state.player.itemHand.length === 0 ? (
        <button type="button" className="action" onClick={() => onChoose(null)}>
          No tengo objetos — resolver turno
        </button>
      ) : (
        <div className="hand">
          {state.player.itemHand.map((item) => (
            <ItemCardView key={item.id} item={item} onClick={() => onChoose(item.id)} />
          ))}
          <button type="button" className="action subtle" onClick={() => onChoose(null)}>
            Sin objeto
          </button>
        </div>
      )}
    </section>
  );
}

function RevealedCard({
  label,
  name,
  roll,
  power,
}: {
  label: string;
  name: string;
  roll: number;
  power: number;
}) {
  return (
    <div className="revealed">
      <span className="revealed-label">{label}</span>
      <span className="revealed-name">{name}</span>
      <span className="revealed-roll">🎲 {roll}</span>
      <span className="revealed-power">{power}</span>
    </div>
  );
}

function TurnResult({
  result,
  state,
  onContinue,
}: {
  result: TurnSnapshot;
  state: GameState;
  onContinue: () => void;
}) {
  const playerPower = finalPower(result.player.card, result.player.roll, result.player.item);
  const cpuPower = finalPower(result.cpu.card, result.cpu.roll, result.cpu.item);
  const outcome = state.lastOutcome;

  const headline =
    outcome?.kind === 'tie'
      ? 'Empate — los personajes vuelven a la mano'
      : outcome?.winner === 'player'
        ? '¡Ganas el turno!'
        : 'La CPU gana el turno';

  return (
    <section className="phase result">
      <p className="headline">{headline}</p>
      <div className="duel">
        <ResultSide snapshot={result.cpu} label="CPU" power={cpuPower} />
        <span className="vs">vs</span>
        <ResultSide snapshot={result.player} label="Tú" power={playerPower} />
      </div>
      <button type="button" className="action" onClick={onContinue}>
        Continuar
      </button>
    </section>
  );
}

function ResultSide({
  snapshot,
  label,
  power,
}: {
  snapshot: TurnSnapshot[Side];
  label: string;
  power: number;
}) {
  return (
    <div className="revealed">
      <span className="revealed-label">{label}</span>
      <span className="revealed-name">{snapshot.card.name}</span>
      <span className="revealed-roll">🎲 {snapshot.roll}</span>
      <span className="revealed-item">
        {snapshot.item ? snapshot.item.name : 'sin objeto'}
      </span>
      <span className="revealed-power">{power}</span>
    </div>
  );
}

function GameOver({ state, onRestart }: { state: GameState; onRestart: () => void }) {
  const message = state.isDraw
    ? 'Empate: ninguno puede sacar personaje'
    : state.winner === 'player'
      ? '🏆 ¡Has ganado la partida!'
      : 'La CPU ha ganado la partida';

  return (
    <section className="phase game-over">
      <p className="headline">{message}</p>
      <button type="button" className="action" onClick={onRestart}>
        Nueva partida
      </button>
    </section>
  );
}
