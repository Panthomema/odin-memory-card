import { MAX_SPRITE_WIDTH, POKEMON_IDS } from '@/constants';
import type { PokemonData } from './types/api';
import type { PokemonCardData } from './types/ui';

// Uses Fisher-Yates algorithm
export function getRandomPokemonIds(count: number) {
  const pokemonIds = [...POKEMON_IDS];

  for (let i = pokemonIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pokemonIds[i], pokemonIds[j]] = [pokemonIds[j], pokemonIds[i]];
  }

  return pokemonIds.slice(0, count);
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
