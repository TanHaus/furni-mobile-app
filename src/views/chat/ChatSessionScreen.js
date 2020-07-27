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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const session = route.params.session;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editedPriceBidded, setEditedPriceBidded] = useState(
    listingOffers.length ? listingOffers[0].priceBidded : null
  );
  const [message, setMessage] = useState("");
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
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <ProfilePic source={session.profilePic} />
        <CustomText.Large weight="bold">{session.sellerName}</CustomText.Large>
      </TitleContainer>
      <ListingContainer>
        {/* {listing.picUrls ? (
          <Image
            source={{ uri: listing.picUrls[0] }}
            key={listing.picUrls[0]}
            style={{
              resizeMode: "contain",
              height: 50,
              width: 50,
            }}
          />
        ) : ( */}
        <ListingImage source={session.imgSrc} />
        {/* )} */}
        <TextContainer>
          <CustomText.Regular>
            {/* {listing.title} */}
            {session.listingName}
          </CustomText.Regular>
          <CustomText.Regular weight="bold">
            {/* {`S\$${listing.price}`} */}
            $100
          </CustomText.Regular>
          <CustomText.Regular>
            {/* {listing.itemCondition} */}
            new
          </CustomText.Regular>
        </TextContainer>
      </ListingContainer>

      {/* {listingOffers.length ? (
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
      )} */}

      <OfferContainer>
        <CustomText.Regular weight="semibold">MAKE OFFER</CustomText.Regular>
      </OfferContainer>
      <MessageContainer1>
        <CustomText.Regular>
          Hey, I like really this chair. I'm getting this for my mum. Any chance
          for discount?
        </CustomText.Regular>
      </MessageContainer1>
      <MessageContainer2>
        <CustomText.Regular>Strictly no discount. Sorry! :(</CustomText.Regular>
      </MessageContainer2>
      <NewMessageContainer>
        <MessageInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor={Color.Palette[4]}
        />
        <SendIcon name="send" size={20} onPress={null} />
      </NewMessageContainer>
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
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const ListingImage = styled.ImageBackground`
  height: 60px;
  width: 60px;
`;

const TextContainer = styled.View`
  flex-direction: column
  justify-content: center;
  margin-left: 10px;
`;

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

const OfferContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  padding: 7.5px 10px;
  align-self: flex-start;
`;

const MessageContainer1 = styled.View`
  margin: 40px 0 20px;
  border-width: 1px;
  border-color: ${Color.Palette[5]};
  border-radius: 15px;
  max-width: 300px;
  padding: 12px;
  align-self: flex-end;
`;

const MessageContainer2 = styled.View`
  border-radius: 15px;
  background-color: ${Color.Palette[6]};
  align-self: flex-start;
  max-width: 300px;
  padding: 12px;
`;

const NewMessageContainer = styled.View`
  position: absolute;
  bottom: 50px;
  flex-direction: row;
  align-items: center;
  background-color: ${Color.Palette[6]};
  width: 100%;
`;

const MessageInput = styled.TextInput`
  height: 40px;
  padding-left: 15px;
  width: 90%;
`;

const SendIcon = styled(MaterialCommunityIcons)`
  margin: 0 5px;
  color: ${Color.Palette[4]};
`;
