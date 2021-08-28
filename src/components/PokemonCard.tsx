import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FadeInImage} from 'components/FadeInImage';
import {SimplePokemon} from 'interfaces/pokemon.interface';
import WhitePokebol from 'assets/pokebola-blanca.png';
import {useEffect} from 'react';
import {getColorsImage} from 'utils/methods';
import {RoutesName} from 'utils/enums';

export interface PokemonCardProps {
  pokemon: SimplePokemon;
}

const {width} = Dimensions.get('window');

const PokemonCard: React.FC<PokemonCardProps> = ({pokemon}) => {
  const [backgroundPokemon, setBackgroundPokemon] = useState('gray');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  const getBackgroundPokemon = async () => {
    const {primary} = await getColorsImage(pokemon.picture);
    setBackgroundPokemon(primary);
  };

  useEffect(() => {
    if (!isMounted.current) return;
    getBackgroundPokemon();
    return () => {
      isMounted.current = false;
    };
  }, [backgroundPokemon]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(RoutesName.POKEMON_SCREN, {
          simplePokemon: pokemon,
          color: backgroundPokemon,
        })
      }>
      <View
        style={{
          ...styles.viewCardContainer,
          width: width * 0.42,
          backgroundColor: backgroundPokemon,
        }}>
        <View>
          <Text style={styles.txtNamePoke}>{pokemon.name}</Text>
          <Text style={styles.txtNamePoke}># {pokemon.id}</Text>
        </View>

        <View style={styles.viewPokebolContainer}>
          <Image source={WhitePokebol} style={styles.imgPokebol} />
        </View>

        <FadeInImage
          uri={pokemon.picture}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            right: -5,
            bottom: -5,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewCardContainer: {
    backgroundColor: 'gray',
    marginHorizontal: 10,
    width: 160,
    height: 120,
    borderRadius: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 4.0,

    elevation: 5,
  },
  txtNamePoke: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  imgPokebol: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
    opacity: 0.3,
  },
  viewPokebolContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});

export default PokemonCard;
