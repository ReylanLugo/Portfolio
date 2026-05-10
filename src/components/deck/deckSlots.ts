export type DeckSlotOffset = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

export const DECK_SLOT_OFFSETS: DeckSlotOffset[] = [
  { x: 38, y: 0, rotate: 10, scale: 1 },
  { x: 18, y: -2, rotate: -2, scale: 0.97 },
  { x: 0, y: 6, rotate: -14, scale: 0.94 },
  { x: -18, y: 18, rotate: -26, scale: 0.9 },
];

export const DECK_CYCLE_MS = 3500;
