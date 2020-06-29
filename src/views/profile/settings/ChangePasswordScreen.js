import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../../components";
import { TextWeight } from "../../../components/types";
import { Color } from "../../../styles";
import { loginUser } from "../../../actions/auth";

function ChangePasswordScreen(props) {
  const { navigation, submitLoginData, isLoggingIn, isAuthenticated } = props;
  const [oldPassword, setOldPassword] = useState("");
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
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>CHANGE PASSWORD</Title>
      </TitleContainer>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          OLD PASSWORD
        </CustomText.Regular>
        <Input
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
      </Container>
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
        <Button title="Change password" onPress={handleSubmitLogin} />
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
export default withConnect(ChangePasswordScreen);

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
  border-bottom-width: 1px;
`;

const Container = styled.View`
  margin-top: 30px;
`;
