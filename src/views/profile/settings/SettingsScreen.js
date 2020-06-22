import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../../components";
import { TextWeight } from "../../../components/custom-text/types";
import { Color } from "../../../styles";

function SettingsScreen(props) {
  const { navigation, submitLoginData, isLoggingIn, isAuthenticated } = props;

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>LOG IN</Title>
      </TitleContainer>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          SETTINGS
        </CustomText.Regular>
        <Input value={emailOrUsername} onChangeText={setEmailOrUsername} />
      </Container>
    </SafeAreaViewWrapper>
  );
}

// function mapStateToProps(state) {
//   return {
//     isLoggingIn: state.auth.isLoggingIn,
//     loginError: state.auth.loginError,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     submitLoginData: (loginData) => dispatch(loginUser(loginData)),
//   };
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// export default withConnect(LoginScreen);
export default SettingsScreen;

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1;
`;

const Container = styled.View`
  margin-top: 30px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const UnderlinedText = styled(CustomText.Small)`
  text-decoration-line: underline;
`;
