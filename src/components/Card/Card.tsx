import styles from '@/components/Card/Card.module.css';
import type { PokemonCardData } from '@/types/ui';
import clsx from 'clsx';

type CardProps = {
  pokemon: PokemonCardData;
};

function Card({ pokemon }: CardProps) {
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className={clsx('nes-container', 'is-rounded', styles.card)}>
      <img
        src={pokemon.spriteUrl}
        alt={capitalizedName}
        className={styles.image}
        style={{ '--image-width': `${pokemon.scale}%` } as React.CSSProperties}
      />
      <p className={styles.name}>{capitalizedName}</p>
    </div>
  );
}

export default Card;
