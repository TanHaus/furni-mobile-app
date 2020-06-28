import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { CustomText, SafeAreaViewWrapper, ListingCardsGrid } from "components";
import { Ionicons } from "@expo/vector-icons";

function SearchScreen(props) {
  const { navigation, submitSearch, route, listings } = props;
  const { searchString } = route.params;

  return (
    <SafeAreaViewWrapper>
      <SearchbarWrapper onPress={() => navigation.navigate("search")}>
        <SearchIcon name="ios-search" />
        <CustomText.Regular>{searchString}</CustomText.Regular>
      </SearchbarWrapper>
      <SortButton onPress={() => navigation.navigate("sort-and-filter")}>
        <SearchIcon name="ios-funnel" />
        <CustomText.Regular>Sort & Filter</CustomText.Regular>
      </SortButton>
      <ListingCardsGrid listings={listings} navigation={navigation} />
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SearchScreen);

// =============================================================================
// STYLING
// =============================================================================

const SearchbarWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  margin-top: 10px;
`;

const SearchIcon = styled(Ionicons)`
  padding-right: 10px;
  font-size: 24px;
`;

const SortButton = styled.TouchableOpacity`
  width: 130px;
  flex-direction: row;
  align-items: center;
  border: 1.5px solid black;
  padding: 7.5px;
  margin: 15px 0;
  border-radius: 10px;
`;
