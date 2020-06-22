import React from "react";
import { TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import ExploreScreen from "./ExploreScreen";
import MarketScreen from "./MarketScreen";
import { HomeHeader, SafeAreaViewWrapper } from "../../components";

const Tab = createMaterialTopTabNavigator();

function HomeScreen(props) {
  return (
    <SafeAreaViewWrapper>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("search");
        }}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      ></TouchableOpacity>
      <Tab.Navigator tabBar={(props) => <HomeHeader {...props} />}>
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
      </Tab.Navigator>
    </SafeAreaViewWrapper>
  );
}

export default HomeScreen;

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const SearchbarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchField = styled.TextInput`
  width: 100%;
  height: 40px;
  color: black;
  border-bottom-width: 1px;
`;
