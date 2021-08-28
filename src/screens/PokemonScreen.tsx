import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/StackNavigation';
import {RoutesName} from 'utils/enums';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WhitePokebol from 'assets/pokebola-blanca.png';
import {FadeInImage} from 'components/FadeInImage';
import usePokemon from 'hooks/usePokemon';
import PokemonDetails from 'components/PokemonDetails';

export interface PokemonScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.POKEMON_SCREN> {}

const PokemonScreen: React.FC<PokemonScreenProps> = ({navigation, route}) => {
  const {simplePokemon, color} = route.params;
  const {isLoading, pokemon} = usePokemon(parseInt(simplePokemon.id));
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={color} />
      <View
        style={{
          ...styles.viewHeaderContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.pop()}
          style={{
            top: top + 20,
            left: 20,
            position: 'absolute',
          }}>
          <Icon color={'#FFF'} size={40} name="arrow-back-outline" />
        </TouchableOpacity>

        <Text style={{...styles.txtPokemonName, top: top + 60}}>
          {simplePokemon.name}
        </Text>
        <Text style={{...styles.txtPokemonName, top: top + 60}}>
          #{simplePokemon.id}
        </Text>

        <Image source={WhitePokebol} style={styles.viewWhitePokebol} />

        <FadeInImage uri={simplePokemon.picture} style={styles.viewFadeImage} />
      </View>

      {isLoading ? (
        <View style={styles.viewLoading}>
          <ActivityIndicator color={color} size={40} />
        </View>
      ) : (
        // <View>
        //   <Text>Types</Text>
        //   <Text>{pokemon.types.map(poke => poke.type.name).join(' ')}</Text>
        //   <Text>Peso</Text>
        //   <Text>{pokemon.weight}Kg</Text>
        //   <Text>Sprites</Text>
        //   {/* <FlatList
        //       showsHorizontalScrollIndicator={false}
        //       horizontal={true}
        //       data={[pokemon.sprites.front_default,pokemon.sprites.back_default,pokemon.sprites.front_shiny, pokemon.sprites.back_shiny]}
        //       keyExtractor={(item) => item.id}
        //     /> */}
        //   <Text>Habilidades Base</Text>
        // </View>
        <PokemonDetails pokemon={pokemon} color={color} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewHeaderContainer: {
    zIndex: 999,
    height: 380,
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
    alignItems: 'center',
  },
  txtPokemonName: {
    color: '#FFF',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  viewWhitePokebol: {
    width: 200,
    height: 200,
    opacity: 0.7,
    bottom: -60,
  },
  viewFadeImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: -15,
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PokemonScreen;
