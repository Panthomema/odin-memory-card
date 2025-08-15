import ActionRadio from '@/components/ActionRadio/ActionRadio';
import styles from '@/components/Modal/Modal.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { ModalAction } from '@/types/ui';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

type ModalProps = {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  actions: [ModalAction, ModalAction];
};

function Modal({ title, Icon, children, actions }: ModalProps) {
  const { selectedIndex, setHoveredIndex } = useKeyboardNavigation({
    itemCount: actions.length,
    onEnter: (index) => actions[index].onCommit(),
  });

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
          <Icon className={styles.icon} />
          <h1>{title}</h1>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <ActionRadio
              key={index}
              label={action.label}
              checked={selectedIndex === index}
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
