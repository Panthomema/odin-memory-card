import { POKEMON_PER_ROUND } from '@/constants';
import {
  buildPokemonCardData,
  fetchPokemonData,
  getRandomPokemonIds,
} from '@/helpers';
import type { PokemonCardData } from '@/types/ui';
import { useEffect, useState } from 'react';
import CardGrid from '../CardGrid/CardGrid';

function Game() {
  const [cardData, setCardData] = useState<PokemonCardData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const setupGame = async () => {
      try {
        const ids = getRandomPokemonIds(POKEMON_PER_ROUND);
        const fetchedData = await fetchPokemonData(ids);
        const pokemonCardData = await buildPokemonCardData(fetchedData);

        setCardData(pokemonCardData);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    setupGame();
  }, []);

  if (error) {
    return <p className="nes-text is-error">Error Loading Pokémon</p>;
  }

  if (!isLoaded) {
    return <p className="nes-text is-disabled">Loading Pokémon...</p>;
  }

  return <CardGrid cards={cardData} />;
}

export default Game;
