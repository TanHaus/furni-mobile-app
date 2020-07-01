import React, { useState, useEffect } from "react";
import { Dimensions, Modal, View, Image } from "react-native";
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
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <CenteredView>
          <ModalView>
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
          </ModalView>
        </CenteredView>
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
        <CustomText.Large weight="semibold">${listing.price} </CustomText.Large>
        <CustomText.Large>{listing.itemCondition}</CustomText.Large>
      </Container>
      <Container>
        <MaterialCommunityIcons name="heart-outline" size={35} onPress={null} />
        <CustomText.Regular weight="bold">20</CustomText.Regular>
        {renderButton()}
      </Container>

      <Description>
        Faux leather with timbre frames. Perfect for any customer.
      </Description>
      <ProfileDescription>
        <ProfilePic
          source={require("../../assets/listings/purple-chair.png")}
        />
        <TextContainer>
          <CustomText.Large weight={TextWeight.Bold}>SELLER</CustomText.Large>
          <CustomText.Large weight={TextWeight.SemiBold}>
            Furni
          </CustomText.Large>
          <CustomText.Regular>★★★★★</CustomText.Regular>
        </TextContainer>
      </ProfileDescription>
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
