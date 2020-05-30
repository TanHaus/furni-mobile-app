import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LOG IN</Text>
      <Text>EMAIL OR USERNAME</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      />
      <Text>PASSWORD</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      />
      <Button
        title="Log in"
        onPress={() => navigation.navigate('main')}
      />
      <Text>or <Text style={{textDecorationLine: 'underline'}}>register</Text> instead</Text>
    </SafeAreaView>
  );
}

export default LoginScreen;

// =============================================================================
// STYLING
// =============================================================================

const Button = (props) => (
  <ButtonWrapper onPress={props.onPress} backgroundColor={props.backgroundColor} borderColor={props.borderColor}>
    <ButtonText color={props.color}>
      {props.title}
    </ButtonText>
  </ButtonWrapper>
)

const ButtonWrapper = styled.TouchableOpacity`
  width: 300;
  background-color: ${props => props.backgroundColor};
  border-radius: 10;
  border: 2px solid ${props => !!props.borderColor ? props.borderColor : "black"};
  padding: 10px;
  margin: 5px;
`;

const ButtonText = styled.Text`
  font-size: 18;
  color: ${props => props.color};
  text-align: center;
`;