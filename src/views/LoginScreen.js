import React from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login!</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('main')}
      />
    </SafeAreaView>
  );
}

export default LoginScreen;