import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import styled from "styled-components/native";
import { MarketCard } from "../../components";
import { getListings } from "actions/listings";

function MarketScreen(props) {
  const { navigation, submitSearch } = props;

  const handleOnPress = (category) => () => {
    submitSearch({ searchString: category, props });
    navigation.navigate("search-results", { searchString: category });
  };

  const categories = CategoryList.map((category) => {
    return (
      <MarketCard
        key={category.title}
        title={category.title}
        imgSrc={category.src}
        onPress={handleOnPress(category.title)}
      />
    );
  });

  return (
    <View>
      <CategoryWrapper>{categories}</CategoryWrapper>
    </View>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    submitSearch: ({ searchString, props }) =>
      dispatch(getListings({ searchString, props })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(MarketScreen);

// export default MarketScreen;

// =============================================================================
// CONSTANTS
// =============================================================================
const CategoryList = [
  {
    title: "Contemporary",
    src: require("../../assets/categories/contemporary.jpg"),
  },
  {
    title: "Farmhouse",
    src: require("../../assets/categories/farmhouse.jpg"),
  },
  {
    title: "Mediterranean",
    src: require("../../assets/categories/mediterranean.jpg"),
  },
  {
    title: "Midcentury",
    src: require("../../assets/categories/midcentury.jpg"),
  },
  {
    title: "Traditonal",
    src: require("../../assets/categories/traditional.jpg"),
  },
  {
    title: "Tropical",
    src: require("../../assets/categories/tropical.jpg"),
  },
];

// =============================================================================
// STYLING
// =============================================================================
const CategoryWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
