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
    winnerBadge: string;
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
    winnerBadge: 'Ganador',
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
    'p-char-1': 'Ojo ~Blanco~',
    'p-char-2': 'Ojo ~Negro~',
    'p-char-3': 'Mano',
    'p-char-4': 'Zapato',
    'p-char-5': 'Zapato (Peter Pan)',
    'p-char-6': 'Extraterrestre',
    'c-char-1': 'Famicom',
    'c-char-2': 'MSX2+',
    'c-char-3': 'Game Boy',
    'c-char-4': 'Super Nintendo',
    'c-char-5': 'DS',
    'c-char-6': 'La de los recreativos',
    'p-item-1': 'En racha',
    'p-item-2': 'Otra vez',
    'p-item-3': 'Aliado',
    'c-item-1': 'SuFami Turbo',
    'c-item-2': 'WarioWare: Twisted!',
    'c-item-3': 'Intercambio Pokémon',
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
    winnerBadge: 'Winner',
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
    'p-char-1': 'Eye ~White~',
    'p-char-2': 'Eye ~Black~',
    'p-char-3': 'Hand',
    'p-char-4': 'Shoe',
    'p-char-5': 'Shoe (Peter Pan)',
    'p-char-6': 'Alien',
    'c-char-1': 'Famicom',
    'c-char-2': 'MSX2+',
    'c-char-3': 'Game Boy',
    'c-char-4': 'Super Nintendo',
    'c-char-5': 'DS',
    'c-char-6': 'The arcade one',
    'p-item-1': 'Top Form',
    'p-item-2': 'Once More',
    'p-item-3': 'Ally',
    'c-item-1': 'SuFami Turbo',
    'c-item-2': 'WarioWare: Twisted!',
    'c-item-3': 'Pokémon Trade',
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
    winnerBadge: '勝者',
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
    'p-char-1': '目〜ホワイト〜',
    'p-char-2': '目〜ブラック〜',
    'p-char-3': 'ハンド',
    'p-char-4': 'くつ',
    'p-char-5': 'くつ（ピーターパン）',
    'p-char-6': 'うちゅうじん',
    'c-char-1': 'ファミコン',
    'c-char-2': 'MSX2+',
    'c-char-3': 'ゲームボーイ',
    'c-char-4': 'スーファミ',
    'c-char-5': 'DS',
    'c-char-6': 'ゲーセンのやつ',
    'p-item-1': 'ぜっこーちょー',
    'p-item-2': 'もう一度',
    'p-item-3': '仲間',
    'c-item-1': 'スーファミターボ',
    'c-item-2': 'まわるメイドインワリオ',
    'c-item-3': 'ポケモン交換',
  },
  languageLabel: '言語',
};

export const translations: Record<Language, Translations> = { es, ja, en };
