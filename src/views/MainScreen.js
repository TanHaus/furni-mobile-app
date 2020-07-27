import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { logoutUser } from "actions/auth";
import MainTabNavScreen from "./MainTabNavScreen";
import ListingScreen from "./listing/ListingScreen";
import ListingOffersModal from "./listing/ListingOffersModal";
import SearchScreen from "./home/SearchScreen";
import SearchResultsScreen from "./home/SearchResultsScreen";
import SortAndFilterScreen from "./home/SortAndFilterScreen";
import ChatSessionScreen from "views/chat/ChatSessionScreen";
import AddListingSuccessScreen from "./post/AddListingSuccessScreen";

const Stack = createStackNavigator();

function MainScreen(props) {
  const { navigation, isAuthenticated } = props;
  if (!isAuthenticated) {
    navigation.navigate("start");
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="main-tab-nav" component={MainTabNavScreen} />
      <Stack.Screen name="listing" component={ListingScreen} />
      <Stack.Screen name="listing-offers" component={ListingOffersModal} />
      <Stack.Screen name="search-results" component={SearchResultsScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="sort-and-filter" component={SortAndFilterScreen} />
      <Stack.Screen name="chat-session" component={ChatSessionScreen} />
      <Stack.Screen
        name="add-listing-success"
        component={AddListingSuccessScreen}
      />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forceLogout: () => dispatch(logoutUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(MainScreen);
