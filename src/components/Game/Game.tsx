import CardGrid from '@/components/CardGrid/CardGrid';
import ErrorModal from '@/components/ErrorModal/ErrorModal';
import Loading from '@/components/Loading/Loading';
import { GHOST_ID } from '@/constants';
import { getPokemonCards } from '@/helpers/api';
import { generateRoundPool } from '@/helpers/game';

import type { ModalAction, PokemonCardData, RoundState } from '@/types/ui';
import { AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

type GameProps = {
  gamePool: number[];
  viewedPokemonIds: number[];
  onPokemonView: (pokemonId: number, ghostId: number) => void;
};

function Game({ gamePool, viewedPokemonIds, onPokemonView }: GameProps) {
  const [cardData, setCardData] = useState<PokemonCardData[]>([]);
  const [roundState, setRoundState] = useState<RoundState>('loading');

  const RETRY_ACTION: ModalAction = {
    label: 'RETRY',
    onCommit: () => {
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
      setRoundState('loading');
      const ids = generateRoundPool(gamePool, viewedPokemonIds);
      const pokemonCardData = await getPokemonCards(ids);

      setCardData(pokemonCardData);
      setRoundState('ready');
    } catch (err) {
      console.error(err);
      setRoundState('error');
    }
  }, [gamePool, viewedPokemonIds]);

  const handleCardCommit = (id: number) => {
    onPokemonView(id, GHOST_ID);
  };

  useEffect(() => {
    setupRound(); // On component mount
  }, [setupRound]);

  return (
    <>
      <AnimatePresence mode="wait">
        {roundState === 'error' && (
          <ErrorModal actions={[RETRY_ACTION, RESET_ACTION]} />
        )}
      </AnimatePresence>
      {roundState === 'loading' && <Loading />}
      {roundState === 'ready' && (
        <CardGrid cards={cardData} onCardCommit={handleCardCommit} />
      )}
    </>
  );
}

export default Game;
