import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';

const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTransparent: true }}>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="forget-password" component={ForgetPasswordScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;
