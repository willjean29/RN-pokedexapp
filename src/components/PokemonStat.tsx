import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export interface PokemonStatProps {
  name: string;
  stat: number;
  color: string;
}

const PokemonStat: React.FC<PokemonStatProps> = ({name, stat, color}) => {
  return (
    <View style={styles.viewContainer}>
      <View style={{width: 150}}>
        <Text style={styles.txtTitle}>{name}:</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'center'}}>
          <View
            style={{
              ...styles.viewStat,
              width: stat >= 100 ? '100%' : `${stat}%`,
              backgroundColor: color,
            }}></View>
        </View>
        <Text style={styles.txtStat}>{stat}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontSize: 16,
  },
  txtStat: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewStat: {
    width: '100%',
    height: 15,
    borderRadius: 10,
  },
});

export default PokemonStat;
