import {
  GHOST_ID,
  MAX_SPRITE_WIDTH,
  POKEMON_PER_GAME,
  POKEMON_PER_ROUND,
  REST_IDS,
  TOWER_IDS,
} from '@/constants';
import type { PokemonData } from './types/api';
import type { PokemonCardData } from './types/ui';

// Game & round pool generation
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

// Pokemon data fetching
export async function fetchPokemonData(ids: number[]): Promise<PokemonData[]> {
  const responses = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetchWithTimeout(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
          15000,
        );
        console.log(`RESPONSE FOR ${id}:`, res);
        if (!res.ok) throw new Error(`Failed to fetch Pokémon ID ${id}`);
        return res.json();
      } catch (err) {
        console.error(err);
        throw new Error('Error obtaining pokémon data');
      }
    }),
  );

  return responses;
}

async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    clearTimeout(id);
    throw err;
  }
}

// Card data building & image preloading
export async function buildPokemonCardData(
  data: PokemonData[],
): Promise<PokemonCardData[]> {
  return Promise.all(
    data.map(async (pokemonData) => {
      try {
        const spriteUrl =
          pokemonData.sprites.versions?.['generation-i'].yellow.front_default ??
          pokemonData.sprites.versions?.['generation-i']['red-blue']
            .front_default;

        if (!spriteUrl)
          throw new Error(`Unavailable sprite for ${pokemonData.name}`);

        const scale = await getSpriteScale(spriteUrl, MAX_SPRITE_WIDTH);

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          spriteUrl,
          scale,
        };
      } catch (err) {
        console.error(err);
        throw new Error('Error building card data');
      }
    }),
  );
}

async function getSpriteScale(
  spriteUrl: string,
  maxSpriteWidth: number,
): Promise<number> {
  const naturalWidth = await new Promise<number>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth);
    img.onerror = () =>
      reject(new Error(`Failed to preload image: ${spriteUrl}`));
    img.src = spriteUrl;
  });

  return (naturalWidth / maxSpriteWidth) * 100;
}
