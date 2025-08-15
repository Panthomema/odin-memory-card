import sfxOnIcon from '@/assets/icons/sfx-on.svg';
import styles from '@/components/SfxToggleButton/SfxToggleButton.module.css';
import clsx from 'clsx';
/* import sfxOffIcon from '@/assets/icons/sfx-off.svg'; */

function SfxToggleButton() {
  const imgName = 'Sfx On';

  return (
    <button className={clsx('nes-btn', styles.btn)}>
      <img src={sfxOnIcon} alt={imgName} className={styles.icon} />
    </button>
  );
}

export default SfxToggleButton;
