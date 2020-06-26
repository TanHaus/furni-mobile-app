import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import LikedScreen from "./LikedScreen";
import SettingsScreen from "./settings/SettingsScreen";
import ChangePasswordScreen from "./settings/ChangePasswordScreen";
import EditPreferencesScreen from "./settings/EditPreferencesScreen";
import EditProfileScreen from "./settings/EditProfileScreen";
import PurchasesScreen from "./settings/PurchasesScreen";

const Stack = createStackNavigator();

function ProfileMainScreen(props) {
  const { navigation, isAuthenticated } = props;
  if (!isAuthenticated) {
    navigation.navigate("start");
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="profile-home" component={ProfileScreen} />
      <Stack.Screen name="liked" component={LikedScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="edit-profile" component={EditProfileScreen} />
      <Stack.Screen name="change-password" component={ChangePasswordScreen} />
      <Stack.Screen name="edit-preferences" component={EditPreferencesScreen} />
      <Stack.Screen name="purchases" component={PurchasesScreen} />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(ProfileMainScreen);
