import styles from '@/App/App.module.css';
import CardGrid from '@/components/CardGrid/CardGrid';
import Scoreboard from '@/components/Scoreboard/Scoreboard';
import SfxToggleButton from '@/components/SfxToggleButton/SfxToggleButton';

function App() {
  return (
    <>
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
