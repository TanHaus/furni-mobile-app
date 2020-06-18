import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser } from "../../actions/auth.js";
import { getUser, deleteUser } from "../../actions/users";
import { getUserListings } from "../../actions/users";
import { SafeAreaViewWrapper } from "../../components";

function ProfileScreen(props) {
  const {
    userId,
    user,
    userListings,
    loadUserData,
    submitLogout,
    submitDeleteUser,
  } = props;

  useEffect(() => {
    loadUserData(userId);
  }, [userId]);

  const handleLogout = () => {
    submitLogout();
  };
  const handleDeleteUser = () => {
    submitDeleteUser(userId);
    submitLogout();
  };

  return (
    <SafeAreaViewWrapper
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ProfileDescription>
        <Image source={require("../../../assets/splash.png")} />

        <Text>{user.name}</Text>
        <Text>★★★★★</Text>
      </ProfileDescription>

      <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        My listings:{" "}
      </Text>

      {userListings.map((listing) => (
        <Text key={listing.listingId}>{listing.title}</Text>
      ))}
      <Button title="Log out" onPress={handleLogout} />
      <Button
        title="Deactivate account (ACTION IS IRREVERSIBLE)"
        onPress={handleDeleteUser}
      />
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
    user: state.users.user,
    userListings: state.users.userListings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserData: async (userId) => {
      await dispatch(getUser(userId));
      await dispatch(getUserListings(userId));
    },
    submitLogout: () => dispatch(logoutUser()),
    submitDeleteUser: (userId) => dispatch(deleteUser(userId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ProfileScreen);

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const ProfileDescription = styled.View``;

const Image = styled.ImageBackground`
  height: 50px;
  object-fit: cover;
  border: 1px solid blue;
`;
