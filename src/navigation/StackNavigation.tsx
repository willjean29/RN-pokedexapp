import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RoutesName} from 'utils/enums';
import HomeScreen from 'screens/HomeScreen';
import PokemonScreen from 'screens/PokemonScreen';
import {SimplePokemon} from '../interfaces/pokemon.interface';

export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonScreen: {
    simplePokemon: SimplePokemon;
    color: string;
  };
  SearchPokemonScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createStackNavigator<RootStackParamList>();

export interface StackNavigationProps {}

const StackNavigation: React.FC<StackNavigationProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      <Stack.Screen name={RoutesName.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={RoutesName.POKEMON_SCREN} component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
