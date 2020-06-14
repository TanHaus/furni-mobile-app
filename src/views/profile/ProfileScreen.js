import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser } from "../../actions/auth.js";
import { getUser, deleteUser } from "../../actions/users";
import { getUserListings } from "../../actions/listings";

function ProfileScreen(props) {
  const {
    userId,
    user,
    userListings,
    onPageLoad,
    submitLogout,
    submitDeleteUser,
  } = props;

  useEffect(() => {
    onPageLoad(userId);
  }, [userId]);

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
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      {userListings.map((listing) => (
        <Text key={listing.listingId}>{listing.name}</Text>
      ))}
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
    user: state.users.user,
    userListings: state.listings.userListings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: async (userId) => {
      await dispatch(getUser({ userId }));
      await dispatch(getUserListings({ userId }));
    },
    submitLogout: () => dispatch(logoutUser()),
    submitDeleteUser: (userId) => dispatch(deleteUser(userId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ProfileScreen);
