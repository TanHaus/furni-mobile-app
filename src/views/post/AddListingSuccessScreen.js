import React from "react";
import styled from "styled-components/native";
import {
  Button,
  CustomText,
  SafeAreaViewWrapper,
  PreviewCard,
} from "components";
import { TextWeight } from "components/types";

function AddListingSuccessScreen(props) {
  const { navigation, route } = props;
  const { listing } = route.params;

  return (
    <SafeAreaViewWrapper>
      <Title weight={TextWeight.Bold}>LISTING PUBLISHED</Title>

      <ListingsWrapper>
        <PreviewCard listing={listing} />
      </ListingsWrapper>
      <Subtitle>What would you like to do next?</Subtitle>
      <Button
        title="Add another listing"
        onPress={() => navigation.navigate("Add")}
      />
      <Button
        title="Go to Profile"
        type="secondary"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Go to Home"
        type="secondary"
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaViewWrapper>
  );
}

export default AddListingSuccessScreen;

// =============================================================================
// STYLING
// =============================================================================
const Title = styled(CustomText.XLarge)`
  margin: 100px 0 30px;
  text-align: center;
`;

const Subtitle = styled(CustomText.Large)`
  margin-bottom: 10px;
  text-align: center;
`;

const ListingsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 30px;
`;
