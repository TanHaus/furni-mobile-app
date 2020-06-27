import React, { useState } from "react";
import { connect } from "react-redux";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../components";
import { TextWeight } from "../../components/types";
import { Color } from "../../styles";
import { getListings } from "../../actions/listings";

function SearchScreen(props) {
  const { navigation, submitSearch } = props;
  const [searchString, setSearchString] = useState("");
  const handleSubmitSearch = () => {
    submitSearch({ searchString, props });
    navigation.navigate("search-results", { searchString: searchString }); // should only navigate if the fetch response is successful.
  };
  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>SEARCH</Title>
      </TitleContainer>
      <CustomText.Regular color={Color.Palette[4]}>
        ENTER SEARCH KEYWORD
      </CustomText.Regular>
      <TextInput
        style={{ height: 40, borderBottomWidth: 1 }}
        value={searchString}
        onChangeText={setSearchString}
      />
      <Button title="Search" onPress={handleSubmitSearch} />
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitSearch: ({ searchString, props }) =>
      dispatch(getListings({ searchString, props })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SearchScreen);

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;
