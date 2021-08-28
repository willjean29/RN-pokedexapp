import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {GlobalStyles} from 'theme/appTheme';

import BlackPokebol from 'assets/pokebola.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPage} from 'hooks/usePokemonPage';
import {FadeInImage} from 'components/FadeInImage';
import PokemonCard from 'components/PokemonCard';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, isLoading, getNewPokemons} = usePokemonPage();

  return (
    <>
      <StatusBar backgroundColor="gray" />
      <Image source={BlackPokebol} style={GlobalStyles.pokebolBG} />

      <View style={{alignSelf: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={simplePokemonList}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <Text
              style={{
                ...GlobalStyles.txtTitle,
                ...GlobalStyles.marginHorizontal,
                // top: top + 20,
                marginTop: top + 20,
                marginBottom: 20,
              }}>
              Pokedex
            </Text>
          )}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          ListFooterComponent={() => (
            <View style={{alignItems: 'center', marginBottom: 25}}>
              <ActivityIndicator color="gray" size={40} />
            </View>
          )}
          onEndReached={() => getNewPokemons()}
          onEndReachedThreshold={0.4}
        />
      </View>
    </>
  );
};

export default HomeScreen;
