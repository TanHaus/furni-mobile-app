import React from "react";
import styled from "styled-components/native";
import { CustomText } from "../index";
import { Color } from "../../styles";

export const ChatCard = (props) => {
  const {
    sellerName,
    listingName,
    lastMessage,
    lastActiveDate,
    imgSrc,
    status,
    profilePic,
  } = props.session;

  const renderStatus = () => {
    if (status) {
      return (
        <StatusWrapper>
          <StatusText>{status}</StatusText>
        </StatusWrapper>
      );
    }
  };

  return (
    <Wrapper onPress={props.onPress}>
      <MainContainer>
        <ProfilePic source={profilePic} />
        <Container>
          <CustomText.Regular>{sellerName}</CustomText.Regular>
          <CustomText.Regular weight="bold">{listingName}</CustomText.Regular>
          <CustomText.Regular>{lastMessage}</CustomText.Regular>
          {renderStatus()}
        </Container>
      </MainContainer>
      <Container>
        <CustomText.Small>
          {lastActiveDate.toLocaleDateString()}
        </CustomText.Small>
        <ListingImage source={imgSrc} />
      </Container>
    </Wrapper>
  );
};

// ===========================================================================
// STYLING
// ===========================================================================
const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin: 7px 0;
  justify-content: space-between;
  width: 100%;
`;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfilePic = styled.ImageBackground`
  height: 65px;
  width: 65px;
  border-radius: 150px;
  overflow: hidden;
  margin-right: 20px;
`;

const Container = styled.View`
  flex-direction: column;
`;

const StatusWrapper = styled.View`
  background-color: ${Color.Palette[1]};
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  align-self: flex-start;
  padding: 2.5px 10px;
`;

const StatusText = styled(CustomText.Small)`
  color: white;
`;

const ListingImage = styled.ImageBackground`
  height: 60px;
`;
