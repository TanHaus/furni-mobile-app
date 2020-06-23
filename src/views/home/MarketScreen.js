import React from "react";
import { Button, View } from "react-native";
import styled from "styled-components/native";
import { MarketCard } from "../../components";

function MarketScreen(props) {
  const categories = CategoryList.map((category) => {
    return (
      <MarketCard
        key={category.title}
        title={category.title}
        imgSrc={category.src}
      />
    );
  });

  return (
    <View>
      <CategoryWrapper>{categories}</CategoryWrapper>
    </View>
  );
}

export default MarketScreen;

// -----------------------------------------------------------------------------
// CONSTANT DECLARATIONS
// -----------------------------------------------------------------------------
const CategoryList = [
  {
    title: "Bedroom",
    src: require("../../assets/categories/bedroom.png"),
  },
  {
    title: "Dining room",
    src: require("../../assets/categories/dining-room.png"),
  },
  {
    title: "Bathroom",
    src: require("../../assets/categories/bathroom.png"),
  },
  {
    title: "Living room",
    src: require("../../assets/categories/living-room.png"),
  },
  {
    title: "Study",
    src: require("../../assets/categories/study.png"),
  },
  {
    title: "Kitchen",
    src: require("../../assets/categories/kitchen.png"),
  },
];

// ---------------------------------------------------------------------------
// STYLING
// ---------------------------------------------------------------------------
const CategoryWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
