import React from "react";
import styled from "styled-components/native";
import { CustomText } from "../index";
import { Color } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ActivityCard = (props) => {
  const {
    profilePic,
    buyerName,
    action,
    listingName,
    lastSeen,
    imgSrc,
  } = props.activity;

  return (
    <Wrapper>
      <MainContainer>
        <TouchableOpacity>
          <ProfilePic source={profilePic} />
        </TouchableOpacity>
        <ActivityContainer>
          <CustomText.Regular>
            <CustomText.Regular weight="bold" onPress={null}>
              {buyerName}
            </CustomText.Regular>
            {action}
            <CustomText.Regular weight="bold" onPress={null}>
              {listingName}
            </CustomText.Regular>
            <CustomText.Regular color={Color.Palette[4]}>
              {lastSeen}
            </CustomText.Regular>
          </CustomText.Regular>
        </ActivityContainer>
      </MainContainer>
      <TouchableOpacity>
        <ListingImage source={imgSrc} />
      </TouchableOpacity>
    </Wrapper>
  );
};

// ===========================================================================
// STYLING
// ===========================================================================
const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
`;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
`;

const ProfilePic = styled.ImageBackground`
  height: 60px;
  width: 60px;
  border-radius: 150px;
  overflow: hidden;
  margin-right: 20px;
`;

const ActivityContainer = styled.View`
  width: 70%;
`;

const ListingImage = styled.ImageBackground`
  height: 60px;
  width: 60px;
`;
