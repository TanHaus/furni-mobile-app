import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import styled from 'styled-components/native';

function WelcomeScreen(props) {
  return (
    <ImageBackground source={require('../../assets/launch-screen/background.png')} style={{ flex: 1, backgroundPosition: "right"}}>
      <SafeAreaViewWrapper>
        <StyledText>Your one-stop {'\n'}marketplace for {'\n'}furniture</StyledText>
        <ButtonContainer>
          <Button
            title="Register"
            onPress={() => props.navigation.navigate('signup')}
            backgroundColor="white"
            borderColor="white"
            color="black"
          />
          <Button
            title="Log in"
            onPress={() => props.navigation.navigate('login')}
            backgroundColor="transparent"
            borderColor="white"
            color="white"
          />
        </ButtonContainer>
      </SafeAreaViewWrapper>
    </ImageBackground>
  );
}

export default WelcomeScreen;

// =============================================================================
// STYLING
// =============================================================================
const SafeAreaViewWrapper = styled.SafeAreaView`
  height: 100%;
  padding: 0 20px 0 20px
`;

const StyledText = styled.Text`
  font-size: 24px;
  padding: 80% 0 30% 0;
  color: white;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  width: 100%;
  padding-left: 20px; 
`; // i have no idea why i need to add paddingLeft to make the buttons look justified to the center

const Button = (props) => (
  <ButtonWrapper onPress={props.onPress} backgroundColor={props.backgroundColor} borderColor={props.borderColor}>
    <ButtonText color={props.color}>
      {props.title}
    </ButtonText>
  </ButtonWrapper>
)

const ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  background-color: ${props => props.backgroundColor};
  border-radius: 10px;
  border: 2px solid ${props => props.borderColor || "black"};
  padding: 10px;
  margin: 5px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${props => props.color};
  text-align: center;
`;