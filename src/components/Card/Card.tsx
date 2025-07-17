import styles from '@/components/Card/Card.module.css';
import type { PokemonCardData } from '@/types/ui';
import clsx from 'clsx';

type Props = {
  pokemon: PokemonCardData;
};

function Card({ pokemon }: Props) {
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className={clsx('nes-container', 'is-rounded', styles.card)}>
      <img
        src={pokemon.spriteUrl}
        alt={capitalizedName}
        className={styles.image}
      />
      <p className={styles.name}>{capitalizedName}</p>
    </div>
  );
}

export default Card;
