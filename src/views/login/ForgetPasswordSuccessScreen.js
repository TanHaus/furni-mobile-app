import React from "react";
import styled from "styled-components/native";
import { BackButton, CustomText, SafeAreaViewWrapper } from "../../components";
import { TextWeight } from "../../components/types";

function ForgotPasswordSuccessScreen(props) {
  const { route, navigation } = props;
  const { email } = route.params;
  return (
    <SafeAreaViewWrapper>
      <BackButton onPress={() => navigation.goBack()} />
      <TextContainer>
        <Title weight={TextWeight.Bold}>CHECK YOUR EMAIL</Title>
        <Subtitle>
          A password reset link has been sent to
          <EmailContainer>
            <CustomText.Regular>{email}</CustomText.Regular>
          </EmailContainer>
        </Subtitle>
      </TextContainer>
    </SafeAreaViewWrapper>
  );
}

export default ForgotPasswordSuccessScreen;

// =============================================================================
// STYLING
// =============================================================================
const TextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(CustomText.XLarge)`
  margin: 100px 0 50px;
`;

const Subtitle = styled(CustomText.Regular)`
  text-align: center;
`;

const EmailContainer = styled.View`
  border-bottom-width: 2;
`;
