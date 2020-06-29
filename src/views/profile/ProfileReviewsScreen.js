import React from "react";
import styled from "styled-components/native";
import { CustomText, MarketCard } from "../../components";

function ProfileReviewsScreen() {
  return (
    <CategoryWrapper>
      <CustomText.Large>You have no reviews currently</CustomText.Large>
    </CategoryWrapper>
  );
}

export default ProfileReviewsScreen;

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
