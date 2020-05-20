import React from 'react';
import { Button, View, Text } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login!</Text>
      <Button
        title="Go back"
        onPress={() => navigation.navigate('welcome')}
      />
    </View>
  );
}

export default LoginScreen;