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

function SortAndFilterScreen(props) {
  const { navigation, submitSearch } = props;
  const [searchString, setSearchString] = useState("");
  const handleSubmitSearch = () => {
    submitSearch(searchString);
    navigation.navigate("search-results", { searchString: searchString }); // should only navigate if the fetch response is successful.
  };
  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>SORT & FILTER</Title>
      </TitleContainer>
      <Header weight={TextWeight.SemiBold}>SORT BY</Header>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>Popular</CustomTitle>
        </CustomButton>
      </CustomContainer>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>Recent</CustomTitle>
        </CustomButton>
      </CustomContainer>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>
            Price - High to Low
          </CustomTitle>
        </CustomButton>
      </CustomContainer>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>
            Price - Low to High
          </CustomTitle>
        </CustomButton>
      </CustomContainer>
      <CustomContainer />
      <Header weight={TextWeight.SemiBold}>FILTER BY</Header>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>Condition</CustomTitle>
          <CustomText.Regular color={Color.Palette[4]}>
            Choose
          </CustomText.Regular>
        </CustomButton>
      </CustomContainer>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>Minimum Price</CustomTitle>
          <CustomText.Regular color={Color.Palette[4]}>
            Set a price
          </CustomText.Regular>
        </CustomButton>
      </CustomContainer>
      <CustomContainer>
        <CustomButton onPress={null}>
          <CustomTitle weight={TextWeight.Semibold}>Maximum Price</CustomTitle>
          <CustomText.Regular color={Color.Palette[4]}>
            Set a price
          </CustomText.Regular>
        </CustomButton>
      </CustomContainer>
      <CustomContainer />
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
    submitSearch: (searchString) => dispatch(getListings(searchString)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SortAndFilterScreen);

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Header = styled(CustomText.Large)`
  padding: 0 0 10px 10px;
  margin-top: 30px;
`;

const CustomContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${Color.Palette[5]};
`;

const CustomButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CustomTitle = styled(CustomText.Regular)`
  padding: 10px;
`;
