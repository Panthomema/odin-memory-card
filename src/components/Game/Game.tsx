import {
  buildPokemonCardData,
  fetchPokemonData,
  getPokemonIds,
} from '@/helpers';
import type { ModalAction, PokemonCardData } from '@/types/ui';
import { useCallback, useEffect, useState } from 'react';
import CardGrid from '@/components/CardGrid/CardGrid';
import { GHOST_ID, RESET_ACTION } from '@/constants';
import ErrorModal from '@/components/ErrorModal/ErrorModal';

type GameProps = {
  gamePool: number[];
  viewedPokemonIds: number[];
  onPokemonView: (pokemonId: number, ghostId: number) => void;
};

function Game({ gamePool, viewedPokemonIds, onPokemonView }: GameProps) {
  const [cardData, setCardData] = useState<PokemonCardData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(true);

  const RETRY_ACTION: ModalAction = {
    label: 'RETRY',
    onCommit: () => {},
  };

  const setupRound = useCallback(async () => {
    try {
      setIsLoaded(false);
      const ids = getPokemonIds(gamePool, viewedPokemonIds);
      const fetchedData = await fetchPokemonData(ids);
      const pokemonCardData = await buildPokemonCardData(fetchedData);

      setCardData(pokemonCardData);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [gamePool, viewedPokemonIds]);

  const handleCardCommit = (id: number) => {
    onPokemonView(id, GHOST_ID);
  };

  useEffect(() => {
    setupRound(); // On component mount
  }, [setupRound]);

  if (error) return <ErrorModal actions={[RETRY_ACTION, RESET_ACTION]} />;

  if (!isLoaded) {
    return <p className="nes-text is-disabled">Loading Pokémon...</p>;
  }

  return <CardGrid cards={cardData} onCardCommit={handleCardCommit} />;
}

export default Game;
