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

function ResetPasswordScreen(props) {
  const { navigation, submitLoginData, isLoggingIn, isAuthenticated } = props;
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const handleSubmitLogin = () => {
    if (newPassword === reEnterPassword) {
      // submitLoginData({ password: newPassword });
      navigation.navigate("reset-password-success");
    } else {
      //toast
    }
  };

  return (
    <SafeAreaViewWrapper>
      <Title weight={TextWeight.Bold}>RESET PASSWORD</Title>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          NEW PASSWORD
        </CustomText.Regular>
        <Input
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          RE-ENTER PASSWORD
        </CustomText.Regular>
        <Input
          secureTextEntry={true}
          value={reEnterPassword}
          onChangeText={setReEnterPassword}
        />
      </Container>
      <Container>
        <Button title="Reset Password" onPress={handleSubmitLogin} />
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
    submitLoginData: (loginData) => dispatch(loginUser(loginData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ResetPasswordScreen);

// =============================================================================
// STYLING
// =============================================================================
const Title = styled(CustomText.Large)`
  padding: 10px 0;
`;

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
`;

const Container = styled.View`
  margin-top: 30px;
`;
