import ActionRadio from '@/components/ActionRadio/ActionRadio';
import styles from '@/components/Modal/Modal.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { ModalAction } from '@/types/ui';
import clsx from 'clsx';
import { motion } from 'motion/react';
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
    <>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <motion.div
        className={clsx(styles.modal, 'box')}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={modalRef}
        initial={{ scale: 0.7, x: '-50%', y: '-50%', opacity: 0 }}
        animate={{ scale: 1, x: '-50%', y: '-50%', opacity: 1 }}
        exit={{ scale: 0.7, x: '-50%', y: '-50%', opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
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
      </motion.div>
    </>
  );
}

export default Modal;
