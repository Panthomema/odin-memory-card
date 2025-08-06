import styles from '@/components/Card/Card.module.css';
import type { PokemonCardData } from '@/types/ui';
import clsx from 'clsx';

type CardProps = {
  pokemon: PokemonCardData;
  isSelected: boolean;
  onCommit: (id: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function Card({
  pokemon,
  isSelected,
  onCommit,
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
      onClick={() => onCommit(pokemon.id)}
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
