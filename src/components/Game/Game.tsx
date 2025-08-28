import CardGrid from '@/components/CardGrid/CardGrid';
import ErrorModal from '@/components/ErrorModal/ErrorModal';
import Loading from '@/components/Loading/Loading';
import { GHOST_ID } from '@/constants';
import SfxContext from '@/contexts/SfxContext';
import { getPokemonCards } from '@/helpers/api';
import { generateRoundPool } from '@/helpers/game';
import type { ModalAction, PokemonCardData, RoundState } from '@/types/ui';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useContext, useEffect, useState } from 'react';

type GameProps = {
  gamePool: number[];
  viewedPokemonIds: number[];
  onPokemonView: (pokemonId: number, ghostId: number) => void;
};

function Game({ gamePool, viewedPokemonIds, onPokemonView }: GameProps) {
  const [cardsData, setCardsData] = useState<PokemonCardData[]>([]);
  const [roundState, setRoundState] = useState<RoundState>('loading');
  const { playActionSfx, playBattlecrySfx, preloadBattlecries } =
    useContext(SfxContext);

  const RETRY_ACTION: ModalAction = {
    label: 'RETRY',
    onCommit: () => {
      playActionSfx();
      setupRound();
    },
  };

  const RESET_ACTION: ModalAction = {
    label: 'RESET',
    onCommit: () => {
      playActionSfx();
      window.location.reload();
    },
  };

  const setupRound = useCallback(async () => {
    try {
      setRoundState('loading');
      const ids = generateRoundPool(gamePool, viewedPokemonIds);
      const pokemonCardData = await getPokemonCards(ids);
      preloadBattlecries(ids);

      setCardsData(pokemonCardData);
      setRoundState('ready');
    } catch (err) {
      console.error(err);
      setRoundState('error');
    }
  }, [gamePool, viewedPokemonIds, preloadBattlecries]);

  const handleCardCommit = (id: number) => {
    playBattlecrySfx(id);
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
            <CardGrid cardsData={cardsData} onCardCommit={handleCardCommit} />
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
