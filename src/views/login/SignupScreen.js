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

import { createUser } from "../../actions/users";

function SignupScreen(props) {
  const { navigation, createUserLoading, submitSignupData } = props;
  // to refactor: const [user, setUser] = useState({name: "", email: "", password: ""});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitSignup = () => {
    navigation.navigate("verification", { email: email });
    // submitSignupData({ name: username, email, password });
  };
  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.navigate("launch")} />
        <Title weight={TextWeight.Bold}>CREATE AN ACCOUNT</Title>
      </TitleContainer>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          USERNAME
        </CustomText.Regular>
        <Input value={username} onChangeText={setUsername} />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>EMAIL</CustomText.Regular>
        <Input value={email} onChangeText={setEmail} />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          PASSWORD
        </CustomText.Regular>
        <Input value={password} onChangeText={setPassword} />
      </Container>
      <Container>
        <Button title="Sign up" onPress={handleSubmitSignup} />
      </Container>
      <TextContainer>
        <CustomText.Small>or </CustomText.Small>
        <UnderlinedText onPress={() => navigation.navigate("login")}>
          log in
        </UnderlinedText>
        <CustomText.Small> instead</CustomText.Small>
      </TextContainer>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    createUserLoading: state.users.createUserLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitSignupData: (signupData) => dispatch(createUser(signupData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SignupScreen);

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

const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const UnderlinedText = styled(CustomText.Small)`
  text-decoration-line: underline;
`;
