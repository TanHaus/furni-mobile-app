import React, { useState, useEffect } from "react";
import { Image, View, TextInput, Text } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import {
  getOffersByListing,
  editOffer,
  deleteOffer,
  createOffer,
} from "actions/offers";
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
    submitCreateOffer,
    submitEditOffer,
    submitDeleteOffer,
    loadOffersData,
  } = props;
  const session = route.params && route.params.session;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editedPriceBidded, setEditedPriceBidded] = useState(
    listingOffers.length ? listingOffers[0].priceBidded : null
  );
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [priceBidded, setPriceBidded] = useState("");
  const isSeller = listing.sellerId === user.userId;

  useEffect(() => {
    loadOffersData({
      listingId: listing.listingId,
      buyerId: isSeller ? "" : user.userId,
    });
  }, [listing]);

  useEffect(() => {
    setEditedPriceBidded(
      listingOffers.length ? listingOffers[0].priceBidded : null
    );
  }, [listingOffers]);

  const handleCreateOffer = () => {
    submitCreateOffer({
      listingId: listing.listingId,
      priceBidded,
      setModalVisible,
    });
    loadOffersData({
      listingId: listing.listingId,
      buyerId: isSeller ? "" : user.userId,
    });
  };

  const handleEditOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      priceBidded: editedPriceBidded,
    });
    setEditModalVisible(false);
  };

  const handleAcceptOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      status: "accepted",
    });
    loadOffersData({
      listingId: listing.listingId,
      buyerId: isSeller ? "" : user.userId,
    });
    // setModalVisible(false);
  };

  const handleRejectOffer = () => {
    submitEditOffer({
      offerId: listingOffers[0].offerId,
      status: "rejected",
    });
    loadOffersData({
      listingId: listing.listingId,
      buyerId: isSeller ? "" : user.userId,
    });
    // setModalVisible(false);
  };

  const handleDeleteOffer = () => {
    submitDeleteOffer(listingOffers[0].offerId);
    setDeleteModalVisible(false);
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <ProfilePic
          source={
            session
              ? session.profilePic
              : require("../../assets/profiles/standard.png")
          }
        />
        <CustomText.Large weight="bold">
          {session ? session.sellerName : "/sellerName"}
        </CustomText.Large>
      </TitleContainer>
      <ListingContainer>
        {session ? (
          <ListingImage source={session.imgSrc} />
        ) : (
          listing.picUrls && (
            <Image
              source={{ uri: listing.picUrls[0] }}
              key={listing.picUrls[0]}
              style={{
                resizeMode: "contain",
                height: 50,
                width: 50,
              }}
            />
          )
        )}
        <TextContainer>
          <CustomText.Regular>
            {session ? session.listingName : listing.title}
          </CustomText.Regular>
          <CustomText.Regular weight="bold">
            {`S\$${session ? 100 : listing.price}`}
          </CustomText.Regular>
          <CustomText.Regular>
            {session ? "new" : listing.itemCondition}
          </CustomText.Regular>
        </TextContainer>
      </ListingContainer>

      {listingOffers.length ? (
        isSeller ? (
          <View>
            <CustomText.Regular>
              {`You have an offer: S\$${listingOffers[0].priceBidded}`}
            </CustomText.Regular>
            {listingOffers[0].status === "pending" ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <OfferContainer onPress={handleAcceptOffer}>
                  <CustomText.Regular weight="semibold">
                    Accept
                  </CustomText.Regular>
                </OfferContainer>
                <OfferContainer onPress={handleRejectOffer}>
                  <CustomText.Regular weight="semibold">
                    Reject
                  </CustomText.Regular>
                </OfferContainer>
              </View>
            ) : listingOffers[0].status === "accepted" ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <OfferContainer style={{ backgroundColor: "black" }}>
                  <CustomText.Regular
                    weight="semibold"
                    color={Color.Palette[6]}
                  >
                    Accept
                  </CustomText.Regular>
                </OfferContainer>
                <OfferContainer onPress={handleRejectOffer}>
                  <CustomText.Regular weight="semibold">
                    Reject
                  </CustomText.Regular>
                </OfferContainer>
              </View>
            ) : listingOffers[0].status === "rejected" ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <OfferContainer onPress={handleAcceptOffer}>
                  <CustomText.Regular weight="semibold">
                    Accept
                  </CustomText.Regular>
                </OfferContainer>
                <OfferContainer style={{ backgroundColor: "black" }}>
                  <CustomText.Regular
                    weight="semibold"
                    color={Color.Palette[6]}
                  >
                    Reject
                  </CustomText.Regular>
                </OfferContainer>
              </View>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View>
            <CustomText.Regular>
              {`You made an offer: S\$${listingOffers[0].priceBidded}`}
            </CustomText.Regular>
            {/* <CustomText.Regular>Status</CustomText.Regular> */}
            {/* <CustomText.Regular>{listingOffers[0].status}</CustomText.Regular> */}
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
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <OfferContainer onPress={() => setEditModalVisible(true)}>
                    <CustomText.Regular weight="semibold">
                      EDIT
                    </CustomText.Regular>
                  </OfferContainer>
                  <OfferContainer
                    onPress={() => setDeleteModalVisible(true)}
                    style={{ backgroundColor: "black" }}
                  >
                    <CustomText.Regular
                      weight="semibold"
                      color={Color.Palette[6]}
                    >
                      DELETE
                    </CustomText.Regular>
                  </OfferContainer>
                </View>
                <Modal
                  isVisible={editModalVisible}
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
                <Modal
                  isVisible={deleteModalVisible}
                  animationType="slide"
                  transparent={true}
                  onBackdropPress={() => setModalVisible(false)}
                >
                  <CenteredView>
                    <ModalView>
                      <CustomText.Regular color={Color.Palette[4]}>
                        You are about to delete your offer
                      </CustomText.Regular>
                      <Button title="Confirm" onPress={handleDeleteOffer} />
                      <Button
                        title="Cancel"
                        type="secondary"
                        onPress={() => setDeleteModalVisible(false)}
                      />
                    </ModalView>
                  </CenteredView>
                </Modal>
              </View>
            )}
          </View>
        )
      ) : isSeller ? (
        <CustomText.Regular>
          You have not received an offer from this person.
        </CustomText.Regular>
      ) : (
        <View>
          <OfferContainer onPress={() => setModalVisible(true)}>
            <CustomText.Regular weight="semibold">
              MAKE OFFER
            </CustomText.Regular>
          </OfferContainer>
          <Modal
            isVisible={modalVisible}
            animationType="slide"
            transparent={true}
            onBackdropPress={() => setModalVisible(false)}
          >
            <ModalContainer>
              <ModalContent>
                <CustomText.Regular color={Color.Palette[4]}>
                  Your bid:{" "}
                </CustomText.Regular>
                <Input value={priceBidded} onChangeText={setPriceBidded} />
                <Button title="Confirm" onPress={handleCreateOffer} />
                <Button
                  title="Cancel"
                  type="secondary"
                  onPress={() => setModalVisible(false)}
                />
              </ModalContent>
            </ModalContainer>
          </Modal>
        </View>
      )}

      {isSeller ? (
        <View>
          <MessageContainer1>
            <CustomText.Regular>
              Strictly no discount. Sorry! :(
            </CustomText.Regular>
          </MessageContainer1>
          <MessageContainer2>
            <CustomText.Regular>
              Hey, I like really this chair. I'm getting this for my mum. Any
              chance for discount?
            </CustomText.Regular>
          </MessageContainer2>
        </View>
      ) : (
        <View>
          <MessageContainer1>
            <CustomText.Regular>
              Hey, I like really this chair. I'm getting this for my mum. Any
              chance for discount?
            </CustomText.Regular>
          </MessageContainer1>
          <MessageContainer2>
            <CustomText.Regular>
              Strictly no discount. Sorry! :(
            </CustomText.Regular>
          </MessageContainer2>
        </View>
      )}
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
    submitCreateOffer: (offerData) => dispatch(createOffer(offerData)),
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
  margin: 5px;
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

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  display: flex;
  width: 70%;
  align-items: center;
  background-color: white;
  padding: 20px;
`;
