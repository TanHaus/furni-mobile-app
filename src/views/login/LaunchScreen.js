import React from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import { Button, SafeAreaViewWrapper } from "../../components";
import { ButtonType, TextWeight } from "../../components/types";

function LaunchScreen(props) {
  return (
    <ImageBackground
      source={require("../../assets/launch/background.png")}
      style={{ flex: 1, backgroundPosition: "right" }}
    >
      <SafeAreaViewWrapper>
        <Tagline>
          Your one-stop {"\n"}marketplace for {"\n"}furniture
        </Tagline>
        <ButtonContainer>
          <Button
            title="Register"
            onPress={() => props.navigation.navigate("signup")}
          />
          <Button
            title="Log in"
            onPress={() => props.navigation.navigate("login")}
            type={ButtonType.Secondary}
          />
        </ButtonContainer>
      </SafeAreaViewWrapper>
    </ImageBackground>
  );
}

export default LaunchScreen;

// =============================================================================
// STYLING
// =============================================================================
const Tagline = styled.Text`
  position: absolute;
  color: white;
  font-size: 24px;
  top: 34%;
`;

const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 10%;
`;
