import { MAX_SPRITE_WIDTH } from '@/constants';
import type { PokemonData } from '@/types/api';
import type { PokemonCardData } from '@/types/ui';

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
