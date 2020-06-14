import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import ForgetPasswordScreen from "./login/ForgetPasswordScreen";
import LaunchScreen from "./login/LaunchScreen";
import LoginScreen from "./login/LoginScreen";
import SignupScreen from "./login/SignupScreen";

const Stack = createStackNavigator();

function StartScreen(props) {
  const { isAuthenticated, navigation } = props;
  if (isAuthenticated) {
    navigation.popToTop();
    navigation.navigate("main");
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="launch" component={LaunchScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forget-password" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(StartScreen);
