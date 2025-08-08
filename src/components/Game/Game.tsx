import {
  buildPokemonCardData,
  fetchPokemonData,
  getPokemonIds,
} from '@/helpers';
import type { PokemonCardData } from '@/types/ui';
import { useCallback, useEffect, useState } from 'react';
import CardGrid from '../CardGrid/CardGrid';
import { GHOST_ID } from '@/constants';

type GameProps = {
  viewedPokemonIds: number[];
  onPokemonView: (pokemonId: number, ghostId: number) => void;
};

function Game({ viewedPokemonIds, onPokemonView }: GameProps) {
  const [cardData, setCardData] = useState<PokemonCardData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const setupRound = useCallback(async () => {
    try {
      setIsLoaded(false);
      const ids = getPokemonIds(viewedPokemonIds);
      const fetchedData = await fetchPokemonData(ids);
      const pokemonCardData = await buildPokemonCardData(fetchedData);

      setCardData(pokemonCardData);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [viewedPokemonIds]);

  const handleCardCommit = (id: number) => {
    onPokemonView(id, GHOST_ID);
  };

  useEffect(() => {
    setupRound(); // On component mount
  }, [setupRound]);

  if (error) {
    return <p className="nes-text is-error">Error Loading Pokémon</p>;
  }

  if (!isLoaded) {
    return <p className="nes-text is-disabled">Loading Pokémon...</p>;
  }

  return <CardGrid cards={cardData} onCardCommit={handleCardCommit} />;
}

export default Game;
