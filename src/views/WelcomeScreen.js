import React from 'react';
import { Button, View, Text } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome!</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('register')}
      />
        <Button
        title="Log in"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  );
}

export default WelcomeScreen;