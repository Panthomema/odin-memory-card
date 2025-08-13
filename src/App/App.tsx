import styles from '@/App/App.module.css';
import Game from '@/components/Game/Game';
import LostGameModal from '@/components/LostGameModal/LostGameModal';
import Scoreboard from '@/components/Scoreboard/Scoreboard';
import SfxToggleButton from '@/components/SfxToggleButton/SfxToggleButton';
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal';
import WonGameModal from '@/components/WonGameModal/WonGameModal';
import { generateGamePool } from '@/helpers';
import type { GameState, ModalAction } from '@/types/ui';
import { useState } from 'react';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gamePool, setGamePool] = useState<number[]>(generateGamePool());
  const [viewedPokemonIds, setViewedPokemonIds] = useState<number[]>([]);
  const [capturedGhosts, setCapturedGhosts] = useState(0);

  const PLAY_ACTION: ModalAction = {
    label: 'PLAY',
    onCommit: () => {
      setGameState('playing');
    },
  };

  const PLAY_AGAIN_ACTION: ModalAction = {
    label: 'PLAY AGAIN',
    onCommit: () => {
      setGameState('playing');
      setViewedPokemonIds([]);
      setGamePool(generateGamePool());
    },
  };

  const RESET_ACTION: ModalAction = {
    label: 'RESET',
    onCommit: () => {
      window.location.reload();
    },
  };

  function decideRoundResult(pokemonId: number, ghostId: number) {
    if (viewedPokemonIds.includes(pokemonId)) {
      if (pokemonId === ghostId) {
        setGameState('won');
        setCapturedGhosts((prev) => prev + 1);
      } else {
        setGameState('lost');
      }
    } else {
      setViewedPokemonIds((prev) => [...prev, pokemonId]);
    }
  }

  return (
    <>
      {gameState === 'start' && (
        <WelcomeModal actions={[PLAY_ACTION, RESET_ACTION]} />
      )}
      {gameState === 'lost' && (
        <LostGameModal
          actions={[PLAY_AGAIN_ACTION, RESET_ACTION]}
          viewedPokemon={viewedPokemonIds.length}
        />
      )}
      {gameState === 'won' && (
        <WonGameModal
          actions={[PLAY_AGAIN_ACTION, RESET_ACTION]}
          viewedPokemon={viewedPokemonIds.length}
        />
      )}
      <header className={styles.header}>
        <SfxToggleButton />
      </header>
      <main className={styles.main}>
        <Game
          gamePool={gamePool}
          viewedPokemonIds={viewedPokemonIds}
          onPokemonView={decideRoundResult}
        />
      </main>
      <footer>
        <Scoreboard
          viewedPokemon={viewedPokemonIds.length}
          capturedGhosts={capturedGhosts}
        />
      </footer>
    </>
  );
}

export default App;
