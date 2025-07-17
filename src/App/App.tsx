import Scoreboard from '@/components/Scoreboard/Scoreboard';
import styles from '@/App/App.module.css';
import CardGrid from '@/components/CardGrid/CardGrid';

function App() {
  return (
    <>
      <main className={styles.main}>{<CardGrid />}</main>
      <footer>
        <Scoreboard />
      </footer>
    </>
  );
}

export default App;
