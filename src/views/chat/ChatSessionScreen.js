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
  const { route, navigation, listing, listingOffers, submitEditOffer } = props;
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
      <Button
        title="Edit"
        type="secondary"
        onPress={() => setModalVisible(true)}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <CenteredView>
          <ModalView>
            <CustomText.Regular color={Color.Palette[4]}>
              Your bid:{" "}
            </CustomText.Regular>
            <Input
              value={editedPriceBidded.toString()}
              onChangeText={setEditedPriceBidded}
              keyboardType={"numeric"}
            />
            <Button title="Confirm" onPress={handleEditOffer} />
            <Button
              title="Cancel"
              type="secondary"
              onPress={() => setModalVisible(false)}
            />
          </ModalView>
        </CenteredView>
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
    submitDeleteOffer: (offerId) => dispatch(deleteOffer(offerId)),
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
  width: 100px;
  margin-bottom: 15px;
  text-align: center;
`;

const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ModalView = styled.View`
  margin: 20px;
  padding: 30px;
  width: 80%;
  align-items: center;
  background-color: white;
`;
