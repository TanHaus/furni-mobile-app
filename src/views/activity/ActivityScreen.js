import React from "react";
import styled from "styled-components/native";
import { CustomText, SafeAreaViewWrapper, ActivityCard } from "components";
import { ScrollView } from "react-native-gesture-handler";

function ActivityScreen(props) {
  const renderActivityCards = () => {
    const activities = ACTIVITY_ATTRIBUTES.map((activity, index) => {
      return <ActivityCard key={index} activity={activity} />;
    });
    return activities;
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <ScreenTitle weight="bold">ACTIVITY</ScreenTitle>
      </TitleContainer>
      <ScrollView>{renderActivityCards()}</ScrollView>
    </SafeAreaViewWrapper>
  );
}

export default ActivityScreen;

// =============================================================================
// CONSTANTS
// =============================================================================
const ACTIVITY_ATTRIBUTES = [
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "furnee",
    action: " liked your listing ",
    listingName: "Purple Chair. ",
    lastSeen: "9m",
    imgSrc: require("../../assets/listings/purple-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "KAEI",
    action: " left you a review. ",
    lastSeen: "16m",
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "LDR1002",
    action: " made an offer to your listing ",
    listingName: "Rattan Chair. ",
    lastSeen: "31m",
    imgSrc: require("../../assets/listings/rattan-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "fARniture",
    action: " rejected your offer for ",
    listingName: "Modern Chair. ",
    lastSeen: "1h",
    imgSrc: require("../../assets/listings/translucent-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "fARniture",
    action: " lowered the price of ",
    listingName: "Modern Chair. ",
    lastSeen: "3d",
    imgSrc: require("../../assets/listings/translucent-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "melodrama99",
    action: " raised the price of  ",
    listingName: "Plastic Chair. ",
    lastSeen: "3d",
    imgSrc: require("../../assets/listings/white-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "billyiash",
    action: " liked your listing ",
    listingName: "Purple Chair. ",
    lastSeen: "4d",
    imgSrc: require("../../assets/listings/purple-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "eastcoast91",
    action: " liked your listing ",
    listingName: "Purple Chair. ",
    lastSeen: "5d",
    imgSrc: require("../../assets/listings/purple-chair.png"),
  },
  {
    profilePic: require("../../assets/profiles/standard.png"),
    buyerName: "selenanana",
    action: " accepted your offer for ",
    listingName: "Ancient Chair. ",
    lastSeen: "1y",
    imgSrc: require("../../assets/listings/rattan-chair.png"),
  },
];

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
`;

const ScreenTitle = styled(CustomText.Large)`
  padding-left: 10px;
`;
