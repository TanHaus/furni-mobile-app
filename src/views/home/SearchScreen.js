import React, { useState } from "react";
import { connect } from "react-redux";
import { TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "components";
import { Color } from "styles";
import * as ImagePicker from "expo-image-picker";
import { getListings } from "actions/listings";

function SearchScreen(props) {
  const { navigation, submitSearch, getListingsLoading } = props;
  const [searchString, setSearchString] = useState("");
  const [pics, setPics] = useState([]);
  const handleSubmitSearch = () => {
    submitSearch({ searchString, props });
    navigation.navigate("search-results", { searchString });
  };

  const handleKeywordsOnPress = (keyword) => () => {
    submitSearch({ searchString: keyword, props });
    navigation.navigate("search-results", { searchString: keyword });
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        // const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true,
      });
      if (!pickerResult.cancelled) {
        // setPics((pics) => [...pics, pickerResult.uri]);
        setPics((píc) => [...pics, pickerResult]);
      } else alert("Permission to access camera roll is required!");
    }
  };

  // ===========================================================================
  // RENDER
  // ===========================================================================
  const renderPickedImages = () => {
    return (
      pics &&
      pics.map((pic, index) => (
        <PickedImage
          key={index}
          // source={{ uri: pic }}
          source={{ uri: pic.uri }}
        />
      ))
    );
  };

  const renderSearchKeylist = (list) => {
    const searchKeylist = list.map((searchKey, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={handleKeywordsOnPress(searchKey)}
        >
          <ContainerItem>{searchKey}</ContainerItem>
        </TouchableOpacity>
      );
    });

    return searchKeylist;
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight="bold">SEARCH</Title>
      </TitleContainer>
      <CustomText.Regular color={Color.Palette[4]}>
        ENTER SEARCH KEYWORD
      </CustomText.Regular>
      <TextInput
        style={{ height: 40, borderBottomWidth: 1 }}
        value={searchString}
        onChangeText={setSearchString}
      />
      <Container>
        <Button title="Search by Keyword" onPress={handleSubmitSearch} />
      </Container>
      <CustomText.Regular color={Color.Palette[4]}>
        UPLOAD SEARCH IMAGE
      </CustomText.Regular>
      <>
        {renderPickedImages()}
        {pics.length == 0 && (
          <NewImage onPress={openImagePickerAsync}>
            <Plus>+</Plus>
          </NewImage>
        )}
      </>
      <Button title="Search by Image" onPress={handleSubmitSearch} />
      <Container>
        <ContainerTitle weight="bold">TRENDS</ContainerTitle>
        {renderSearchKeylist(TRENDS_ATTRIBUTES)}
      </Container>
      <Container>
        <ContainerTitle weight="bold">RECENT</ContainerTitle>
        {renderSearchKeylist(RECENT_ATTRIBUTES)}
      </Container>
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    submitSearch: ({ searchString, props }) =>
      dispatch(getListings({ searchString, props })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(SearchScreen);

// =============================================================================
// CONSTANTS
// =============================================================================
const TRENDS_ATTRIBUTES = ["Luxurious", "White", "Table"];
const RECENT_ATTRIBUTES = ["Purple", "Rattan"];

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;

const Title = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const NewImage = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  margin: 10px;
  background-color: ${Color.Palette[5]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Plus = styled.Text`
  color: white;
  font-size: 75px;
  margin-top: -7.5px;
`;

const PickedImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px;
`;

const ContainerTitle = styled(CustomText.Large)``;

const ContainerItem = styled(CustomText.Regular)`
  margin-top: 10px;
`;
