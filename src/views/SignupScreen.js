import React from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';

function SignupScreen({ navigation }) {
  return (
    <SafeAreaView 
      style={{paddingTop: useHeaderHeight()}}
    >
      <Text>Register!</Text>
      <Button
        title="Go back"
        onPress={() => navigation.navigate('welcome')}
      />
    </SafeAreaView>
  );
}

export default SignupScreen;