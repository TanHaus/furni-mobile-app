import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileListingsScreen from "./ProfileListingsScreen";
import ProfileReviewsScreen from "./ProfileReviewsScreen";
import {
  ProfileHeader,
  SafeAreaViewWrapper,
  CustomText,
} from "../../components";
import { LikedScreen } from "./LikedScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function ProfileHelper() {
  return (
    <SafeAreaViewWrapper>
      <Tab.Navigator tabBar={(props) => <ProfileHeader {...props} />}>
        <Tab.Screen name="Listings" component={ProfileListingsScreen} />
        <Tab.Screen name="Reviews" component={ProfileReviewsScreen} />
      </Tab.Navigator>
    </SafeAreaViewWrapper>
  );
}

export default ProfileHelper;
