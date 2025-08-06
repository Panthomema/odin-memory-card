import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { PokemonCardData } from '@/types/ui';

type CardGridProps = {
  cards: PokemonCardData[];
  onCardCommit: () => void;
};

function CardGrid({ cards, onCardCommit }: CardGridProps) {
  console.log(cards);

  const { selectedIndex, setHoveredIndex } = useKeyboardNavigation({
    itemCount: cards.length,
    onEnter: onCardCommit,
  });

  return (
    <div className={styles['card-grid']}>
      {cards.map((pokemon, index) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          isSelected={selectedIndex == index}
          onClick={onCardCommit}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}

export default CardGrid;
