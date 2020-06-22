import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavScreen from "./MainTabNavScreen";
import ListingScreen from "./listing/ListingScreen";
import SearchScreen from "./home/SearchScreen";
import SearchResultsScreen from "./home/SearchResultsScreen";

const Stack = createStackNavigator();

function MainScreen(props) {
  // const { navigation, isAuthenticated } = props;
  // if (!isAuthenticated) {
  //   navigation.navigate("start");
  // }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="main-tab-nav" component={MainTabNavScreen} />
      <Stack.Screen name="listing" component={ListingScreen} />
      <Stack.Screen name="search-results" component={SearchResultsScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(MainScreen);
