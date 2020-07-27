import React, { useState, useEffect } from "react";
import { Dimensions, Modal, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getListing } from "actions/listings";
import { createOffer, getOffersByListing } from "actions/offers";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../components";
import { Picker } from "@react-native-community/picker";
import { TextWeight } from "../../components/custom-text/types";
import { Color } from "../../styles";

function ListingScreen(props) {
  const { route, navigation, listing, listingOffers } = props;
  const listingId = route.params.listingId;

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <ProfilePic source={require("../../assets/profiles/standard.png")} />
        <CustomText.Large weight="bold">{"Furni"}</CustomText.Large>
      </TitleContainer>
      <ListingContainer>
        {listing.picUrls && (
          <Image
            source={{ uri: listing.picUrls[0] }}
            key={listing.picUrls[0]}
            style={{
              resizeMode: "contain",
              height: 50,
              width: 50,
            }}
          />
        )}
        <TextContainer>
          <CustomText.Regular>{listing.title}</CustomText.Regular>
          <CustomText.Regular weight="bold">
            {`S\$${listing.price}`}
          </CustomText.Regular>
          <CustomText.Regular>{listing.itemCondition}</CustomText.Regular>
        </TextContainer>
      </ListingContainer>
      {listingOffers.map((offer) => (
        <TouchableOpacity
          key={offer.offerId}
          onPress={() => navigation.navigate("chat-session")}
        >
          <CustomText.Regular color={Color.Palette[4]}>
            {`offerId: ${offer.offerId}`}
          </CustomText.Regular>
          <CustomText.Regular color={Color.Palette[4]}>
            {`priceBidded: ${offer.priceBidded}`}
          </CustomText.Regular>
          <CustomText.Regular color={Color.Palette[4]}>
            {`status: ${offer.status}`}
          </CustomText.Regular>
        </TouchableOpacity>
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
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
`;

const Container = styled.View`
  margin-top: 30px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const RegisterText = styled(CustomText.Small)`
  text-decoration-line: underline;
`;

const ProfilePic = styled.ImageBackground`
  height: 30px;
  width: 30px;
  border-radius: 150px;
  overflow: hidden;
  margin: 0 10px;
`;

const ListingContainer = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;
