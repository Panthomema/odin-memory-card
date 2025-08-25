import { MAX_SPRITE_WIDTH } from '@/constants';
import { getCachedCard, setCachedCard } from '@/helpers/cache';
import type { PokemonData } from '@/types/api';
import type { PokemonCardData } from '@/types/ui';

export async function getPokemonCards(
  ids: number[],
): Promise<PokemonCardData[]> {
  return Promise.all(
    ids.map(async (id) => {
      const cached = getCachedCard(id);
      if (cached) return cached;

      try {
        const res = await fetchWithTimeout(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
          15000,
        );

        if (!res.ok) throw new Error(`Failed to fetch Pokémon ID ${id}`);

        const data: PokemonData = await res.json();
        const { name, sprites } = data;

        const spriteUrl =
          data.sprites.versions?.['generation-i'].yellow.front_default ??
          sprites.versions?.['generation-i']['red-blue'].front_default;

        if (!spriteUrl) throw new Error(`Unavailable sprite for ${name}`);

        const scale = await getSpriteScale(spriteUrl, MAX_SPRITE_WIDTH);

        const cardData = {
          id,
          name,
          spriteUrl,
          scale,
        };

        setCachedCard(id, cardData);

        return cardData;
      } catch (err) {
        console.error(err);
        throw new Error(`Error building card for Pokémon ID ${id}`);
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
