import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';

const Stack = createStackNavigator();

function StartScreen(props) {
  const { isAuthenticated, navigation } = props;
  if (isAuthenticated) {
    navigation.navigate('main');
  }
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forget-password" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(StartScreen);
