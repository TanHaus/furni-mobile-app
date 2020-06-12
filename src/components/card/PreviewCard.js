import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomText } from "../custom-text/CustomText";

export const PreviewCard = (props) => {
  const { title, imgSrc } = props;

  return (
    <TouchableOpacity>
      <Image source={imgSrc}>
        <CustomText.Regular color="white">{title}</CustomText.Regular>
      </Image>
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
