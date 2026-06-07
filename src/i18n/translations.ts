// Diccionario de traducciones tipado. Sin dependencias externas.
// Las claves de chrome quedan garantizadas por el tipo `Translations`; la
// cobertura de los nombres de carta (`cards`) se verifica con un test.

export type Language = 'es' | 'ja' | 'en';

export const SUPPORTED_LANGUAGES: Language[] = ['es', 'ja', 'en'];

/** Nombre nativo de cada idioma, igual sea cual sea el idioma activo. */
export const LANGUAGE_LABELS: Record<Language, string> = {
  es: 'Español',
  ja: '日本語',
  en: 'English',
};

export type Translations = {
  hud: {
    you: string;
    cpu: string;
    wins: string;
    characters: string;
    itemDeck: string;
    noItems: string;
    hiddenItem: string;
  };
  prompts: {
    chooseCharacter: string;
    rollPhase: string;
    useItem: string;
  };
  buttons: {
    roll: string;
    rolling: string;
    noItemsResolve: string;
    noItem: string;
    continue: string;
    newGame: string;
  };
  result: {
    tie: string;
    youWin: string;
    cpuWins: string;
  };
  gameOver: {
    draw: string;
    youWon: string;
    cpuWon: string;
  };
  effect: {
    double: string;
    add: (amount: number) => string;
  };
  /** Texto cuando no se usa objeto, en minúscula (junto a la carta). */
  noItem: string;
  /** Nombre de cada carta (personaje/objeto) por su id. */
  cards: Record<string, string>;
  languageLabel: string;
};

const es: Translations = {
  hud: {
    you: 'Tú',
    cpu: 'CPU',
    wins: 'Victorias',
    characters: 'Personajes',
    itemDeck: 'Mazo Items',
    noItems: 'Sin objetos en mano',
    hiddenItem: 'Objeto oculto',
  },
  prompts: {
    chooseCharacter: 'Elige tu personaje',
    rollPhase: '¡Personajes en juego! Tira el dado',
    useItem: '¿Usar un objeto?',
  },
  buttons: {
    roll: 'Tirar dado',
    rolling: 'Tirando…',
    noItemsResolve: 'No tengo objetos — resolver turno',
    noItem: 'Sin objeto',
    continue: 'Continuar',
    newGame: 'Nueva partida',
  },
  result: {
    tie: 'Empate — los personajes vuelven a la mano',
    youWin: '¡Ganas el turno!',
    cpuWins: 'La CPU gana el turno',
  },
  gameOver: {
    draw: 'Empate: ninguno puede sacar personaje',
    youWon: '🏆 ¡Has ganado la partida!',
    cpuWon: 'La CPU ha ganado la partida',
  },
  effect: {
    double: '×2 ataque',
    add: (amount) => `+${amount} ataque`,
  },
  noItem: 'sin objeto',
  cards: {
    'p-char-1': 'Caballero',
    'p-char-2': 'Arquera',
    'p-char-3': 'Guardián',
    'p-char-4': 'Pícaro',
    'p-char-5': 'Bárbaro',
    'p-char-6': 'Mago',
    'c-char-1': 'Centinela',
    'c-char-2': 'Cazadora',
    'c-char-3': 'Coloso',
    'c-char-4': 'Asesino',
    'c-char-5': 'Berserker',
    'c-char-6': 'Hechicera',
    'p-item-1': 'Doble Filo',
    'p-item-2': 'Refuerzo',
    'p-item-3': 'Talismán',
    'c-item-1': 'Furia',
    'c-item-2': 'Vigor',
    'c-item-3': 'Amuleto',
  },
  languageLabel: 'Idioma',
};

const en: Translations = {
  hud: {
    you: 'You',
    cpu: 'CPU',
    wins: 'Wins',
    characters: 'Characters',
    itemDeck: 'Item deck',
    noItems: 'No items in hand',
    hiddenItem: 'Hidden item',
  },
  prompts: {
    chooseCharacter: 'Choose your character',
    rollPhase: 'Characters in play! Roll the dice',
    useItem: 'Use an item?',
  },
  buttons: {
    roll: 'Roll dice',
    rolling: 'Rolling…',
    noItemsResolve: 'No items — resolve turn',
    noItem: 'No item',
    continue: 'Continue',
    newGame: 'New game',
  },
  result: {
    tie: 'Tie — characters return to hand',
    youWin: 'You win the turn!',
    cpuWins: 'The CPU wins the turn',
  },
  gameOver: {
    draw: 'Draw: neither can play a character',
    youWon: '🏆 You won the game!',
    cpuWon: 'The CPU won the game',
  },
  effect: {
    double: '×2 attack',
    add: (amount) => `+${amount} attack`,
  },
  noItem: 'no item',
  cards: {
    'p-char-1': 'Knight',
    'p-char-2': 'Archer',
    'p-char-3': 'Guardian',
    'p-char-4': 'Rogue',
    'p-char-5': 'Barbarian',
    'p-char-6': 'Mage',
    'c-char-1': 'Sentinel',
    'c-char-2': 'Huntress',
    'c-char-3': 'Colossus',
    'c-char-4': 'Assassin',
    'c-char-5': 'Berserker',
    'c-char-6': 'Sorceress',
    'p-item-1': 'Double Edge',
    'p-item-2': 'Reinforce',
    'p-item-3': 'Talisman',
    'c-item-1': 'Fury',
    'c-item-2': 'Vigor',
    'c-item-3': 'Amulet',
  },
  languageLabel: 'Language',
};

const ja: Translations = {
  hud: {
    you: 'あなた',
    cpu: 'CPU',
    wins: '勝利',
    characters: 'キャラクター',
    itemDeck: 'アイテム山札',
    noItems: '手札にアイテムなし',
    hiddenItem: '伏せたアイテム',
  },
  prompts: {
    chooseCharacter: 'キャラクターを選ぼう',
    rollPhase: 'キャラクター登場！ダイスを振ろう',
    useItem: 'アイテムを使う？',
  },
  buttons: {
    roll: 'ダイスを振る',
    rolling: '振っています…',
    noItemsResolve: 'アイテムなし — ターンを解決',
    noItem: '使わない',
    continue: '続ける',
    newGame: '新しいゲーム',
  },
  result: {
    tie: '引き分け — キャラクターは手札に戻る',
    youWin: 'ターンに勝った！',
    cpuWins: 'CPUがターンに勝った',
  },
  gameOver: {
    draw: '引き分け：両者ともキャラクターを出せない',
    youWon: '🏆 ゲームに勝った！',
    cpuWon: 'CPUがゲームに勝った',
  },
  effect: {
    double: '攻撃×2',
    add: (amount) => `攻撃+${amount}`,
  },
  noItem: 'アイテムなし',
  cards: {
    'p-char-1': 'ナイト',
    'p-char-2': 'アーチャー',
    'p-char-3': 'ガーディアン',
    'p-char-4': 'ローグ',
    'p-char-5': 'バーバリアン',
    'p-char-6': 'メイジ',
    'c-char-1': 'センチネル',
    'c-char-2': 'ハントレス',
    'c-char-3': 'コロッサス',
    'c-char-4': 'アサシン',
    'c-char-5': 'バーサーカー',
    'c-char-6': 'ソーサレス',
    'p-item-1': 'ダブルエッジ',
    'p-item-2': '強化',
    'p-item-3': 'タリスマン',
    'c-item-1': 'フューリー',
    'c-item-2': 'ヴィガー',
    'c-item-3': 'アミュレット',
  },
  languageLabel: '言語',
};

export const translations: Record<Language, Translations> = { es, ja, en };
