import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  PreviewCard,
  SafeAreaViewWrapper,
} from "../../components";
import { TextWeight } from "../../components/custom-text/types";
import { Color } from "../../styles";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function LikedScreen(props) {
  const {
    navigation,
    submitLoginData,
    isLoggingIn,
    isAuthenticated,
    listings,
  } = props;

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>LIKED</Title>
      </TitleContainer>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          LIKED SCREEN THAT SHOWS LIKED LISTINGS
        </CustomText.Regular>

        {/* <Text>{JSON.stringify(listings)}</Text>
        {listings.map((listing) => (
          <TouchableOpacity
            onPress={() => {
              console.log("going to listing");
              navigation.navigate("listing", { listingId: listing.listingId });
            }}
          >
            <PreviewCard key={listing.listingId} listing={listing} />
          </TouchableOpacity>
        ))} */}
      </Container>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default LikedScreen;

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

const Container = styled.View`
  margin-top: 30px;
`;
