import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../../components";
import styled from "styled-components/native";
import { TextWeight } from "../../../components/custom-text/types";
import { Color } from "../../../styles";

import { getUser, editUser } from "../../../actions/users";

function EditProfileScreen(props) {
  const { navigation, userId, user, loadUserData, submitEditData } = props;
  const [editUser, setEditUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadUserData(userId);
  }, [userId]);

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>PROFILE</Title>
      </TitleContainer>
      <Image source={require("../../../assets/listings/purple-chair.png")} />
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          USERNAME
        </CustomText.Regular>
        <Input
          value={editUser.name}
          onChangeText={(text) => setEditUser({ ...editUser, name: text })}
        />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>EMAIL</CustomText.Regular>
        <Input
          disabled={true}
          value={editUser.email}
          onChangeText={(text) => setEditUser({ ...editUser, email: text })}
        />
      </Container>
      <PasswordContainer>
        <CustomText.Regular>
          Enter your password to confirm the changes.
        </CustomText.Regular>
        <Input value={password} onChangeText={setPassword} />
      </PasswordContainer>
      <Button
        title="Confirm changes"
        onPress={() => submitEditData(editUser)}
      />
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
    user: state.users.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserData: (userId) => dispatch(getUser(userId)),
    submitEditData: (editData) => dispatch(editUser(editData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(EditProfileScreen);

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

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
`;

const Container = styled.View`
  margin-top: 30px;
`;

const PasswordContainer = styled.View`
  margin: 80px 0 20px 0;
`;

const Image = styled.ImageBackground`
  height: 150px;
  width: 150px;
  border-radius: 300px;
  overflow: hidden;
  margin-left: 25%;
`;
