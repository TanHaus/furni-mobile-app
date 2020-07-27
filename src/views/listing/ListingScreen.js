import React, { useState, useEffect } from "react";
import { Dimensions, View, Image, Text, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { getListing } from "actions/listings";
import { getOffersByListing, createOffer, editOffer } from "actions/offers";
import styled from "styled-components/native";
import { BackButton, CustomText, SafeAreaViewWrapper } from "components";
import { TextWeight } from "components/custom-text/types";
import { Button } from "components";
import { Color } from "styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  const deviceWidth = Dimensions.get("window").width * 0.9;
  const listingId = route.params.listingId;
  const isSeller = listing.sellerId === user.userId;
  const [modalVisible, setModalVisible] = useState(false);
  const [priceBidded, setPriceBidded] = useState("");

  useEffect(() => {
    loadListingData(listingId);
  }, []);

  useEffect(() => {
    loadOffersData({ listingId, buyerId: isSeller ? "" : user.userId });
  }, [listing]);

  const handleCreateOffer = () => {
    submitCreateOffer({
      listingId: listingId,
      priceBidded,
      setModalVisible,
    });
  };

  const renderButton = () => {
    return isSeller ? (
      listingOffers.length ? (
        <ActionButton
          onPress={() => navigation.navigate("listing-offers", { listingId })}
        >
          <CustomText.Large weight="semibold">View offers</CustomText.Large>
        </ActionButton>
      ) : (
        <ActionBox>
          <CustomText.Large weight="semibold">No offer</CustomText.Large>
        </ActionBox>
      )
    ) : listingOffers.length ? (
      <ActionButton
        onPress={() => navigation.navigate("chat-session", { listingId })}
      >
        <CustomText.Large weight="semibold">See chat</CustomText.Large>
      </ActionButton>
    ) : (
      <ActionButton onPress={() => setModalVisible(true)}>
        <CustomText.Large weight="semibold">Chat/Make offer</CustomText.Large>
      </ActionButton>
    );
  };

  return (
    <SafeAreaViewWrapper>
      <ScrollView>
        <Modal
          isVisible={modalVisible}
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
        <TitleContainer>
          <BackButton onPress={() => navigation.goBack()} />
          <Title weight={TextWeight.Bold}>LISTING</Title>
        </TitleContainer>
        {listing.picUrls ? (
          <Image
            source={{
              uri:
                listing.picUrls && listing.picUrls.length
                  ? listing.picUrls[0]
                  : "https://furni-s3-bucket.s3-ap-southeast-1.amazonaws.com/placeholder-furniture.png",
            }}
            // key={listing.picUrls[0]}
            style={{ width: deviceWidth, height: deviceWidth }}
          />
        ) : (
          <View style={{ height: 50, width: 50, backgroundColor: "grey" }} />
        )}

        <ListingTitle>{listing.title}</ListingTitle>
        <Container>
          <CustomText.Large weight="semibold">
            ${listing.price}{" "}
          </CustomText.Large>
          <CustomText.Large>{listing.itemCondition}</CustomText.Large>
        </Container>
        <Container>
          <MaterialCommunityIcons
            name="heart-outline"
            size={35}
            onPress={null}
          />
          <CustomText.Regular weight="bold">0</CustomText.Regular>
          {renderButton()}
        </Container>

        <Description>{listing.description}</Description>
        <ProfileDescription>
          <ProfilePic
            source={require("../../assets/listings/purple-chair.png")}
          />
          <TextContainer>
            <CustomText.Large weight={TextWeight.Bold}>SELLER</CustomText.Large>
            <CustomText.Large weight={TextWeight.SemiBold}>
              /sellerName
            </CustomText.Large>
            <CustomText.Regular>★★★★★</CustomText.Regular>
          </TextContainer>
        </ProfileDescription>
      </ScrollView>
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
  margin-bottom: 20px;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
`;

const ListingTitle = styled(CustomText.Large)`
  margin: 20px 0 5px 0;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
`;

const ProfileDescription = styled.View`
  flex-direction: row;
  margin: 5px;
  position: relative;
`;

const ProfilePic = styled.ImageBackground`
  height: 75px;
  width: 75px;
  border-radius: 150px;
  overflow: hidden;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  border: 1.5px solid black;
  padding: 10px 30px;
  border-radius: 5px;
  position: absolute;
  right: 0;
`;

const ActionBox = styled.View`
  border: 1.5px solid black;
  padding: 10px 30px;
  border-radius: 5px;
  position: absolute;
  right: 0;
`;

const Description = styled(CustomText.Regular)`
  margin: 15px 0;
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
