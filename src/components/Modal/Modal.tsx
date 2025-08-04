import styles from '@/components/Modal/Modal.module.css';
import clsx from 'clsx';

type ModalProps = {
  title: string;
  imgName: string;
  isOpen: boolean;
  children: React.ReactNode;
};

function Modal({ isOpen, title, imgName, children }: ModalProps) {
  return isOpen ? (
    <div className={styles.overlay}>
      <div
        className={clsx(styles.modal, 'box')}
        role="dialog"
        aria-modal="true"
      >
        <div className={clsx('nes-text', styles.title)}>
          <img
            src={`/icons/${imgName}.svg`}
            alt={imgName}
            className={styles.icon}
          />
          <h1>{title}</h1>
          <img
            src={`/icons/${imgName}.svg`}
            alt={imgName}
            className={styles.icon}
          />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
