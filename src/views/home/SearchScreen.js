import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
  PreviewCard,
} from "../../components";
import { getListings } from "../../actions/listings";

function SearchScreen(props) {
  const { navigation, listings, submitSearch } = props;
  const [searchString, setSearchString] = useState("");
  const handleSubmitSearch = () => {
    submitSearch(searchString);
    navigation.navigate("search-results"); // should only navigate if the fetch response is successful.
  };
  return (
    <SafeAreaViewWrapper>
      <Ionicons
        name="ios-arrow-back"
        size={24}
        color="black"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        onPress={() => props.navigation.goBack()}
      />
      <Text
        style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: 18 }}
      >
        Search
      </Text>
      <Text
        style={{
          color: "#d0d0d0",
          textTransform: "uppercase",
          fontSize: 16,
          paddingTop: 20,
        }}
      >
        Search string
      </Text>
      <TextInput
        style={{ height: 40, borderBottomWidth: 1 }}
        value={searchString}
        onChangeText={setSearchString}
      />
      <Button
        title="Search"
        onPress={handleSubmitSearch}
        backgroundColor="black"
        color="white"
      />
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitSearch: (searchString) => dispatch(getListings(searchString)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SearchScreen);
