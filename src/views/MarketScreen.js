import React from "react";
import styled from "styled-components/native";
import { MarketCard } from "../components";

function MarketScreen() {
  const categories = CategoryList.map((category) => {
    return (
      <MarketCard
        key={category.title}
        title={category.title}
        imgSrc={category.src}
      />
    );
  });

  return <CategoryWrapper>{categories}</CategoryWrapper>;
}

export default MarketScreen;

// -----------------------------------------------------------------------------
// CONSTANT DECLARATIONS
// -----------------------------------------------------------------------------
const CategoryList = [
  {
    title: "Bedroom",
    src: require("../../assets/home-screen/bedroom.png"),
  },
  {
    title: "Dining room",
    src: require("../../assets/home-screen/dining-room.png"),
  },
  {
    title: "Bathroom",
    src: require("../../assets/home-screen/bathroom.png"),
  },
  {
    title: "Living room",
    src: require("../../assets/home-screen/living-room.png"),
  },
  {
    title: "Study",
    src: require("../../assets/home-screen/study.png"),
  },
  {
    title: "Kitchen",
    src: require("../../assets/home-screen/kitchen.png"),
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
