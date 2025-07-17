import { useEffect, useState } from 'react';
import type { PokemonDetails, PokemonList } from '@/types/api';
import type { PokemonCardData } from '@/types/ui';
import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';

function CardGrid() {
  const [cards, setCards] = useState<PokemonCardData[]>([]);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
      const json: PokemonList = await res.json();

      const cardData = await Promise.all(
        json.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details: PokemonDetails = await res.json();

          return {
            name: details.name,
            spriteUrl:
              details.sprites.versions?.['generation-i'].yellow.front_default ??
              details.sprites.front_default,
          };
        }),
      );

      setCards(cardData);
    }

    fetchPokemon();
  }, []);

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
