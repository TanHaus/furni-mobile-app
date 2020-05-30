import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import styled from 'styled-components/native';

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaViewWrapper>
      <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1560830889-96266c6dbe96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80" }} style={{ flex: 1, backgroundPosition: "right" }}>
        <View style={{backgroundColor: "rgba(0,0,0,0.2)", height: '100%'}}>
          <StyledText>Your one-stop {'\n'}marketplace for {'\n'}furniture</StyledText>
          <ButtonContainer>
            <Button
              title="Register"
              onPress={() => navigation.navigate('signup')}
              backgroundColor="white"
              borderColor="white"
              color="black"
            />
            <Button
              title="Log in"
              onPress={() => navigation.navigate('login')}
              backgroundColor="transparent"
              borderColor="white"
              color="white"
            />
          </ButtonContainer>
        </View>
      </ImageBackground>
    </SafeAreaViewWrapper>
  );
}

export default WelcomeScreen;

// =============================================================================
// STYLING
// =============================================================================
const SafeAreaViewWrapper = styled.SafeAreaView`
  height: 100%;
`;

const StyledText = styled.Text`
  font-size: 24px;
  padding: 80% 0 30% 5%;
  color: white;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

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
  border: 2px solid ${props => props.borderColor || "black"};
  padding: 10px;
  margin: 5px;
`;

const ButtonText = styled.Text`
  font-size: 18;
  color: ${props => props.color};
  text-align: center;
`;