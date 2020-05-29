import React from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>A one-stop {'\n'}marketplace for {'\n'}furniture</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('signup')}
      />
        <Button
        title="Log in"
        onPress={() => navigation.navigate('login')}
      />
    </SafeAreaView>
  );
}

export default WelcomeScreen;