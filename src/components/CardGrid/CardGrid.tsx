import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { PokemonCardData } from '@/types/ui';

type CardGridProps = {
  cards: PokemonCardData[];
};

function CardGrid({ cards }: CardGridProps) {
  console.log(cards);

  const { selectedIndex, setHoveredIndex } = useKeyboardNavigation({
    itemCount: cards.length,
    onEnter: () => {},
  });

  return (
    <div className={styles['card-grid']}>
      {cards.map((pokemon, index) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          isSelected={selectedIndex == index}
          onClick={() => {}}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}

export default CardGrid;
