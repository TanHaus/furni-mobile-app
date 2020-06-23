import React from "react";
import styled from "styled-components/native";
import { CustomText } from "../index";
import { TextWeight } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Color } from "../../styles";

export const ExploreCard = (props) => {
  const { title, src, price, status, likeCount } = props;

  return (
    <Card>
      <Image source={src} />
      <TextContainer>
        <Title weight={TextWeight.Light}>{title}</Title>
        <Description weight={TextWeight.Light}>
          {price} {status}
        </Description>
        <LikeView>
          <MaterialCommunityIcons name="heart-outline" size={35} />
          <LikeCount weight={TextWeight.Bold}>{likeCount}</LikeCount>
        </LikeView>
      </TextContainer>
    </Card>
  );
};

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
const Card = styled.TouchableOpacity`
  margin: 50px 0;
  border: 1px solid ${Color.Palette[6]};
`;

const Image = styled.ImageBackground`
  height: 373px;
`;

const TextContainer = styled.View`
  padding: 10px;
`;

const Title = styled(CustomText.Large)`
  padding-bottom: 5px;
`;

const Description = styled(CustomText.Large)`
  padding-bottom: 5px;
`;

const LikeView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LikeCount = styled(CustomText.Regular)`
  padding-left: 5px;
`;
