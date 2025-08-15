import {
  GHOST_ID,
  POKEMON_PER_GAME,
  POKEMON_PER_ROUND,
  REST_IDS,
  TOWER_IDS,
} from '@/constants';

export function generateGamePool() {
  return [
    ...TOWER_IDS,
    ...pickRandomIds(REST_IDS, POKEMON_PER_GAME - TOWER_IDS.length),
  ];
}

export function generateRoundPool(gamePool: number[], viewedIds: number[]) {
  const roundPool = pickRandomIds(gamePool, POKEMON_PER_ROUND);
  const containsUnviewed = roundPool.some((id) => !viewedIds.includes(id));
  const containsGhost = roundPool.includes(GHOST_ID);

  if (containsUnviewed || containsGhost) return roundPool;

  const eligiblePool = [
    ...new Set([...gamePool.filter((id) => !viewedIds.includes(id)), GHOST_ID]),
  ];

  const injectedId = pickRandomIds(eligiblePool, 1)[0];

  const replaceIndex = Math.floor(Math.random() * roundPool.length);
  roundPool[replaceIndex] = injectedId;

  return roundPool;
}

// Uses Fisher-Yates algorithm
function pickRandomIds(possibleIds: number[], count: number) {
  const pool = [...possibleIds];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}
