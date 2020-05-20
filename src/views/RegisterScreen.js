import React from 'react';
import { Button, View, Text } from 'react-native';

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register!</Text>
      <Button
        title="Go back"
        onPress={() => navigation.navigate('welcome')}
      />
    </View>
  );
}

export default RegisterScreen;