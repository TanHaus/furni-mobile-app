import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
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
        <Title weight={TextWeight.Bold}>SETTINGS</Title>
      </TitleContainer>
      <SettingContainer>
        <SettingButton>
          <SettingTitle weight={TextWeight.Semibold}>Profile</SettingTitle>
        </SettingButton>
      </SettingContainer>
      <SettingContainer>
        <SettingButton>
          <SettingTitle weight={TextWeight.Semibold}>
            Change Password
          </SettingTitle>
        </SettingButton>
      </SettingContainer>
      <SettingContainer>
        <SettingButton>
          <SettingTitle weight={TextWeight.Semibold}>Preferences</SettingTitle>
        </SettingButton>
      </SettingContainer>
      <SettingContainer>
        <SettingButton>
          <SettingTitle weight={TextWeight.Semibold}>Purchases</SettingTitle>
        </SettingButton>
      </SettingContainer>
      <SettingContainer>
        <SettingButton>
          <SettingTitle weight={TextWeight.Semibold}>Log out</SettingTitle>
        </SettingButton>
      </SettingContainer>
      <SettingContainer />
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
  margin-bottom: 30px;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const SettingContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Color.Palette[5]};
`;

const SettingButton = styled.TouchableOpacity``;

const SettingTitle = styled(CustomText.Regular)`
  padding: 10px 0 10px 10px;
`;
