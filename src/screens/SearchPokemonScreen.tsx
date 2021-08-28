import PokemonCard from 'components/PokemonCard';
import SearchInput from 'components/SearchInput';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GlobalStyles} from 'theme/appTheme';
import {usePokemonSearch} from 'hooks/usePokemonSearch';
import {SimplePokemon} from 'interfaces/pokemon.interface';

export interface SearchPokemonScreenProps {}

const SearchPokemonScreen: React.FC<SearchPokemonScreenProps> = () => {
  const [term, setTerm] = useState('');
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [pokemonFIltered, setPokemonFIltered] = useState<SimplePokemon[]>([]);
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (term == '') {
      return setPokemonFIltered([]);
    }
    if (isNaN(Number(term))) {
      setPokemonFIltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonId = simplePokemonList.find(poke => poke.id === term);
      setPokemonFIltered(pokemonId ? [pokemonId] : []);
    }
  }, [term]);

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color="gray" size={40} />
      </View>
    );
  }
  return (
    <View style={{...styles.viewContainer}}>
      <SearchInput onDebounce={value => setTerm(value)} />
      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pokemonFIltered}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <Text
              style={{
                ...GlobalStyles.txtTitle,
                ...GlobalStyles.marginHorizontal,
                marginVertical: 10,
                paddingTop: top + 80,
              }}>
              {term}
            </Text>
          )}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          contentContainerStyle={{
            alignItems: 'center',
            flex: pokemonFIltered === [] ? 1 : undefined,
          }}
          ListFooterComponent={() => <View style={{marginBottom: 80}}></View>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default SearchPokemonScreen;
