import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser } from "../actions/auth";
import { deleteUser } from "../actions/users";

function ProfileScreen(props) {
  const { userId, submitLogout, submitDeleteUser } = props;
  const handleLogout = () => {
    submitLogout();
  };
  const handleDeleteUser = () => {
    submitDeleteUser(userId);
    submitLogout();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Profile!</Text>
      <Button title="Log out" onPress={handleLogout} />
      <Button
        title="Deactivate account (ACTION IS IRREVERSIBLE)"
        onPress={handleDeleteUser}
      />
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogout: () => dispatch(logoutUser()),
    submitDeleteUser: (userId) => dispatch(deleteUser(userId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ProfileScreen);
