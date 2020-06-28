import React, { useState } from "react";
import { Image, View, Modal, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  CustomText,
  SafeAreaViewWrapper,
  Button,
  BackButton,
} from "components";
import { editOffer } from "actions/offers";
import styled from "styled-components/native";
import { Color } from "styles";

function ChatSessionScreen(props) {
  const { route, listing, listingOffers, submitEditOffer } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [editedPriceBidded, setEditedPriceBidded] = useState(
    listingOffers[0].priceBidded
  );
  const handleEditOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      priceBidded: editedPriceBidded,
    });
    setModalVisible(false);
  };
  return (
    <SafeAreaViewWrapper>
      <BackButton onPress={() => navigation.goBack()} />
      {listing.picUrls ? (
        <Image
          source={{ uri: listing.picUrls[0] }}
          key={listing.picUrls[0]}
          style={{
            resizeMode: "contain",
            height: 50,
            width: 50,
          }}
        />
      ) : (
        <View style={{ height: 50, width: 50, backgroundColor: "grey" }} />
      )}
      <CustomText.Regular color={Color.Palette[4]}>
        {listing.title}
      </CustomText.Regular>
      <CustomText.Regular color={Color.Palette[4]}>
        {`S\$${listing.price}`}
      </CustomText.Regular>
      <CustomText.Regular color={Color.Palette[4]}>
        {listing.itemCondition}
      </CustomText.Regular>
      <CustomText.Regular>
        {`You made an offer: S\$${listingOffers[0].priceBidded}`}
      </CustomText.Regular>
      <Button title="Edit" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible}>
        <View>
          <CustomText.Regular color={Color.Palette[4]}>
            Your bid:{" "}
          </CustomText.Regular>
          <Input
            value={editedPriceBidded}
            onChangeText={setEditedPriceBidded}
            keyboardType={"numeric"}
          />
          <Button title="Confirm" onPress={handleEditOffer} />
        </View>
      </Modal>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listing: state.listings.listing,
    listingOffers: state.offers.listingOffers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitEditOffer: (editOfferData) => dispatch(editOffer(editOfferData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ChatSessionScreen);

// =============================================================================
// STYLING
// =============================================================================
const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
`;
