import React, { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { ListingCardsGrid } from "components";
import { getUserListings } from "actions/users";

function ProfileListingsScreen(props) {
  const { navigation, listings, loadUserListings } = props;
  useEffect(() => {
    loadUserListings();
  }, []);
  return <ListingCardsGrid listings={listings} navigation={navigation} />;
}

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
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
const ListingsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
