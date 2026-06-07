import './App.css';
import { CharacterCardView } from './components/CharacterCardView';
import { DuelSide } from './components/DuelSide';
import { Hud } from './components/Hud';
import { ItemCardView } from './components/ItemCardView';
import { LanguageSelector } from './components/LanguageSelector';
import { RollPhase } from './components/RollPhase';
import { basePower, finalPower } from './game/power';
import type { GameState } from './game/types';
import { useI18n } from './i18n/LanguageContext';
import { useGame, type TurnSnapshot } from './useGame';

export default function App() {
  const { t } = useI18n();
  const {
    state,
    result,
    selectCharacter,
    rollDice,
    selectItem,
    continueAfterResult,
    newGame,
  } = useGame();

  return (
    <div className="game">
      <div className="topbar">
        <LanguageSelector />
      </div>

      <Hud title={t.hud.cpu} side={state.cpu} revealItems={false} />

      <main className="board">
        {result ? (
          <TurnResult result={result} state={state} onContinue={continueAfterResult} />
        ) : state.phase === 'choose-character' ? (
          <CharacterPicker state={state} onPick={selectCharacter} />
        ) : state.phase === 'reveal-roll' &&
          state.turn.chosen.cpu &&
          state.turn.chosen.player ? (
          <RollPhase
            cpu={state.turn.chosen.cpu}
            player={state.turn.chosen.player}
            onRoll={rollDice}
          />
        ) : state.phase === 'choose-item' ? (
          <ItemPicker state={state} onChoose={selectItem} />
        ) : (
          <GameOver state={state} onRestart={newGame} />
        )}
      </main>

      <Hud title={t.hud.you} side={state.player} revealItems />
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
  const { t } = useI18n();
  return (
    <section className="phase">
      <p className="prompt">{t.prompts.chooseCharacter}</p>
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
  const { t } = useI18n();
  const { chosen, roll } = state.turn;
  if (!chosen.player || !chosen.cpu || roll.player === null || roll.cpu === null) {
    return null;
  }

  return (
    <section className="phase">
      <div className="duel">
        <DuelSide
          label={t.hud.cpu}
          card={chosen.cpu}
          roll={roll.cpu}
          die={{ value: roll.cpu }}
          power={basePower(chosen.cpu, roll.cpu)}
        />
        <span className="vs">vs</span>
        <DuelSide
          label={t.hud.you}
          card={chosen.player}
          roll={roll.player}
          die={{ value: roll.player }}
          power={basePower(chosen.player, roll.player)}
        />
      </div>

      <p className="prompt">{t.prompts.useItem}</p>
      {state.player.itemHand.length === 0 ? (
        <button type="button" className="action" onClick={() => onChoose(null)}>
          {t.buttons.noItemsResolve}
        </button>
      ) : (
        <div className="hand">
          {state.player.itemHand.map((item) => (
            <ItemCardView key={item.id} item={item} onClick={() => onChoose(item.id)} />
          ))}
          <button type="button" className="action subtle" onClick={() => onChoose(null)}>
            {t.buttons.noItem}
          </button>
        </div>
      )}
    </section>
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
  const { t } = useI18n();
  const playerPower = finalPower(result.player.card, result.player.roll, result.player.item);
  const cpuPower = finalPower(result.cpu.card, result.cpu.roll, result.cpu.item);
  const outcome = state.lastOutcome;

  const headline =
    outcome?.kind === 'tie'
      ? t.result.tie
      : outcome?.winner === 'player'
        ? t.result.youWin
        : t.result.cpuWins;

  return (
    <section className="phase result">
      <p className="headline">{headline}</p>
      <div className="duel">
        <DuelSide
          label={t.hud.cpu}
          card={result.cpu.card}
          roll={result.cpu.roll}
          die={{ value: result.cpu.roll }}
          power={cpuPower}
          itemName={result.cpu.item ? (t.cards[result.cpu.item.id] ?? result.cpu.item.name) : null}
          winner={outcome?.kind === 'win' && outcome.winner === 'cpu'}
        />
        <span className="vs">vs</span>
        <DuelSide
          label={t.hud.you}
          card={result.player.card}
          roll={result.player.roll}
          die={{ value: result.player.roll }}
          power={playerPower}
          itemName={
            result.player.item ? (t.cards[result.player.item.id] ?? result.player.item.name) : null
          }
          winner={outcome?.kind === 'win' && outcome.winner === 'player'}
        />
      </div>
      <button type="button" className="action" onClick={onContinue}>
        {t.buttons.continue}
      </button>
    </section>
  );
}

function GameOver({ state, onRestart }: { state: GameState; onRestart: () => void }) {
  const { t } = useI18n();
  const message = state.isDraw
    ? t.gameOver.draw
    : state.winner === 'player'
      ? t.gameOver.youWon
      : t.gameOver.cpuWon;

  return (
    <section className="phase game-over">
      <p className="headline">{message}</p>
      <button type="button" className="action" onClick={onRestart}>
        {t.buttons.newGame}
      </button>
    </section>
  );
}
