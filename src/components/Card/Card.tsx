import styles from '@/components/Card/Card.module.css';
import type { PokemonCardData } from '@/types/ui';
import clsx from 'clsx';
import { useState } from 'react';

const MAX_SPRITE_WIDTH = 56;

type Props = {
  pokemon: PokemonCardData;
};

function Card({ pokemon }: Props) {
  const [spriteWidth, setSpriteWidth] = useState<number | null>(null);

  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const naturalWidth = e.currentTarget.naturalWidth;
    setSpriteWidth(naturalWidth);
  };

  const scale = (spriteWidth ? spriteWidth / MAX_SPRITE_WIDTH : 1) * 100;

  return (
    <div className={clsx('nes-container', 'is-rounded', styles.card)}>
      <img
        src={pokemon.spriteUrl}
        alt={capitalizedName}
        className={styles.image}
        onLoad={handleImageLoad}
        style={{ '--image-width': `${scale}%` } as React.CSSProperties}
      />
      <p className={styles.name}>{capitalizedName}</p>
    </div>
  );
}

export default Card;
