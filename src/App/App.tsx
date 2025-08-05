import styles from '@/App/App.module.css';
import CardGrid from '@/components/CardGrid/CardGrid';
import Scoreboard from '@/components/Scoreboard/Scoreboard';
import SfxToggleButton from '@/components/SfxToggleButton/SfxToggleButton';
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal';
import type { GameState } from '@/types/ui';
import { useState } from 'react';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
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
              index: 0,
            },
            {
              label: 'RESET',
              onCommit: () => {
                window.location.reload();
              },
              index: 1,
            },
          ]}
        />
      )}
      <header className={styles.header}>
        <SfxToggleButton />
      </header>
      <main className={styles.main}>
        <CardGrid />
      </main>
      <footer>
        <Scoreboard />
      </footer>
    </>
  );
}

export default App;
