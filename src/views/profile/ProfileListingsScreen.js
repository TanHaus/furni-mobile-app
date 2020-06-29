import React, { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { ListingCardsGrid } from "components";
import { getUserListings } from "actions/users";

function ProfileListingsScreen(props) {
  const { navigation, userListings, loadUserListings } = props;
  useFocusEffect(useCallback(() => {
    loadUserListings();
  }, []));
  return <ListingCardsGrid listings={userListings} navigation={navigation} />;
}

function mapStateToProps(state) {
  return {
    userListings: state.users.userListings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserListings: () => dispatch(getUserListings()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ProfileListingsScreen);

// ---------------------------------------------------------------------------
// STYLING
// ---------------------------------------------------------------------------
