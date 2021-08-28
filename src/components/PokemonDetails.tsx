import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {PokemonFullResponse} from 'interfaces/pokemon.interface';
import {FadeInImage} from 'components/FadeInImage';
import {GlobalStyles} from 'theme/appTheme';
import PokemonStat from 'components/PokemonStat';

export interface PokemonDetailsProps {
  pokemon: PokemonFullResponse;
  color: string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({pokemon, color}) => {
  return (
    <ScrollView
      style={{...styles.viewContainer}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          ...styles.viewDeatilsPokemon,
          ...GlobalStyles.marginHorizontal,
        }}>
        <Text style={styles.txtTitle}>Types</Text>
        <Text style={styles.txtDescription}>
          {pokemon.types.map(poke => poke.type.name).join(' ')}
        </Text>
        <Text style={styles.txtTitle}>Peso</Text>
        <Text style={styles.txtDescription}>{pokemon.weight} Kg</Text>
        <Text style={styles.txtTitle}>Sprites</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={{width: 100, height: 100}}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={{width: 100, height: 100}}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={{width: 100, height: 100}}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={{width: 100, height: 100}}
        />
      </ScrollView>
      <View style={{...GlobalStyles.marginHorizontal}}>
        <Text style={styles.txtTitle}>Habilidades Base</Text>
        <Text style={styles.txtDescription}>
          {pokemon.abilities.map(({ability}) => ability.name).join(' ')}
        </Text>
        <Text style={styles.txtTitle}>Movimientos</Text>
        <Text style={styles.txtDescription}>
          {pokemon.moves.map(({move}) => move.name).join(' ')}
        </Text>
        <Text style={styles.txtTitle}>Stats</Text>

        {pokemon.stats.map(({stat, base_stat}, index) => (
          <PokemonStat
            key={index}
            name={stat.name}
            stat={base_stat}
            color={color}
          />
        ))}

        <View
          style={{
            alignItems: 'center',
            marginBottom: 80,
          }}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={{width: 100, height: 100}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  viewDeatilsPokemon: {
    marginTop: 380,
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  txtDescription: {
    fontSize: 16,
  },
});

export default PokemonDetails;
