import type { PokemonData } from '@/types/api';
import type { PokemonCardData } from '@/types/ui';

const pokemonDataCache = new Map<number, PokemonData>();

export function getCachedPokemon(id: number) {
  return pokemonDataCache.get(id);
}

export function setCachedPokemon(id: number, data: PokemonData) {
  pokemonDataCache.set(id, data);
}

const pokemonCardCache = new Map<number, PokemonCardData>();

export function getCachedCard(id: number) {
  return pokemonCardCache.get(id);
}

export function setCachedCard(id: number, card: PokemonCardData) {
  pokemonCardCache.set(id, card);
}
