import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import ChatsScreen from './ChatsScreen';
import AddScreen from './AddScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';


const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            iconName = route.name === 'Home'
              ? 'home'
              : route.name === 'Chat'
              ? 'chat'
              : route.name === 'Add'
              ? 'library-plus'
              : route.name === 'Notification'
              ? 'bell'
              : 'account'

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#d0d0d0',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatsScreen} />
        <Tab.Screen name="Add" component={AddScreen} options={{ tabBarVisible: false }} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}

export default MainScreen;