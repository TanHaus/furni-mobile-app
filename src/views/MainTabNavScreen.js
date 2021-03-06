import React from "react";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Color } from "../styles";
import HomeScreen from "./home/HomeScreen";
import ChatOverviewScreen from "./chat/ChatOverviewScreen";
import AddListingScreen from "./post/AddListingScreen";
import ActivityScreen from "./activity/ActivityScreen";
import ProfileMainScreen from "./profile/ProfileMainScreen";
// import AddListingSuccessScreen from "./post/AddListingSuccessScreen";

const Tab = createBottomTabNavigator();

const renderIcons = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    iconName =
      route.name === "Home"
        ? "home"
        : route.name === "Chat"
        ? "chat"
        : route.name === "Add"
        ? "library-plus"
        : route.name === "Activity"
        ? "bell"
        : "account";

    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  },
});

function MainTabNavScreen(props) {
  return (
    <Tab.Navigator
      screenOptions={renderIcons}
      tabBarOptions={{
        activeTintColor: Color.Palette[1],
        inactiveTintColor: Color.Palette[6],
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatOverviewScreen} />
      <Tab.Screen
        name="Add"
        component={AddListingScreen}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(MainTabNavScreen);
