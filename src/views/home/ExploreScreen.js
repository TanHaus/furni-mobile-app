import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { ExploreCard } from "../../components";

function ExploreScreen() {
  const recommendations = RecommendationList.map((listing) => {
    return <ExploreCard key={listing.title} {...listing} />;
  });

  return <View>{recommendations}</View>;
}

export default ExploreScreen;

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
    title: "Purple Chair 2",
    src: require("../../assets/listings/white-chair.png"),
    price: "$20",
    status: "used",
    likeCount: 30,
  },
  {
    title: "Purple Chair 3",
    src: require("../../assets/listings/rattan-chair.png"),
    price: "$35",
    status: "new",
    likeCount: 28,
  },
  {
    title: "Purple Chair 4",
    src: require("../../assets/listings/translucent-chair.png"),
    price: "$18",
    status: "new",
    likeCount: 19,
  },
];
