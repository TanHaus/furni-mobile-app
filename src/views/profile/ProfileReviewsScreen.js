import React from "react";
import styled from "styled-components/native";
import { CustomText, MarketCard } from "../../components";

function ProfileReviewsScreen() {
  return (
    <CategoryWrapper>
      <CustomText.Large>You have no reviews currently.</CustomText.Large>
    </CategoryWrapper>
  );
}

export default ProfileReviewsScreen;

// =============================================================================
// STYLING
// =============================================================================
const CategoryWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
