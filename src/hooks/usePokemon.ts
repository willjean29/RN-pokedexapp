import {useEffect, useState} from 'react';
import {PokemonFullResponse} from 'interfaces/pokemon.interface';
import {pokemonApi} from 'api/pokemonApi';

const usePokemon = (id: number) => {
  const [isLoading, setisLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFullResponse>(
    {} as PokemonFullResponse,
  );

  const getFullPokemon = async () => {
    const response = await pokemonApi.get<PokemonFullResponse>(`${id}`);
    setPokemon(response.data);
    setisLoading(false);
  };

  useEffect(() => {
    getFullPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};

export default usePokemon;
