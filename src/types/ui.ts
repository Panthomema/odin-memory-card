export type PokemonCardData = {
  name: string;
  spriteUrl: string;
  scale: number;
};

export type ModalAction = {
  label: string;
  onCommit: () => void;
  index: number;
};

export type NavigationIncrement = 1 | 0 | -1;

export type GameState = 'start' | 'playing' | 'end';
