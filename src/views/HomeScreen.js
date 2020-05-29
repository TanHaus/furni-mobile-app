import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MarketScreen from './MarketScreen';
import ExploreScreen from './ExploreScreen';
import HomeHeader from '../components/HomeHeader';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
    return (
      <Tab.Navigator tabBar={props => <HomeHeader {...props} />}>
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
      </Tab.Navigator>
    );
}

export default HomeScreen;
