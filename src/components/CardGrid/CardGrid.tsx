import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { PokemonCardData } from '@/types/ui';

type CardGridProps = {
  cards: PokemonCardData[];
  onCardCommit: (id: number) => void;
};

function CardGrid({ cards, onCardCommit }: CardGridProps) {
  const { selectedIndex, setHoveredIndex } = useKeyboardNavigation({
    itemCount: cards.length,
    onEnter: onCardCommit,
  });

  return (
    <div className={styles['card-grid']}>
      {cards.map((pokemon, index) => (
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
