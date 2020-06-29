import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomText } from "../custom-text/CustomText";

export const PreviewCard = (props) => {
  const { listing } = props;

  return (
    <Wrapper>
      <TouchableOpacity>
        <Image
          key={listing.listingId}
          source={{
            uri:
              listing.picUrls && listing.picUrls.length
                ? listing.picUrls[0]
                : "https://furni-s3-bucket.s3-ap-southeast-1.amazonaws.com/placeholder-furniture.png",
          }}
        />
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
