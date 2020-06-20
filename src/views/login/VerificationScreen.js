import React, { useState } from "react";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../components";
import { ButtonType, TextWeight } from "../../components/types";

function VerificationScreen(props) {
  const { route, navigation } = props;
  const { email } = route.params;
  const [code, setCode] = useState("");

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>VERIFY ACCOUNT</Title>
      </TitleContainer>
      <TextContainer>
        <CustomText.Regular>
          Enter the 4-digit code sent to your email
        </CustomText.Regular>
        <EmailContainer>
          <CustomText.Regular>{email}</CustomText.Regular>
        </EmailContainer>
      </TextContainer>
      <CodeContainer>
        <Input
          maxLength={4}
          value={code}
          onChangeText={setCode}
          placeholder="Enter code"
          keyboardType="number-pad"
        />
      </CodeContainer>
      <Button title="Verify" onPress={() => navigation.navigate("main")} />
      <Button title="Resend Code" onPress={null} type={ButtonType.Secondary} />
    </SafeAreaViewWrapper>
  );
}

export default VerificationScreen;

//   const withConnect = connect(mapStateToProps, mapDispatchToProps);
//   export default withConnect(SignupScreen);

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

const TextContainer = styled.View`
  margin-top: 30px;
  align-items: center;
`;

const EmailContainer = styled.View`
  border-bottom-width: 2;
`;

const CodeContainer = styled.View`
  margin: 50px 0 25px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.TextInput`
  height: 40px;
  width: 50%;
  border-bottom-width: 1;
  text-align: center;
  font-size: 28px;
`;
