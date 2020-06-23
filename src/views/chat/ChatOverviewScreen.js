import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOffersByBuyer } from "../../actions/offers";

function ChatOverviewScreen(props) {
  const { userId, buyerOffers, loadBuyerOffersData } = props;
  const [editOffer, setEditOffer] = useState({});
  useEffect(() => {
    loadBuyerOffersData(userId);
  }, [userId]);
  const handleEditOffer = (offer) => {
    setEditOffer(offer);
  };
  const event = new Date("05 October 2011 14:48 UTC");
  return (
    <SafeAreaView>
      <Text
        style={{
          padding: 20,
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Chats
      </Text>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <ChatCard
            sellerName="fARniture"
            listingName="Purple Chair"
            lastMessage="I really like THE Chair!"
            lastActiveDate={event}
          />
        </View>
      </View>
      {buyerOffers &&
        buyerOffers.map((offer) => (
          <View>
            <Text>{`offerId: ${offer.offerId}`}</Text>
            <Text>{`listingId: ${offer.listingId}`}</Text>
            <Text>{`Price bidded: ${offer.priceBidded}`}</Text>
            <Button title="Edit offer" onPress={() => handleEditOffer(offer)} />
          </View>
        ))}
    </SafeAreaView>
  );
}

function ChatCard(props) {
  const {
    sellerName,
    listingName,
    lastMessage,
    lastActiveDate,
    imgSrc,
    status,
  } = props;
  return (
    <View style={{ width: 200, height: 50 }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>{sellerName}</Text>
        <Text
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          {lastActiveDate.toISOString()}
        </Text>
      </View>

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {listingName}
      </Text>
      <Text>{lastMessage}</Text>
    </View>
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
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(ChatOverviewScreen);
