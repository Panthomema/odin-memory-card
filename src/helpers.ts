import {
  GHOST_ID,
  MAX_SPRITE_WIDTH,
  POKEMON_IDS,
  POKEMON_PER_ROUND,
} from '@/constants';
import type { PokemonData } from './types/api';
import type { PokemonCardData } from './types/ui';

export function getPokemonIds(viewedIds: number[]) {
  const candidateIds = pickRandomIds(POKEMON_PER_ROUND, POKEMON_IDS);
  const containsUnviewed = candidateIds.some((id) => !viewedIds.includes(id));
  const containsGhost = candidateIds.includes(GHOST_ID);

  console.log('CANDIDATE IDS', candidateIds);

  if (containsUnviewed || containsGhost) return candidateIds;

  const eligibleIds = [
    ...new Set([
      ...POKEMON_IDS.filter((id) => !viewedIds.includes(id)),
      GHOST_ID,
    ]),
  ];

  console.log('SELECTION FORCED', eligibleIds);

  const injectedId = pickRandomIds(1, eligibleIds)[0];

  const replaceIndex = Math.floor(Math.random() * candidateIds.length);
  candidateIds[replaceIndex] = injectedId;

  return candidateIds;
}

// Uses Fisher-Yates algorithm
export function pickRandomIds(count: number, possibleIds: number[]) {
  const shuffledIds = [...possibleIds];

  for (let i = shuffledIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
  }

  return shuffledIds.slice(0, count);
}

export async function fetchPokemonData(ids: number[]): Promise<PokemonData[]> {
  const responses = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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

export async function buildPokemonCardData(
  data: PokemonData[],
): Promise<PokemonCardData[]> {
  return Promise.all(
    data.map(async (pokemonData) => {
      try {
        const spriteUrl =
          pokemonData.sprites.versions?.['generation-i'].yellow.front_default ??
          pokemonData.sprites.front_default;

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
  const naturalWidth = await new Promise<number>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth);
    img.src = spriteUrl;
  });

  return (naturalWidth / maxSpriteWidth) * 100;
}
