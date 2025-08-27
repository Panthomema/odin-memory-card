import styles from '@/App/App.module.css';
import defeatMusic from '@/assets/sounds/defeat.mp3';
import gameMusic from '@/assets/sounds/game.mp3';
import victoryMusic from '@/assets/sounds/victory.mp3';
import BackgroundMusic from '@/components/BackgroundMusic/BackgroundMusic';
import Game from '@/components/Game/Game';
import LostGameModal from '@/components/LostGameModal/LostGameModal';
import Scoreboard from '@/components/Scoreboard/Scoreboard';
import SfxToggleButton from '@/components/SfxToggleButton/SfxToggleButton';
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal';
import WonGameModal from '@/components/WonGameModal/WonGameModal';
import { generateGamePool } from '@/helpers/game';
import type { GameState, ModalAction } from '@/types/ui';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

function App() {
  const [sfxEnabled, setSfxEnabled] = useState(true);
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

  const toggleSfx = () => {
    setSfxEnabled((prev) => !prev);
  };

  const decideRoundResult = (pokemonId: number, ghostId: number) => {
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
  };

  return (
    <>
      <BackgroundMusic
        src={gameMusic}
        volume={0.8}
        playing={gameState === 'playing'}
        muted={!sfxEnabled}
      />
      <BackgroundMusic
        src={victoryMusic}
        volume={0.8}
        playing={gameState === 'won'}
        muted={!sfxEnabled}
      />
      <BackgroundMusic
        src={defeatMusic}
        volume={0.8}
        playing={gameState === 'lost'}
        muted={!sfxEnabled}
      />

      <AnimatePresence mode="wait">
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
      </AnimatePresence>
      {gameState === 'playing' && (
        <>
          <header className={styles.header}>
            <SfxToggleButton enabled={sfxEnabled} toggle={toggleSfx} />
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
      )}
    </>
  );
}

export default App;
