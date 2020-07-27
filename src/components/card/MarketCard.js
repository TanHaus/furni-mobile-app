import React from "react";
import styled from "styled-components/native";
import { CustomText } from "../custom-text/CustomText";

export const MarketCard = (props) => {
  const { title, imgSrc, onPress } = props;

  return (
    <Wrapper onPress={onPress}>
      <Image source={imgSrc}>
        <Overlay>
          <CustomText.Regular color="white">{title}</CustomText.Regular>
        </Overlay>
      </Image>
    </Wrapper>
  );
};

// =============================================================================
// STYLING
// =============================================================================
const Wrapper = styled.TouchableOpacity`
  margin: 10px;
`;

const Image = styled.ImageBackground`
  height: 120px;
  width: 150px;
`;

const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
