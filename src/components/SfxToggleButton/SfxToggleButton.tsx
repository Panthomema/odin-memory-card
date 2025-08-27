import sfxOffIcon from '@/assets/icons/sfx-off.svg';
import sfxOnIcon from '@/assets/icons/sfx-on.svg';
import styles from '@/components/SfxToggleButton/SfxToggleButton.module.css';
import SfxContext from '@/contexts/SfxContext';
import clsx from 'clsx';
import { useContext } from 'react';

function SfxToggleButton() {
  const { sfxEnabled, toggleSfx, playActionSfx } = useContext(SfxContext);

  const handleAction = () => {
    playActionSfx();
    toggleSfx();
  };

  return (
    <button
      className={clsx('nes-btn', styles.btn)}
      onClick={handleAction}
      aria-label={sfxEnabled ? 'Disable sound effects' : 'Enable sound effects'}
    >
      <img
        src={sfxEnabled ? sfxOnIcon : sfxOffIcon}
        alt={sfxEnabled ? 'Disable sound effects' : 'Enable sound effects'}
        className={styles.icon}
      />
    </button>
  );
}

export default SfxToggleButton;
