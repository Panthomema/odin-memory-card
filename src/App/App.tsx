import styles from '@/App/App.module.css';
import Game from '@/components/Game/Game';
import Scoreboard from '@/components/Scoreboard/Scoreboard';
import SfxToggleButton from '@/components/SfxToggleButton/SfxToggleButton';
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal';
import type { GameState } from '@/types/ui';
import { useState } from 'react';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [viewedPokemonIds, setViewedPokemonIds] = useState<number[]>([]);

  function decideRoundResult(pokemonId: number, ghostId: number) {
    if (viewedPokemonIds.includes(pokemonId)) {
      if (pokemonId === ghostId) {
        setGameState('won');
      } else {
        setGameState('lost');
      }
    } else {
      setViewedPokemonIds((prev) => [...prev, pokemonId]);
    }
  }

  if (gameState === 'lost') alert('YOU LOSE');
  if (gameState === 'won') alert('YOU WIN');

  return (
    <>
      {gameState === 'start' && (
        <WelcomeModal
          actions={[
            {
              label: 'PLAY',
              onCommit: () => {
                setGameState('playing');
              },
            },
            {
              label: 'RESET',
              onCommit: () => {
                window.location.reload();
              },
            },
          ]}
        />
      )}
      <header className={styles.header}>
        <SfxToggleButton />
      </header>
      <main className={styles.main}>
        <Game
          viewedPokemonIds={viewedPokemonIds}
          onPokemonView={decideRoundResult}
        />
      </main>
      <footer>
        <Scoreboard viewedPokemon={viewedPokemonIds.length} />
      </footer>
    </>
  );
}

export default App;
