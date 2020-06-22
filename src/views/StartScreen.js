import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import ForgetPasswordScreen from "./login/ForgetPasswordScreen";
import ForgetPasswordSuccessScreen from "./login/ForgetPasswordSuccessScreen";
import LaunchScreen from "./login/LaunchScreen";
import LoginScreen from "./login/LoginScreen";
import ResetPasswordScreen from "./login/ResetPasswordScreen";
import ResetPasswordSuccessScreen from "./login/ResetPasswordSuccessScreen";
import SignupScreen from "./login/SignupScreen";
import VerificationScreen from "./login/VerificationScreen";

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
      <Stack.Screen name="verification" component={VerificationScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forgot-password" component={ForgetPasswordScreen} />
      <Stack.Screen
        name="forgot-password-success"
        component={ForgetPasswordSuccessScreen}
      />
      <Stack.Screen name="reset-password" component={ResetPasswordScreen} />
      <Stack.Screen
        name="reset-password-success"
        component={ResetPasswordSuccessScreen}
      />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(StartScreen);
