import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet, Text, View, Button, Modal, Input } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackButton,
  CustomText,
  SafeAreaViewWrapper,
  ChatCard,
} from "components";
import { getOffersByBuyer, editOffer } from "../../actions/offers";
import { Color } from "../../styles";
import { ScrollView } from "react-native-gesture-handler";

function ChatOverviewScreen(props) {
  const {
    userId,
    buyerOffers,
    loadBuyerOffersData,
    submitEditOffer,
    submitDeleteOffer,
  } = props;
  const [editedOffer, setEditedOffer] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadBuyerOffersData(userId);
  }, [userId]);

  const openEditModal = (offer) => {
    setEditedOffer(offer);
    setModalVisible(true);
  };

  const handleEditOffer = () => {
    submitEditOffer(editedOffer);
  };

  // ===========================================================================
  // RENDER
  // ===========================================================================
  const renderChatSessions = () => {
    const chatSessions = CHAT_SESSIONS.map((session, index) => {
      return <ChatCard key={index} session={session} />;
    });

    return chatSessions;
  };

  return (
    <SafeAreaViewWrapper>
      <ScrollView>
        {/* <Modal visible={modalVisible}>
          <View>
            <CustomText.Regular color={Color.Palette[4]}>
              {`offerId: ${editedOffer.offerId}`}
            </CustomText.Regular>
            <CustomText.Regular color={Color.Palette[4]}>
              {"Your bid: "}
            </CustomText.Regular>
            <Input
              value={editedOffer.priceBidded}
              onChangeText={setPriceBidded}
            />
            <Button title="Confirm" onPress={handleEditOffer} />
            <Button
              title="Delete"
              onPress={() => submitDeleteOffer(editedOffer.offerId)}
            />
          </View>
        </Modal> */}
        <TitleContainer>
          <ScreenTitle weight="bold">CHATS</ScreenTitle>
        </TitleContainer>
        {renderChatSessions()}
        {/* {buyerOffers &&
          buyerOffers.map((offer) => (
            <View>
              <Text>{`offerId: ${offer.offerId}`}</Text>
              <Text>{`listingId: ${offer.listingId}`}</Text>
              <Text>{`Price bidded: ${offer.priceBidded}`}</Text>
              <Button title="Edit offer" onPress={() => openEditModal(offer)} />
            </View>
          ))} */}
      </ScrollView>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
    buyerOffers: state.offers.buyerOffers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadBuyerOffersData: (buyerId) => dispatch(getOffersByBuyer(buyerId)),
    submitEditOffer: (editedOffer) => dispatch(editOffer(editedOffer)),
    submitDeleteOffer: (offerId) => dispatch(deleteOffer(offerId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ChatOverviewScreen);

// =============================================================================
// CONSTANTS
// =============================================================================
const CHAT_SESSIONS = [
  {
    sellerName: "fARniture",
    listingName: "Purple Chair",
    lastMessage: "I really like THE Chairs!",
    lastActiveDate: new Date("18 May 2020"),
    imgSrc: require("../../assets/listings/purple-chair.png"),
    profilePic: require("../../assets/profiles/standard.png"),
  },
  {
    sellerName: "IKAE",
    listingName: "Modern Chair",
    lastMessage: "I LOVE IT!!!! is $20 okay??",
    lastActiveDate: new Date("16 May 2020"),
    imgSrc: require("../../assets/listings/white-chair.png"),
    profilePic: require("../../assets/profiles/standard.png"),
  },
  {
    sellerName: "ENVYronman",
    listingName: "Rattan Chair",
    lastMessage: "The environmentalists will ...",
    lastActiveDate: new Date("05 May 2020"),
    imgSrc: require("../../assets/listings/rattan-chair.png"),
    profilePic: require("../../assets/profiles/standard.png"),
  },
  {
    sellerName: "LDRdtG",
    listingName: "Playful Chair",
    lastMessage: "Do you want another view ...",
    lastActiveDate: new Date("01 May 2020"),
    imgSrc: require("../../assets/listings/translucent-chair.png"),
    status: "ACCEPTED",
    profilePic: require("../../assets/profiles/standard.png"),
  },
  {
    sellerName: "prodigy179",
    listingName: "Lounge Chair",
    lastMessage: "This chair is so trendy!",
    lastActiveDate: new Date("28 April 2020"),
    imgSrc: require("../../assets/listings/purple-chair.png"),
    profilePic: require("../../assets/profiles/standard.png"),
  },
  {
    sellerName: "melodrama99",
    listingName: "Plastic Chair",
    lastMessage: "nah.. your offer is too low",
    lastActiveDate: new Date("26 April 2020"),
    imgSrc: require("../../assets/listings/white-chair.png"),
    status: "DECLINED",
    profilePic: require("../../assets/profiles/standard.png"),
  },
  {
    sellerName: "thykingdomcome",
    listingName: "Knight's Chair",
    lastMessage: "Yep. This chair was inspir ...",
    lastActiveDate: new Date("20 April 2020"),
    imgSrc: require("../../assets/listings/rattan-chair.png"),
    profilePic: require("../../assets/profiles/standard.png"),
  },
];

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
`;

const ScreenTitle = styled(CustomText.Large)`
  padding-left: 10px;
`;
