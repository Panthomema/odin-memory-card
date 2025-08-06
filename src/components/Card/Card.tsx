import styles from '@/components/Card/Card.module.css';
import type { PokemonCardData } from '@/types/ui';
import clsx from 'clsx';

type CardProps = {
  pokemon: PokemonCardData;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function Card({
  pokemon,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CardProps) {
  return (
    <div
      className={clsx(
        'nes-container',
        'is-rounded',
        styles.card,
        isSelected && styles['card-selected'],
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={pokemon.spriteUrl}
        alt={pokemon.name.toUpperCase()}
        className={styles.image}
        style={{ '--image-width': `${pokemon.scale}%` } as React.CSSProperties}
      />
      <p className={styles.name}>{pokemon.name.toUpperCase()}</p>
    </div>
  );
}

export default Card;
