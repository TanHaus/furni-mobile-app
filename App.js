import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import configureStore from './src/configureStore';
import StartScreen from './src/views/StartScreen';
import MainScreen from './src/views/MainScreen';

const { store, persistor } = configureStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode='none'>
              <Stack.Screen name="start" component={StartScreen}/>
              <Stack.Screen name="main" component={MainScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;