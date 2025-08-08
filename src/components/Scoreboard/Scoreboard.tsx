import styles from '@/components/Scoreboard/Scoreboard.module.css';
import clsx from 'clsx';

type ScoreboardProps = {
  viewedPokemon: number;
  capturedGhosts: number;
};

function Scoreboard({ viewedPokemon, capturedGhosts }: ScoreboardProps) {
  return (
    <div className={clsx(styles.scoreboard, 'box')}>
      <div>Viewed: {viewedPokemon}</div>
      <div>Captured: {capturedGhosts}</div>
    </div>
  );
}

export default Scoreboard;
