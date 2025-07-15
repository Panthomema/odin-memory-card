import type { PokemonCardData } from "../types/ui";

type Props = {
  pokemon: PokemonCardData;
};

function Card({ pokemon }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-300 hover:scale-105 transition-transform cursor-pointer">
      <img
        src={pokemon.spriteUrl}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
      />
      <h2 className="text-center text-lg font-bold capitalize text-gray-700">
        {pokemon.name}
      </h2>
    </div>
  );
}

export default Card;
