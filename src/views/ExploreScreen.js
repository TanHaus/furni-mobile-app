import React from "react";
import styled from "styled-components/native";
import { ExploreCard } from "../components";

function MarketScreen() {
  const recommendations = RecommendationList.map((category) => {
    return <ExploreCard key={category.title} {...category} />;
  });

  return <ExploreWrapper>{recommendations}</ExploreWrapper>;
}

export default MarketScreen;

// -----------------------------------------------------------------------------
// CONSTANT DECLARATIONS
// -----------------------------------------------------------------------------
const RecommendationList = [
  {
    title: "Purple Chair",
    src: require("../../assets/listings/purple-chair.png"),
    price: "$75",
    status: "used",
    likeCount: 12,
  },
  {
    title: "Bedroom",
    src: require("../../assets/listings/white-chair.png"),
    price: "$20",
    status: "used",
    likeCount: 30,
  },
  {
    title: "Bedroom",
    src: require("../../assets/listings/rattan-chair.png"),
    price: "$35",
    status: "new",
    likeCount: 28,
  },
  {
    title: "Bedroom",
    src: require("../../assets/listings/translucent-chair.png"),
    price: "$18",
    status: "new",
    likeCount: 19,
  },
];

// ---------------------------------------------------------------------------
// STYLING
// ---------------------------------------------------------------------------
const ExploreWrapper = styled.View`
  // display: flex;
`;
