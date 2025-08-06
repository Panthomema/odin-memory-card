import styles from '@/components/Card/Card.module.css';
import type { PokemonCardData } from '@/types/ui';
import clsx from 'clsx';

type CardProps = {
  pokemon: PokemonCardData;
};

function Card({ pokemon }: CardProps) {
  return (
    <div className={clsx('nes-container', 'is-rounded', styles.card)}>
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
