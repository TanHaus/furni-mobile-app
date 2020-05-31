import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'; 

function SignupScreen(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={{paddingLeft: 20, paddingRight: 20}}>
      <Ionicons 
        name="ios-arrow-back" 
        size={24} color="black" 
        style={{paddingTop:10, paddingBottom: 10}}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: 18}}>Create an account</Text>
      <Text style={{color: '#d0d0d0', textTransform: 'uppercase', fontSize: 16, paddingTop: 20}}>Username</Text>
      <TextInput
      style={{ height: 40, borderBottomWidth: 1 }}
      value={username}
      onChangeText={setUsername}
      />
      <Text style={{color: '#d0d0d0', textTransform: 'uppercase', fontSize: 16, paddingTop: 20}}>Email</Text>
      <TextInput
      style={{ height: 40, borderBottomWidth: 1 }}
      value={email}
      onChangeText={setEmail}
      />
      <Text style={{color: '#d0d0d0', textTransform: 'uppercase', fontSize: 16, paddingTop: 20}}>PASSWORD</Text>
      <TextInput
      style={{ height: 40, borderBottomWidth: 1 }}
      value={password}
      onChangeText={setPassword}
      />
      <Button
        title="Sign up"
        onPress={() => props.navigation.navigate('main')}
        backgroundColor="black"
        color="white"
      />
      <View style={{flexDirection: 'row', paddingTop: 10, fontSize: 16}}>
        <Text>or </Text>
        <Text 
          onPress={() => props.navigation.navigate('login')}
          style={{textDecorationLine: 'underline'}}
        >
          log in
        </Text>
        <Text> instead</Text>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;

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
  background-color: ${props => props.backgroundColor};
  border-radius: 10px;
  border: 2px solid ${props => !!props.borderColor ? props.borderColor : "black"};
  padding: 10px;
  margin-top: 20px
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${props => props.color};
  text-align: center;
`;