import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomText } from "../custom-text/CustomText";

export const PreviewCard = (props) => {
  const { listing } = props;

  return (
    <Wrapper>
      <TouchableOpacity>
        {listing.picUrls ? (
          <Image source={{ uri: listing.picUrls[0] }} />
        ) : (
          <View style={{ height: 50, width: 50, backgroundColor: "grey" }} />
        )}
        <CustomText.Regular>{listing.title}</CustomText.Regular>
        <Container>
          <CustomText.Regular weight="bold">
            ${listing.price}{" "}
          </CustomText.Regular>
          <CustomText.Regular>{listing.itemCondition}</CustomText.Regular>
        </Container>
      </TouchableOpacity>
    </Wrapper>
  );
};

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const Wrapper = styled.View`
  margin-bottom: 15px;
`;

const Image = styled.ImageBackground`
  height: 160px;
  width: 160px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;
