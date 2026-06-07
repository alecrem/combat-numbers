import { describe, expect, it } from 'vitest';
import { createInitialState, gameReducer } from './reducer';
import type {
  CharacterCard,
  GameState,
  ItemCard,
  PlayerState,
  TurnState,
} from './types';

// --- builders -------------------------------------------------------------

const ch = (id: string, low: number, mid: number, high: number): CharacterCard => ({
  id,
  name: id,
  power: { low, mid, high },
});

const addItem = (id: string, amount: number): ItemCard => ({
  id,
  name: id,
  effect: { kind: 'add', amount },
});

const player = (over: Partial<PlayerState> = {}): PlayerState => ({
  characters: [],
  itemDeck: [],
  itemHand: [],
  wins: 0,
  ...over,
});

const turn = (over: Partial<TurnState> = {}): TurnState => ({
  chosen: { player: null, cpu: null },
  roll: { player: null, cpu: null },
  item: { player: null, cpu: null },
  ...over,
});

const inChooseItem = (over: Partial<GameState>): GameState => ({
  player: player(),
  cpu: player(),
  phase: 'choose-item',
  turn: turn(),
  winner: null,
  isDraw: false,
  lastOutcome: null,
  ...over,
});

// --- initial state --------------------------------------------------------

describe('createInitialState', () => {
  it('starts both sides with 6 characters, 3 deck items, empty hands', () => {
    const s = createInitialState();
    expect(s.phase).toBe('choose-character');
    for (const side of [s.player, s.cpu]) {
      expect(side.characters).toHaveLength(6);
      expect(side.itemDeck).toHaveLength(3);
      expect(side.itemHand).toHaveLength(0);
      expect(side.wins).toBe(0);
    }
  });
});

// --- SELECT_CHARACTER -----------------------------------------------------

describe('SELECT_CHARACTER', () => {
  it('reveals both characters with their rolls and moves to choose-item', () => {
    const s = createInitialState();
    const next = gameReducer(s, {
      type: 'SELECT_CHARACTER',
      playerCharacterId: 'p-char-1',
      cpuCharacterId: 'c-char-1',
      playerRoll: 6,
      cpuRoll: 2,
    });
    expect(next.phase).toBe('choose-item');
    expect(next.turn.chosen.player?.id).toBe('p-char-1');
    expect(next.turn.chosen.cpu?.id).toBe('c-char-1');
    expect(next.turn.roll).toEqual({ player: 6, cpu: 2 });
  });

  it('ignores unknown character ids', () => {
    const s = createInitialState();
    const next = gameReducer(s, {
      type: 'SELECT_CHARACTER',
      playerCharacterId: 'nope',
      cpuCharacterId: 'c-char-1',
      playerRoll: 1,
      cpuRoll: 1,
    });
    expect(next).toBe(s);
  });

  it('does nothing outside choose-character phase', () => {
    const s = inChooseItem({});
    const next = gameReducer(s, {
      type: 'SELECT_CHARACTER',
      playerCharacterId: 'p-char-1',
      cpuCharacterId: 'c-char-1',
      playerRoll: 1,
      cpuRoll: 1,
    });
    expect(next).toBe(s);
  });
});

// --- SELECT_ITEM: win -----------------------------------------------------

describe('SELECT_ITEM resolution', () => {
  it('on a win consumes both characters, increments wins and draws an item', () => {
    const s = inChooseItem({
      player: player({
        characters: [ch('pa', 100, 100, 180), ch('pb', 100, 100, 100)],
        itemDeck: [addItem('reward', 10), addItem('reward2', 20)],
      }),
      cpu: player({ characters: [ch('ca', 110, 110, 110), ch('cb', 0, 0, 0)] }),
      turn: turn({
        chosen: { player: ch('pa', 100, 100, 180), cpu: ch('ca', 110, 110, 110) },
        roll: { player: 6, cpu: 6 }, // player 180 vs cpu 110
      }),
    });

    const next = gameReducer(s, {
      type: 'SELECT_ITEM',
      playerItemId: null,
      cpuItemId: null,
    });

    expect(next.lastOutcome).toEqual({ kind: 'win', winner: 'player' });
    expect(next.player.characters.map((c) => c.id)).toEqual(['pb']);
    expect(next.cpu.characters.map((c) => c.id)).toEqual(['cb']);
    expect(next.player.wins).toBe(1);
    expect(next.player.itemHand.map((i) => i.id)).toEqual(['reward']);
    expect(next.player.itemDeck.map((i) => i.id)).toEqual(['reward2']);
    expect(next.phase).toBe('choose-character');
  });

  it('lets an item flip a losing base power into a win', () => {
    const s = inChooseItem({
      player: player({
        characters: [ch('pa', 100, 100, 100), ch('pb', 1, 1, 1)],
        itemDeck: [addItem('reward', 10)],
        itemHand: [addItem('boost', 50)],
      }),
      cpu: player({ characters: [ch('ca', 120, 120, 120), ch('cb', 1, 1, 1)] }),
      turn: turn({
        chosen: { player: ch('pa', 100, 100, 100), cpu: ch('ca', 120, 120, 120) },
        roll: { player: 1, cpu: 1 }, // base 100 vs 120 -> player loses without item
      }),
    });

    const next = gameReducer(s, {
      type: 'SELECT_ITEM',
      playerItemId: 'boost', // 100 + 50 = 150 > 120
      cpuItemId: null,
    });

    expect(next.lastOutcome).toEqual({ kind: 'win', winner: 'player' });
    // 'boost' was consumed; the win drew 'reward' into the hand
    expect(next.player.itemHand.map((i) => i.id)).toEqual(['reward']);
    expect(next.player.wins).toBe(1);
  });

  it('discards a played item even when the turn ends in a tie', () => {
    const s = inChooseItem({
      player: player({
        characters: [ch('pa', 100, 100, 100), ch('pb', 1, 1, 1)],
        itemHand: [addItem('boost', 20)], // 100 + 20 = 120, matches cpu -> tie
      }),
      cpu: player({ characters: [ch('ca', 120, 120, 120), ch('cb', 1, 1, 1)] }),
      turn: turn({
        chosen: { player: ch('pa', 100, 100, 100), cpu: ch('ca', 120, 120, 120) },
        roll: { player: 1, cpu: 1 },
      }),
    });

    const next = gameReducer(s, {
      type: 'SELECT_ITEM',
      playerItemId: 'boost',
      cpuItemId: null,
    });

    expect(next.lastOutcome).toEqual({ kind: 'tie' });
    expect(next.player.itemHand).toHaveLength(0); // gasted on a tie
    // characters returned to hand (not consumed)
    expect(next.player.characters.map((c) => c.id)).toEqual(['pa', 'pb']);
    expect(next.cpu.characters.map((c) => c.id)).toEqual(['ca', 'cb']);
    expect(next.player.wins).toBe(0);
    expect(next.phase).toBe('choose-character');
  });

  it('wins the game on a win with an empty item deck', () => {
    const s = inChooseItem({
      player: player({
        characters: [ch('pa', 100, 100, 180), ch('pb', 1, 1, 1)],
        itemDeck: [], // empty -> winning the turn wins the game
        wins: 3,
      }),
      cpu: player({ characters: [ch('ca', 110, 110, 110), ch('cb', 1, 1, 1)] }),
      turn: turn({
        chosen: { player: ch('pa', 100, 100, 180), cpu: ch('ca', 110, 110, 110) },
        roll: { player: 6, cpu: 6 },
      }),
    });

    const next = gameReducer(s, {
      type: 'SELECT_ITEM',
      playerItemId: null,
      cpuItemId: null,
    });

    expect(next.phase).toBe('game-over');
    expect(next.winner).toBe('player');
    expect(next.player.wins).toBe(4);
  });
});

// --- out of characters ----------------------------------------------------

describe('running out of characters', () => {
  it('makes the side that cannot play next lose', () => {
    const s = inChooseItem({
      player: player({ characters: [ch('pa', 100, 100, 100)] }), // last one
      cpu: player({
        characters: [ch('ca', 120, 120, 120), ch('cb', 1, 1, 1)],
        itemDeck: [addItem('reward', 10)],
      }),
      turn: turn({
        chosen: { player: ch('pa', 100, 100, 100), cpu: ch('ca', 120, 120, 120) },
        roll: { player: 1, cpu: 1 }, // cpu wins, player consumes its last character
      }),
    });

    const next = gameReducer(s, {
      type: 'SELECT_ITEM',
      playerItemId: null,
      cpuItemId: null,
    });

    expect(next.phase).toBe('game-over');
    expect(next.winner).toBe('cpu');
    expect(next.isDraw).toBe(false);
  });

  it('draws the game when both sides run out at once', () => {
    const s = inChooseItem({
      player: player({
        characters: [ch('pa', 100, 100, 180)],
        itemDeck: [addItem('reward', 10)], // winner still has deck -> not a 4th win
      }),
      cpu: player({ characters: [ch('ca', 110, 110, 110)] }),
      turn: turn({
        chosen: { player: ch('pa', 100, 100, 180), cpu: ch('ca', 110, 110, 110) },
        roll: { player: 6, cpu: 6 }, // player wins, both consume their last character
      }),
    });

    const next = gameReducer(s, {
      type: 'SELECT_ITEM',
      playerItemId: null,
      cpuItemId: null,
    });

    expect(next.phase).toBe('game-over');
    expect(next.winner).toBeNull();
    expect(next.isDraw).toBe(true);
  });
});

// --- NEW_GAME -------------------------------------------------------------

describe('NEW_GAME', () => {
  it('resets to a fresh initial state', () => {
    const mid = inChooseItem({ winner: 'cpu', phase: 'game-over' });
    const next = gameReducer(mid, { type: 'NEW_GAME' });
    expect(next).toEqual(createInitialState());
  });
});
