import styles from '@/components/Scoreboard/Scoreboard.module.css';
import clsx from 'clsx';

function Scoreboard() {
  return (
    <div className={clsx(styles.scoreboard, 'modal')}>
      <div>Score: 0</div>
      <div>Best Score: 0</div>
    </div>
  );
}

export default Scoreboard;
