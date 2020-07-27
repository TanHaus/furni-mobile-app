import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import ExploreScreen from "./ExploreScreen";
import MarketScreen from "./MarketScreen";
import { HomeHeader, SafeAreaViewWrapper } from "../../components";

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <SafeAreaViewWrapper>
      <Tab.Navigator tabBar={(props) => <HomeHeader {...props} />}>
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
      </Tab.Navigator>
    </SafeAreaViewWrapper>
  );
}

export default HomeScreen;
