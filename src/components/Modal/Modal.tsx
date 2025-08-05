import styles from '@/components/Modal/Modal.module.css';
import type {
  ModalAction,
  ModalActionIndex,
  NavigationIncrement,
} from '@/types/ui';
import clsx from 'clsx';
import { useRef, useEffect, useState } from 'react';

type ModalProps = {
  title: string;
  imgName: string;
  children: React.ReactNode;
  actions: [ModalAction, ModalAction];
};

function Modal({ title, imgName, children, actions }: ModalProps) {
  const [selectedActionIndex, setSelectedActionIndex] =
    useState<ModalActionIndex>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayedIndex = hoveredIndex ?? selectedActionIndex;

  const handleNavigate = (increment: NavigationIncrement) => {
    setSelectedActionIndex((prev) => {
      const newIndex = prev + increment;
      if (newIndex === 0 || newIndex === 1) return newIndex;
      return prev;
    });
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus(); // Enfoca el contenedor al abrir
  }, []);

  useEffect(() => {
    const handleEnter = () => {
      actions[selectedActionIndex].do();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleNavigate(-1);
      else if (e.key === 'ArrowRight') handleNavigate(1);
      else if (e.key === 'Enter') handleEnter();
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [actions, selectedActionIndex]);

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
              onClick={action.do}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ActionRadioProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function ActionRadio({
  label,
  checked,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ActionRadioProps) {
  return (
    <label onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <input
        type="radio"
        className="nes-radio"
        name="action"
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        readOnly
      />
      <span>{label}</span>
    </label>
  );
}

export default Modal;
