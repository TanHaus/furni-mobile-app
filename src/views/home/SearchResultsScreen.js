import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  BackButton,
  CustomText,
  SafeAreaViewWrapper,
  PreviewCard,
} from "../../components";
import { getListings } from "../../actions/listings";
import { TouchableOpacity } from "react-native-gesture-handler";

function SearchScreen(props) {
  const { navigation, submitSearch, listings } = props;
  const [searchString, setSearchString] = useState("");
  return (
    <SafeAreaViewWrapper>
      <Ionicons
        name="ios-arrow-back"
        size={24}
        color="black"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        onPress={() => props.navigation.goBack()}
      />
      <Text>{JSON.stringify(listings)}</Text>
      {listings.map((listing) => (
        <TouchableOpacity
          onPress={() => {
            console.log("going to listing");
            navigation.navigate("listing", { listingId: listing.listingId });
          }}
        >
          <PreviewCard key={listing.listingId} listing={listing} />
        </TouchableOpacity>
      ))}
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
export default withConnect(SearchScreen);

// =============================================================================
// STYLING
// =============================================================================

const Button = (props) => (
  <ButtonWrapper
    onPress={props.onPress}
    backgroundColor={props.backgroundColor}
    borderColor={props.borderColor}
  >
    <ButtonText color={props.color}>{props.title}</ButtonText>
  </ButtonWrapper>
);

const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  border: 2px solid
    ${(props) => (!!props.borderColor ? props.borderColor : "black")};
  padding: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.color};
  text-align: center;
`;
