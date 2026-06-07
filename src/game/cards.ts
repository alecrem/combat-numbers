// Datos de las cartas reales (las que tenemos en papel). Cada personaje suma
// 500 o 1000 entre sus 3 poderes; cada jugador tiene 2 cartas de 1000 y suma
// 4000 en total. Se verifica con un test (ver spec.md).

import type { CharacterCard, ItemCard } from "./types";

export const PLAYER_CHARACTERS: CharacterCard[] = [
  {
    id: "p-char-1",
    name: "目〜ホワイト〜",
    power: { low: 200, mid: 200, high: 100 },
  },
  {
    id: "p-char-2",
    name: "目〜ブラック〜",
    power: { low: 100, mid: 200, high: 200 },
  },
  {
    id: "p-char-3",
    name: "ハンド",
    power: { low: 50, mid: 200, high: 250 },
  },
  { id: "p-char-4", name: "くつ", power: { low: 0, mid: 0, high: 500 } },
  {
    id: "p-char-5",
    name: "くつ（ピーターパン）",
    power: { low: 500, mid: 250, high: 250 },
  },
  {
    id: "p-char-6",
    name: "うちゅうじん",
    power: { low: 250, mid: 350, high: 400 },
  },
];

export const PLAYER_ITEMS: ItemCard[] = [
  { id: "p-item-1", name: "ぜっこーちょー", effect: { kind: "double" } },
  { id: "p-item-2", name: "もう一度", effect: { kind: "add", amount: 100 } },
  { id: "p-item-3", name: "仲間", effect: { kind: "add", amount: 60 } },
];

export const CPU_CHARACTERS: CharacterCard[] = [
  {
    id: "c-char-1",
    name: "ファミコン",
    power: { low: 0, mid: 250, high: 250 },
  },
  {
    id: "c-char-2",
    name: "MSX2+",
    power: { low: 200, mid: 300, high: 0 },
  },
  {
    id: "c-char-3",
    name: "ゲームボーイ",
    power: { low: 50, mid: 100, high: 350 },
  },
  {
    id: "c-char-4",
    name: "スーファミ",
    power: { low: 50, mid: 350, high: 600 },
  },
  { id: "c-char-5", name: "DS", power: { low: 250, mid: 0, high: 250 } },
  {
    id: "c-char-6",
    name: "ゲーセンのやつ",
    power: { low: 300, mid: 400, high: 300 },
  },
];

export const CPU_ITEMS: ItemCard[] = [
  { id: "c-item-1", name: "スーファミターボ", effect: { kind: "double" } },
  {
    id: "c-item-2",
    name: "まわるメイドインワリオ",
    effect: { kind: "add", amount: 100 },
  },
  { id: "c-item-3", name: "ポケモン交換", effect: { kind: "add", amount: 60 } },
];
