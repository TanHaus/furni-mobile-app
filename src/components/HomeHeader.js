import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeHeader({ state, descriptors, navigation, position }) {
    const [value, onChangeText] = React.useState('Useless Placeholder');
    const tabGen = (route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

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
            >
                <Text
                    style={{
                        color: isFocused ? '#000000' : '#d0d0d0',
                        textDecorationLine: isFocused ? 'underline' : 'none',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        );
    }
    const tabs = state.routes.map(tabGen);
    
    return (
        <SafeAreaView>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                {tabs}
            </View>
            
      </SafeAreaView>
    );
  }

export default HomeHeader;
