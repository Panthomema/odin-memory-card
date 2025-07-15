import type { PokemonCardData } from '../types/ui';

type Props = {
  pokemon: PokemonCardData;
};

function Card({ pokemon }: Props) {
  return (
    <div>
      <img src={pokemon.spriteUrl} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default Card;
