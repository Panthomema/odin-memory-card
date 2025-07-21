import styles from '@/components/SfxToggleButton/SfxToggleButton.module.css';
import clsx from 'clsx';

function SfxToggleButton() {
  const imgName = 'sfx-on';

  return (
    <button className={clsx('nes-btn', styles.btn)}>
      <img
        src={`/icons/${imgName}.svg`}
        alt={imgName}
        className={styles.icon}
      />
    </button>
  );
}

export default SfxToggleButton;
