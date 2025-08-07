import styles from '@/components/Scoreboard/Scoreboard.module.css';
import clsx from 'clsx';

type ScoreboardProps = {
  viewedPokemon: number;
};

function Scoreboard({ viewedPokemon }: ScoreboardProps) {
  return (
    <div className={clsx(styles.scoreboard, 'box')}>
      <div>Viewed: {viewedPokemon}</div>
      <div>Captured: 0</div>
    </div>
  );
}

export default Scoreboard;
