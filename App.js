import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './src/views/StartScreen';
import MainScreen from './src/views/MainScreen';

const Stack = createStackNavigator();

function App() {
  return (
    // Currently have these 2 screens. To view one, comment out the other
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator  headerMode='none'>
          <Stack.Screen name="start" component={StartScreen}/>
          <Stack.Screen name="main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

export default App;