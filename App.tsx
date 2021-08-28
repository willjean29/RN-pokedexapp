import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from 'navigation/StackNavigation';
import TabNavigation from 'navigation/TabNavigation';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;
