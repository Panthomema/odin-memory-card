import type { PokemonCardData } from '@/types/ui';

const pokemonCardCache = new Map<number, PokemonCardData>();

export function getCachedCard(id: number) {
  return pokemonCardCache.get(id);
}

export function setCachedCard(id: number, data: PokemonCardData) {
  pokemonCardCache.set(id, data);
}
