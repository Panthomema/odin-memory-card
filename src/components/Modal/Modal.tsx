import ActionRadio from '@/components/ActionRadio/ActionRadio';
import styles from '@/components/Modal/Modal.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { ModalAction } from '@/types/ui';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type ModalProps = {
  title: string;
  imgName: string;
  children: React.ReactNode;
  actions: [ModalAction, ModalAction];
};

function Modal({ title, imgName, children, actions }: ModalProps) {
  const selectedIndex = useKeyboardNavigation({
    itemCount: actions.length,
    onEnter: (index) => actions[index].onCommit(),
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayedIndex = hoveredIndex ?? selectedIndex;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus(); // Focus the container to prevent radio problems
  }, []);

  return (
    <div className={styles.overlay}>
      <div
        className={clsx(styles.modal, 'box')}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={modalRef}
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
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <ActionRadio
              key={index}
              label={action.label}
              checked={displayedIndex === index}
              onClick={action.onCommit}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
