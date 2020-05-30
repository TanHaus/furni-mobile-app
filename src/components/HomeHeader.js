import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

function HomeHeader({ state, descriptors, navigation, position }) {
  const [value, onChangeText] = useState('Search');
  const tabGen = (route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    
    const onPress = () => {
      const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
      type: 'tabLongPress',
      target: route.key,
      });
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        key={index}
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{padding: 5}}
      >
        <Text
          style={{
            color: isFocused ? '#000000' : '#d0d0d0',
            textDecorationLine: isFocused ? 'underline' : 'none',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {route.name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 10, paddingLeft: 10, paddingRight: 10
        }}>
        <Ionicons name="ios-search" size={24} color="black" />
        <TextInput
          style={{ height: 40, paddingLeft: 10, color: '#c4c4c4' }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
      <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center'
        }}
      >
        {state.routes.map(tabGen)}
      </View>
    </SafeAreaView>
  );
}

export default HomeHeader;
