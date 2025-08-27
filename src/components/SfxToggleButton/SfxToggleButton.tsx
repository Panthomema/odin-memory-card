import sfxOffIcon from '@/assets/icons/sfx-off.svg';
import sfxOnIcon from '@/assets/icons/sfx-on.svg';
import styles from '@/components/SfxToggleButton/SfxToggleButton.module.css';
import clsx from 'clsx';

type SfxToggleButtonProps = {
  enabled: boolean;
  toggle: () => void;
};

function SfxToggleButton({ enabled, toggle }: SfxToggleButtonProps) {
  return (
    <button
      className={clsx('nes-btn', styles.btn)}
      onClick={toggle}
      aria-label={enabled ? 'Disable sound effects' : 'Enable sound effects'}
    >
      <img
        src={enabled ? sfxOnIcon : sfxOffIcon}
        alt={enabled ? 'Disable sound effects' : 'Enable sound effects'}
        className={styles.icon}
      />
    </button>
  );
}

export default SfxToggleButton;
