import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { createOffer, getOffersByListing } from "actions/offers";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../components";
import { Color } from "../../styles";

function ListingScreen(props) {
  const { route, navigation, listing, listingOffers } = props;
  const listingId = route.params.listingId;

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight="bold">OFFERS</Title>
      </TitleContainer>

      {listingOffers.map((offer) => (
        <Wrapper
          key={offer.offerId}
          onPress={() => navigation.navigate("chat-session")}
        >
          <MainContainer>
            <ProfilePic
              source={require("../../assets/profiles/standard.png")}
            />
            <Container>
              <CustomText.Regular>{`User: fARniture`}</CustomText.Regular>
              <CustomText.Regular>{`Offer Price: $${offer.priceBidded}`}</CustomText.Regular>
              <CustomText.Regular color={Color.Palette[3]}>
                05/18/20
              </CustomText.Regular>
            </Container>
          </MainContainer>
          <StatusContainer>
            <StatusWrapper>
              <StatusText>{offer.status}</StatusText>
            </StatusWrapper>
            <CustomText.Regular color={Color.Palette[3]}>
              Tap to edit
            </CustomText.Regular>
          </StatusContainer>
        </Wrapper>
      ))}
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    listing: state.listings.listing,
    listingOffers: state.offers.listingOffers,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ListingScreen);

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

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
  justify-content: center;
`;

const StatusContainer = styled(Container)`
  align-items: center;
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

const StatusText = styled(CustomText.Regular)`
  color: white;
  text-transform: uppercase;
`;
