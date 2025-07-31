import { useEffect, useState } from 'react';
import type { PokemonDetails, PokemonList } from '@/types/api';
import type { PokemonCardData } from '@/types/ui';
import Card from '@/components/Card/Card';
import styles from '@/components/CardGrid/CardGrid.module.css';

const MAX_SPRITE_WIDTH = 56;

function CardGrid() {
  const [cards, setCards] = useState<PokemonCardData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
      const pokemons: PokemonList = await res.json();

      const cardData = await Promise.all(
        pokemons.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details: PokemonDetails = await res.json();

          const spriteUrl =
            details.sprites.versions?.['generation-i'].yellow.front_default ??
            details.sprites.front_default;

          // Preload image
          const naturalWidth = await new Promise<number>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.naturalWidth);
            img.src = spriteUrl;
          });

          return {
            name: details.name,
            spriteUrl,
            scale: (naturalWidth / MAX_SPRITE_WIDTH) * 100,
          };
        }),
      );

      setCards(cardData);
      setIsLoaded(true);
    }

    fetchPokemon();
  }, []);

  console.log(cards);

  return isLoaded ? (
    <div className={styles['card-grid']}>
      {cards.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  ) : (
    <p className="nes-text is-disabled">Loading Pokémon...</p>
  );
}

export default CardGrid;
