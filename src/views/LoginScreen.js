import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'; 

import { loginUser } from '../actions/auth';

function LoginScreen(props) {
  const { navigation, submitLoginData, isLoggingIn, isAuthenticated } = props;
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmitLogin = () => {
    submitLoginData({email: emailOrUsername, password});
  }
  return (
    <SafeAreaView style={{paddingLeft: 20, paddingRight: 20}}>
      <Ionicons 
        name="ios-arrow-back" 
        size={24} color="black" 
        style={{paddingTop:10, paddingBottom: 10}}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: 18}}>LOG IN</Text>
      <Text style={{color: '#d0d0d0', textTransform: 'uppercase', fontSize: 16, paddingTop: 20}}>EMAIL OR USERNAME</Text>
      <TextInput
      style={{ height: 40, borderBottomWidth: 1 }}
      value={emailOrUsername}
      onChangeText={setEmailOrUsername}
      />
      <Text style={{color: '#d0d0d0', textTransform: 'uppercase', fontSize: 16, paddingTop: 20}}>PASSWORD</Text>
      <TextInput
      style={{ height: 40, borderBottomWidth: 1 }}
      value={password}
      onChangeText={setPassword}
      />
      <Button
        title="Log in"
        onPress={handleSubmitLogin}
        backgroundColor="black"
        color="white"
      />
      <View style={{flexDirection: 'row', paddingTop: 10, fontSize: 16}}>
        <Text>or </Text>
        <Text 
          onPress={() => props.navigation.navigate('signup')}
          style={{textDecorationLine: 'underline'}}
        >
          register
        </Text>
        <Text> instead</Text>
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitLoginData: (loginData) => dispatch(loginUser(loginData))
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(LoginScreen);

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