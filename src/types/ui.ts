export type PokemonCardData = {
  id: number;
  name: string;
  spriteUrl: string;
  scale: number;
};

export type ModalIcon = {
  src: string;
  name: string;
};

export type ModalAction = {
  label: string;
  onCommit: () => void;
};

export type NavigationIncrement = 1 | 0 | -1;

export type GameState = 'start' | 'playing' | 'won' | 'lost';
