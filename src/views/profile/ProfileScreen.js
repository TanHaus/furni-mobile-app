import React from "react";
import { ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileListingsScreen from "./ProfileListingsScreen";
import ProfileReviewsScreen from "./ProfileReviewsScreen";
import { ProfileHeader, SafeAreaViewWrapper } from "../../components";

const Tab = createMaterialTopTabNavigator();

function ProfileScreen() {
  return (
    <SafeAreaViewWrapper>
      <ScrollView>
        <Tab.Navigator tabBar={(props) => <ProfileHeader {...props} />}>
          <Tab.Screen name="Listings" component={ProfileListingsScreen} />
          <Tab.Screen name="Reviews" component={ProfileReviewsScreen} />
        </Tab.Navigator>
      </ScrollView>
    </SafeAreaViewWrapper>
  );
}

export default ProfileScreen;
