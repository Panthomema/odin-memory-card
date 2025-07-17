import styles from '@/components/Scoreboard/Scoreboard.module.css';
import clsx from 'clsx';

function Scoreboard() {
  return (
    <div className={clsx(styles.scoreboard, 'box')}>
      <div>Viewed: 0</div>
      <div>Captured: 0</div>
    </div>
  );
}

export default Scoreboard;
