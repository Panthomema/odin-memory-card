import CardGrid from '@/components/CardGrid/CardGrid';
import ErrorModal from '@/components/ErrorModal/ErrorModal';
import Loading from '@/components/Loading/Loading';
import { GHOST_ID } from '@/constants';
import {
  buildPokemonCardData,
  fetchPokemonData,
  generateRoundPool,
} from '@/helpers';
import type { ModalAction, PokemonCardData } from '@/types/ui';
import { useCallback, useEffect, useState } from 'react';

type GameProps = {
  gamePool: number[];
  viewedPokemonIds: number[];
  onPokemonView: (pokemonId: number, ghostId: number) => void;
};

function Game({ gamePool, viewedPokemonIds, onPokemonView }: GameProps) {
  const [cardData, setCardData] = useState<PokemonCardData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const RETRY_ACTION: ModalAction = {
    label: 'RETRY',
    onCommit: () => {
      console.log('retry');
      setError(false);
      setupRound();
    },
  };

  const RESET_ACTION: ModalAction = {
    label: 'RESET',
    onCommit: () => {
      window.location.reload();
    },
  };

  const setupRound = useCallback(async () => {
    try {
      setIsLoaded(false);
      const ids = generateRoundPool(gamePool, viewedPokemonIds);
      console.log(ids);
      const fetchedData = await fetchPokemonData(ids);
      const pokemonCardData = await buildPokemonCardData(fetchedData);

      setCardData(pokemonCardData);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
      setError(true);
      /* setIsLoaded(true); */
    }
  }, [gamePool, viewedPokemonIds]);

  const handleCardCommit = (id: number) => {
    onPokemonView(id, GHOST_ID);
  };

  useEffect(() => {
    setupRound(); // On component mount
  }, [setupRound]);

  if (error) return <ErrorModal actions={[RETRY_ACTION, RESET_ACTION]} />;

  if (!isLoaded) return <Loading />;

  return <CardGrid cards={cardData} onCardCommit={handleCardCommit} />;
}

export default Game;
