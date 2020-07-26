import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { ExploreCard, Button } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

function ExploreScreen() {
  const [list, setList] = useState(RecommendationList);
  const renderCard = () => {
    return list.length == 0 ? (
      <ExploreCard {...EmptyInfo} />
    ) : (
      <ExploreCard {...list[0]} />
    );
  };

  return (
    <ScrollView style={{ position: "relative" }}>
      {renderCard()}
      <NextButton title="See Next" onPress={() => setList(list.slice(1))} />
    </ScrollView>
  );
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
    title: "White Wooden Chair",
    src: require("../../assets/listings/white-chair.png"),
    price: "$20",
    status: "used",
    likeCount: 30,
  },
  {
    title: "Rattan Chair",
    src: require("../../assets/listings/rattan-chair.png"),
    price: "$35",
    status: "new",
    likeCount: 28,
  },
  {
    title: "Pretty Pink Chair",
    src: require("../../assets/listings/translucent-chair.png"),
    price: "$18",
    status: "new",
    likeCount: 19,
  },
];

const EmptyInfo = {
  title: "There are no recommendations now.",
  price: "Please try again later.",
  likeCount: 0,
};

// =============================================================================
// STYLING
// =============================================================================
const NextButton = styled(Button)`
  position: absolute !important;
`;
