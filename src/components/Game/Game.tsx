import CardGrid from '@/components/CardGrid/CardGrid';
import ErrorModal from '@/components/ErrorModal/ErrorModal';
import Loading from '@/components/Loading/Loading';
import { GHOST_ID } from '@/constants';
import { getPokemonCards } from '@/helpers/api';
import { generateRoundPool } from '@/helpers/game';
import type { ModalAction, PokemonCardData, RoundState } from '@/types/ui';
import { AnimatePresence, motion } from 'motion/react';
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
        {roundState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Loading />
          </motion.div>
        )}

        {roundState === 'ready' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <CardGrid cards={cardData} onCardCommit={handleCardCommit} />
          </motion.div>
        )}

        {roundState === 'error' && (
          <ErrorModal actions={[RETRY_ACTION, RESET_ACTION]} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Game;
