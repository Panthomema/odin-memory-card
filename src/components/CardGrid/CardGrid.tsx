import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';
import type { PokemonCardData } from '@/types/ui';

type CardGridProps = {
  cards: PokemonCardData[];
};

function CardGrid({ cards }: CardGridProps) {
  console.log(cards);

  return (
    <div className={styles['card-grid']}>
      {cards.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default CardGrid;
