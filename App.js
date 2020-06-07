import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { store, persistor } from './src/configureStore';
import StartScreen from './src/views/StartScreen';
import MainScreen from './src/views/MainScreen';

const Stack = createStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    'Roboto Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto Semibold': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto Light': require('./assets/fonts/Roboto-Light.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
}

export default App;