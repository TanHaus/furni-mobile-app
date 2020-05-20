import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StartScreen from './src/views/StartScreen';
import MainScreen from './src/views/MainScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    // Currently have these 2 screens. To view one, comment out the other
    // <StartScreen />
    <MainScreen />
  );
}

export default App;