import Scoreboard from '@/components/Scoreboard/Scoreboard';
import styles from '@/App/App.module.css';

function App() {
  return (
    <>
      <main className={styles.main}>{/* <CardGrid /> */}</main>
      <footer>
        <Scoreboard />
      </footer>
    </>
  );
}

export default App;
