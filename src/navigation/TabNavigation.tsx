import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RoutesName} from 'utils/enums';
import StackNavigation from 'navigation/StackNavigation';

import Icon from 'react-native-vector-icons/Ionicons';

import {Platform} from 'react-native';
import SearchStack from 'navigation/SearchStack';

const Tab = createBottomTabNavigator();
export interface TabNavigationProps {}

const TabNavigation: React.FC<TabNavigationProps> = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => screenOptions(route, color),
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255,0.9)',
          elevation: 0,
          borderWidth: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: '#FFF',
      }}>
      <Tab.Screen
        name={RoutesName.LIST_POKEMON_SCREEN}
        component={StackNavigation}
        options={{
          title: 'Listado',
        }}
      />
      <Tab.Screen
        name={RoutesName.LIST_SEARCH_SCREEN}
        component={SearchStack}
        options={{
          title: 'Buscar',
        }}
      />
    </Tab.Navigator>
  );
};

const screenOptions = (route: any, color: string) => {
  let iconName: string = '';
  switch (route.name) {
    case RoutesName.LIST_POKEMON_SCREEN:
      iconName = 'list-outline';
      break;
    case RoutesName.LIST_SEARCH_SCREEN:
      iconName = 'search-outline';
      break;
    default:
      break;
  }

  return <Icon name={iconName} size={22} color={color} />;
};

export default TabNavigation;
