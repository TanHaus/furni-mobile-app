import React from "react";
import styled from "styled-components/native";
import { Button, CustomText, SafeAreaViewWrapper } from "../../components";
import { TextWeight } from "../../components/types";

function ResetPasswordSuccessScreen(props) {
  const { navigation } = props;
  return (
    <SafeAreaViewWrapper>
      <Title weight={TextWeight.Bold}>PASSWORD RESET SUCCESSFUL</Title>
      <Subtitle>You may now log in with your new password</Subtitle>
      <Button title="Log in" onPress={() => navigation.navigate("login")} />
    </SafeAreaViewWrapper>
  );
}

export default ResetPasswordSuccessScreen;

// =============================================================================
// STYLING
// =============================================================================
const Title = styled(CustomText.XLarge)`
  margin: 100px 0 50px;
  text-align: center;
`;

const Subtitle = styled(CustomText.Regular)`
  margin-bottom: 30px;
  text-align: center;
`;
