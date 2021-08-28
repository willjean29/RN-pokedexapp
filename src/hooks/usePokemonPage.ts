import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from 'api/pokemonApi';
import {
  PokemonPageResponse,
  PokemonResult,
  SimplePokemon,
} from 'interfaces/pokemon.interface';

export const usePokemonPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const getNewPokemons = async () => {
    setIsLoading(true);
    const response = await pokemonApi.get<PokemonPageResponse>('', {
      params: {
        offset: offset,
      },
    });
    mapPokemonList(response.data.results);
    // console.log(offset);
    setIsLoading(false);
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

    setOffset(simplePokemonList.length + newPokemonList.length);
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
  };
  useEffect(() => {
    getNewPokemons();
  }, []);

  return {
    getNewPokemons,
    isLoading,
    simplePokemonList,
  };
};
