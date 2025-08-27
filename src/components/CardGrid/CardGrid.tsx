import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { PokemonCardData } from '@/types/ui';

type CardGridProps = {
  cardsData: PokemonCardData[];
  onCardCommit: (id: number) => void;
};

function CardGrid({ cardsData, onCardCommit }: CardGridProps) {
  const { selectedIndex, setHoveredIndex } = useKeyboardNavigation({
    itemCount: cardsData.length,
    onEnter: (index) => {
      onCardCommit(cardsData[index].id);
    },
  });

  return (
    <div className={styles['card-grid']}>
      {cardsData.map((pokemon, index) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          isSelected={selectedIndex == index}
          onCommit={onCardCommit}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}

export default CardGrid;
