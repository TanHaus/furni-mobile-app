import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomText } from "../custom-text/CustomText";

export const PreviewCard = (props) => {
  const { listing } = props;

  return (
    <TouchableOpacity>
      {listing.picUrls ? (
        <Image source={listing.picUrls[0]} />
      ) : (
        <View style={{ height: 50, width: 50, backgroundColor: "grey" }} />
      )}
      <CustomText.Regular color="white">{listing.title}</CustomText.Regular>
    </TouchableOpacity>
  );
};

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const Image = styled.ImageBackground`
  height: 120px;
  width: 160px;
  alignitems: center;
  justifycontent: center;
`;
