import React from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { CustomText, SafeAreaViewWrapper, ListingCardsGrid } from "components";
import { Ionicons } from "@expo/vector-icons";

function SearchScreen(props) {
  const {
    navigation,
    submitSearch,
    route,
    listings,
    getListingsLoading,
  } = props;
  const {
    searchString,
    prevSort,
    prevMaxPrice,
    prevCondition,
    prevMinPrice,
  } = route.params;

  return (
    <SafeAreaViewWrapper>
      <SearchbarWrapper onPress={() => navigation.navigate("search")}>
        <SearchIcon name="ios-search" />
        <CustomText.Regular>{searchString}</CustomText.Regular>
      </SearchbarWrapper>
      <SortButton
        onPress={() =>
          navigation.navigate("sort-and-filter", {
            searchString,
            prevSort,
            prevMaxPrice,
            prevCondition,
            prevMinPrice,
          })
        }
      >
        <SearchIcon name="ios-funnel" />
        <CustomText.Regular>Sort & Filter</CustomText.Regular>
      </SortButton>
      <View>
        <ListingCardsGrid listings={listings} navigation={navigation} />
        {getListingsLoading && <StyledActivityIndicator size="large" />}
      </View>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
    getListingsLoading: state.listings.getListingsLoading,
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
