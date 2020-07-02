import React, { useState, useEffect } from "react";
import { Image, View, Modal, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import { getOffersByListing, editOffer, deleteOffer } from "actions/offers";
import {
  CustomText,
  SafeAreaViewWrapper,
  Button,
  BackButton,
} from "components";
import styled from "styled-components/native";
import { Color } from "styles";

function ChatSessionScreen(props) {
  const {
    route,
    navigation,
    user,
    listing,
    listingOffers,
    submitEditOffer,
    submitDeleteOffer,
    loadOffersData,
  } = props;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editedPriceBidded, setEditedPriceBidded] = useState(
    listingOffers.length ? listingOffers[0].priceBidded : null
  );
  const isSeller = listing.sellerId === user.userId;

  useEffect(() => {
    loadOffersData({
      listingId: listing.listingId,
      buyerId: isSeller ? "" : user.userId,
    });
  }, [listing]);

  const handleEditOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      priceBidded: editedPriceBidded,
    });
    setModalVisible(false);
  };

  const handleAcceptOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      status: "accepted",
    });
    setModalVisible(false);
  };

  const handleRejectOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      status: "rejected",
    });
    setModalVisible(false);
  };

  const handleDeleteOffer = () => {
    submitDeleteOffer(listingOffers[0].offerId);
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
      {listingOffers.length ? (
        isSeller ? (
          <View>
            <CustomText.Regular>
              {`You have an offer: S\$${listingOffers[0].priceBidded}`}
            </CustomText.Regular>
            <CustomText.Regular>Status</CustomText.Regular>
            <CustomText.Regular>{listingOffers[0].status}</CustomText.Regular>
            <Button title="Accept" onPress={() => handleAcceptOffer()} />
            <Button
              title="Reject"
              type="secondary"
              onPress={() => handleRejectOffer()}
            />
          </View>
        ) : (
          <View>
            <CustomText.Regular>
              {`You made an offer: S\$${listingOffers[0].priceBidded}`}
            </CustomText.Regular>
            <CustomText.Regular>Status</CustomText.Regular>
            <CustomText.Regular>{listingOffers[0].status}</CustomText.Regular>
            {listingOffers[0].status === "accepted" ? (
              <View />
            ) : listingOffers[0].status === "rejected" ? (
              <View>
                <Button
                  title="Make a new offer"
                  onPress={() => setCreateModalVisible(true)}
                />
                <Modal
                  visible={createModalVisible}
                  animationType="slide"
                  transparent={true}
                >
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
                        onPress={() => setCreateModalVisible(false)}
                      />
                    </ModalView>
                  </CenteredView>
                </Modal>
              </View>
            ) : (
              <View>
                <Button
                  title="Edit"
                  type="secondary"
                  onPress={() => setEditModalVisible(true)}
                />
                <Modal
                  visible={editModalVisible}
                  animationType="slide"
                  transparent={true}
                >
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
                        onPress={() => setEditModalVisible(false)}
                      />
                    </ModalView>
                  </CenteredView>
                </Modal>
              </View>
            )}
            {listingOffers.length && (
              <Button
                title="Delete offer"
                onPress={() => handleDeleteOffer(true)}
              />
            )}
          </View>
        )
      ) : isSeller ? (
        <CustomText.Regular>
          You have not received an offer from this person.
        </CustomText.Regular>
      ) : (
        <CustomText.Regular>
          You have not made an offer to this listing.
        </CustomText.Regular>
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
    loadOffersData: (params) => dispatch(getOffersByListing(params)),
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
