import React, { useState } from "react";
import { connect } from "react-redux";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "components";
import { TextWeight } from "components/types";
import { Picker } from "@react-native-community/picker";
import { Color } from "styles";
import { getListings } from "actions/listings";

function SortAndFilterScreen(props) {
  const { navigation, submitSortAndFilter, route } = props;
  const {
    searchString,
    prevSort,
    prevMaxPrice,
    prevCondition,
    prevMinPrice,
  } = route.params;

  const [sort, setSort] = useState(prevSort || SortAttributes[0].value);
  const [condition, setCondition] = useState(
    prevCondition || ConditionAttributes[0].value
  );
  const [maxPrice, setMaxPrice] = useState(prevMaxPrice || "");
  const [minPrice, setMinPrice] = useState(prevMinPrice || "");

  const handleSortAndFilter = () => {
    submitSortAndFilter({
      searchString,
      sort,
      condition,
      maxPrice,
      minPrice,
    });
    navigation.navigate("search-results", {
      searchString,
      prevSort: sort,
      prevCondition: condition,
      prevMaxPrice: maxPrice,
      prevMinPrice: minPrice,
    });
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>SORT & FILTER</Title>
      </TitleContainer>
      <Header weight={TextWeight.SemiBold}>SORT BY</Header>
      <CustomContainer>
        <Picker
          selectedValue={sort}
          onValueChange={(value, index) => setSort(value)}
        >
          {SortAttributes.map((condition) => (
            <Picker.Item
              key={condition.value}
              label={condition.label}
              value={condition.value}
            />
          ))}
        </Picker>
      </CustomContainer>
      <CustomContainer />

      <Header weight={TextWeight.SemiBold}>FILTER BY</Header>
      <CustomContainer>
        <CustomTitle weight={TextWeight.Semibold}>Item Condition</CustomTitle>
        <Picker
          selectedValue={condition}
          onValueChange={(value, index) => setCondition(value)}
        >
          {ConditionAttributes.map((condition) => (
            <Picker.Item
              key={condition.value}
              label={condition.label}
              value={condition.value}
            />
          ))}
        </Picker>
      </CustomContainer>

      <CustomContainer>
        <CustomTitle weight={TextWeight.Semibold}>Minimum Price</CustomTitle>
        <Input
          value={minPrice}
          placeholder="Set a price"
          onChangeText={setMinPrice}
          keyboardType="numeric"
        />
      </CustomContainer>
      <CustomContainer>
        <CustomTitle weight={TextWeight.Semibold}>Maximum Price</CustomTitle>
        <Input
          value={maxPrice}
          placeholder="Set a price"
          onChangeText={setMaxPrice}
          keyboardType="numeric"
        />
      </CustomContainer>
      <CustomContainer />
      <Button title="Apply sort and filter" onPress={handleSortAndFilter} />
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
    submitSortAndFilter: (searchString) => dispatch(getListings(searchString)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SortAndFilterScreen);

// =============================================================================
// CONSTANTS
// =============================================================================
const SortAttributes = [
  {
    label: "Popular",
    value: "liked_descending",
  },
  {
    label: "Recent",
    value: "timeCreated_descending",
  },
  {
    label: "Price - High to Low",
    value: "price_descending",
  },
  {
    label: "Price - Low to High",
    value: "price_ascending",
  },
];

const ConditionAttributes = [
  {
    label: "-",
    value: "",
  },
  {
    label: "New",
    value: "new",
  },
  {
    label: "Used",
    value: "used",
  },
];

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

const CustomTitle = styled(CustomText.Regular)`
  padding: 10px 0 0 10px;
`;

const Input = styled.TextInput`
  padding: 0 0 5px 10px;
`;
