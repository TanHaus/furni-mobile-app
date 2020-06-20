import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../components";
import { TextWeight } from "../../components/custom-text/types";
import { Color } from "../../styles";
import { loginUser } from "../../actions/auth";

function ForgotPasswordScreen(props) {
  const {
    navigation,
    submitForgotPasswordData,
    isLoggingIn,
    isAuthenticated,
  } = props;
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const handleForgotPassword = () => {
    // submitForgotPasswordData({ email: emailOrUsername });
    // navigation.navigate("forgot-password-success", {email: emailOrUsername});
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>FORGOT PASSWORD</Title>
      </TitleContainer>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          EMAIL OR USERNAME
        </CustomText.Regular>
        <Input value={emailOrUsername} onChangeText={setEmailOrUsername} />
      </Container>
      <Container>
        <Button
          title="Send password reset link"
          onPress={handleForgotPassword}
        />
      </Container>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitForgotPasswordData: (emailOrUsername) =>
      dispatch(loginUser(emailOrUsername)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ForgotPasswordScreen);

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
