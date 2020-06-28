import React, { useState, useEffect } from "react";
import { Dimensions, Modal, View, Image } from "react-native";
import { connect } from "react-redux";
import { getListing } from "actions/listings";
import { getOffersByListing, createOffer, editOffer } from "actions/offers";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "components";
import { TextWeight } from "../../components/custom-text/types";
import { Color } from "../../styles";

function ListingScreen(props) {
  const {
    route,
    navigation,
    user,
    listing,
    listingOffers,
    loadListingData,
    loadOffersData,
    submitCreateOffer,
  } = props;

  const deviceWidth = Dimensions.get("window").width;
  const listingId = route.params.listingId;
  const [isSeller, setIsSeller] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [priceBidded, setPriceBidded] = useState("");

  useEffect(() => {
    loadListingData(listingId);
    setIsSeller(listing.sellerId === user.userId);
    loadOffersData({ listingId, buyerId: user.userId });
  }, []);

  const handleCreateOffer = () => {
    submitCreateOffer({
      listingId: listing.listingId,
      priceBidded,
      setModalVisible,
    });
  };

  return (
    <SafeAreaViewWrapper>
      <Modal visible={modalVisible}>
        <View>
          <CustomText.Regular color={Color.Palette[4]}>
            Your bid:{" "}
          </CustomText.Regular>
          <Input value={priceBidded} onChangeText={setPriceBidded} />
          <Button title="Confirm" onPress={handleCreateOffer} />
        </View>
      </Modal>
      <BackButton onPress={() => navigation.goBack()} />
      {listing.picUrls ? (
        <Image
          source={{ uri: listing.picUrls[0] }}
          key={listing.picUrls[0]}
          style={{ width: deviceWidth, height: deviceWidth }}
        />
      ) : (
        <View style={{ height: 50, width: 50, backgroundColor: "grey" }} />
      )}
      <CustomText.Regular color={Color.Palette[4]}>
        {listing.title}
      </CustomText.Regular>
      <CustomText.Regular color={Color.Palette[4]}>
        {listing.price}
      </CustomText.Regular>
      <CustomText.Regular color={Color.Palette[4]}>
        {listing.itemCondition}
      </CustomText.Regular>
      {isSeller ? (
        listingOffers.length ? (
          <Button
            title="View offers"
            onPress={() => navigation.navigate("listing-offers", { listingId })}
          />
        ) : (
          <Button title="No offer" />
        )
      ) : listingOffers.length ? (
        <Button
          title="Go to chat"
          onPress={() => navigation.navigate("chat-session", { listingId })}
        />
      ) : (
        <Button title="Make offer" onPress={() => setModalVisible(true)} />
      )}
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
  return {
    loadListingData: (listingId) => dispatch(getListing(listingId)),
    loadOffersData: (params) => dispatch(getOffersByListing(params)),
    submitCreateOffer: (offerData) => dispatch(createOffer(offerData)),
  };
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
