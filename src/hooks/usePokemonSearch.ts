import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from 'api/pokemonApi';
import {
  PokemonPageResponse,
  PokemonResult,
  SimplePokemon,
} from 'interfaces/pokemon.interface';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);

  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const getNewPokemons = async () => {
    const response = await pokemonApi.get<PokemonPageResponse>('', {
      params: {
        limit: 1200,
      },
    });
    mapPokemonList(response.data.results);
  };

  const mapPokemonList = (pokemons: PokemonResult[]) => {
    const newPokemonList: SimplePokemon[] = pokemons.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {
        id,
        name,
        picture,
      };
    });
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };
  useEffect(() => {
    getNewPokemons();
  }, []);

  return {
    getNewPokemons,
    isFetching,
    simplePokemonList,
  };
};
