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
import { Ionicons } from "@expo/vector-icons";

function EditPreferencesScreen(props) {
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
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>PREFERENCES</Title>
      </TitleContainer>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          Select tags that interest you
        </CustomText.Regular>
        <SearchbarWrapper onPress={() => navigation.navigate("search")}>
          <SearchIcon name="ios-search" />
          <CustomText.Regular color={Color.Palette[4]}>
            Search tags
          </CustomText.Regular>
        </SearchbarWrapper>
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
export default withConnect(EditPreferencesScreen);

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

const SearchbarWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled(Ionicons)`
  padding-right: 10px;
  font-size: 24px;
`;
