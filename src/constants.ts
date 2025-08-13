export const MAX_SPRITE_WIDTH = 56;

export const POKEMON_PER_GAME = 36;

export const POKEMON_PER_ROUND = 6;

export const GHOST_ID = 105;

export const TOWER_IDS = [92, 93, 94, 104, 105];

export const REST_IDS = Array.from({ length: 151 }, (_, i) => i + 1).filter(
  (id) => !TOWER_IDS.includes(id),
);
