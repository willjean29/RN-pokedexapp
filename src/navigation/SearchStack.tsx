import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RoutesName} from 'utils/enums';
import SearchPokemonScreen from 'screens/SearchPokemonScreen';
import PokemonScreen from 'screens/PokemonScreen';
import {RootStackParamList} from 'navigation/StackNavigation';

const Stack = createStackNavigator<RootStackParamList>();
export interface SeachStackProps {}

const SearchStack: React.FC<SeachStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      <Stack.Screen
        name={RoutesName.SEARCH_POKEMON_SCREEN}
        component={SearchPokemonScreen}
      />
      <Stack.Screen name={RoutesName.POKEMON_SCREN} component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
