import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import configureStore from './src/configureStore';
import StartScreen from './src/views/StartScreen';
import MainScreen from './src/views/MainScreen';

const { store, persistor } = configureStore();
const RootStack = createStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    'Roboto Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    'Roboto Semibold': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto Light': require('./src/assets/fonts/Roboto-Light.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootStack.Navigator headerMode='none'>
                <RootStack.Screen name="start" component={StartScreen}/>
                <RootStack.Screen name="main" component={MainScreen} />
              </RootStack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;