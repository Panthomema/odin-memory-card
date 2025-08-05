export type PokemonCardData = {
  name: string;
  spriteUrl: string;
  scale: number;
};

export type ModalAction = {
  label: string;
  onCommit: () => void;
  index: ModalActionIndex;
};

export type ModalActionIndex = 0 | 1;

export type NavigationIncrement = 1 | -1;

export type GameState = 'start' | 'playing' | 'end';
