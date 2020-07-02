import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { ListingCardsGrid } from "components";
import { getUserListings } from "actions/users";

function ProfileListingsScreen(props) {
  const {
    navigation,
    userListings,
    getUserListingsLoading,
    loadUserListings,
  } = props;
  useFocusEffect(
    useCallback(() => {
      loadUserListings();
    }, [])
  );
  return (
    <View>
      <ListingCardsGrid listings={userListings} navigation={navigation} />
      {getUserListingsLoading && <StyledActivityIndicator size="large" />}
    </View>
  );
}

function mapStateToProps(state) {
  return {
    userListings: state.users.userListings,
    getUserListingsLoading: state.users.getUserListingsLoading,
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
const StyledActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;
