import type { PokemonData } from '@/types/api';

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
