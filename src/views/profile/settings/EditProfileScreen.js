import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { getUser, editUser } from "../../../actions/users";

function EditProfileScreen(props) {
  const { navigation, userId, user, loadUserData, submitEditData } = props;
  const [editUser, setEditUser] = useState({ name: "", email: "" });

  useEffect(() => {
    loadUserData(userId);
  }, [userId]);

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  return (
    <SafeAreaView style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Ionicons
        name="ios-arrow-back"
        size={24}
        color="black"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: 18 }}
      >
        Edit my account
      </Text>
      <Text
        style={{
          color: "#d0d0d0",
          textTransform: "uppercase",
          fontSize: 16,
          paddingTop: 20,
        }}
      >
        Username
      </Text>
      <TextInput
        style={{ height: 40, borderBottomWidth: 1 }}
        value={editUser.name}
        onChangeText={(text) => setEditUser({ ...editUser, name: text })}
      />
      <Text
        style={{
          color: "#d0d0d0",
          textTransform: "uppercase",
          fontSize: 16,
          paddingTop: 20,
        }}
      >
        Email
      </Text>
      <TextInput
        style={{ height: 40, borderBottomWidth: 1 }}
        disabled={true}
        value={editUser.email}
        onChangeText={(text) => setEditUser({ ...editUser, email: text })}
      />
      <Button
        title="Confirm changes"
        onPress={() => submitEditData(editUser)}
        backgroundColor="black"
        color="white"
      />
    </SafeAreaView>
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

const Button = (props) => (
  <ButtonWrapper
    onPress={props.onPress}
    backgroundColor={props.backgroundColor}
    borderColor={props.borderColor}
  >
    <ButtonText color={props.color}>{props.title}</ButtonText>
  </ButtonWrapper>
);

const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  border: 2px solid
    ${(props) => (!!props.borderColor ? props.borderColor : "black")};
  padding: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.color};
  text-align: center;
`;
