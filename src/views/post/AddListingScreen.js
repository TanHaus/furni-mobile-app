import React, { useState } from "react";
import { connect } from "react-redux";
import { createListing } from "../../actions/listings";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import {
  BackButton,
  Button,
  CustomText,
  SafeAreaViewWrapper,
} from "../../components";
import { Picker } from "@react-native-community/picker";
import * as ImagePicker from "expo-image-picker";
import { TextWeight } from "../../components/custom-text/types";
import { Color } from "../../styles";

function AddScreen(props) {
  const { navigation, submitListingData, createListingLoading } = props;
  const [listing, setListing] = useState({
    title: "",
    price: "",
    itemCondition: "new",
    description: "",
    deliveryOption: "",
  });
  const [pics, setPics] = useState([]);

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

  const handleSubmit = () => {
    submitListingData({ listing, pics, props });
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

  return (
    <SafeAreaViewWrapper>
      <ActivityIndicator animating={createListingLoading} />
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <ScreenTitle weight={TextWeight.Bold}>NEW LISTING</ScreenTitle>
      </TitleContainer>
      <FlexRowContainer>
        {renderPickedImages()}
        <NewImage onPress={openImagePickerAsync}>
          <Plus>+</Plus>
        </NewImage>
      </FlexRowContainer>
      <Container>
        <Title>Listing Title</Title>
        <Input
          value={listing.title}
          onChangeText={(text) => setListing({ ...listing, title: text })}
        />
      </Container>
      <FlexRowContainer>
        <Subcontainer>
          <Title>Price (S$)</Title>
          <Input
            value={listing.price}
            keyboardType="numeric"
            onChangeText={(value) => setListing({ ...listing, price: value })}
          />
        </Subcontainer>
        <Subcontainer>
          <ConditionTitle>Condition</ConditionTitle>
          <Picker
            selectedValue={listing.itemCondition}
            onValueChange={(value, index) =>
              setListing({ ...listing, itemCondition: value })
            }
          >
            {["new", "used"].map((condition) => (
              <Picker.Item
                key={condition}
                label={condition}
                value={condition}
              />
            ))}
          </Picker>
        </Subcontainer>
      </FlexRowContainer>
      <Container>
        <Title>Description</Title>
        <Input
          value={listing.description}
          placeholder="Specify the materials and dimensions of the listing"
          onChangeText={(text) => setListing({ ...listing, description: text })}
        />
      </Container>
      <Container>
        <Title>Furni Tags</Title>
        <Input
          value={listing.description}
          placeholder=""
          onChangeText={(text) => setListing({ ...listing, description: text })}
        />
      </Container>
      <Container>
        <Title>Delivery option</Title>
        <Picker
          selectedValue={listing.deliveryOption}
          onValueChange={(value, index) =>
            setListing({ ...listing, deliveryOption: value })
          }
        >
          {["meet-up", "delivery"].map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </Container>
      <Button title="Create listing" onPress={handleSubmit} />
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    createListingLoading: state.listings.createListingLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitListingData: (newListingData) =>
      dispatch(createListing(newListingData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(AddScreen);

// =============================================================================
// STYLING
// =============================================================================
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -20px;
`;

const ScreenTitle = styled(CustomText.Large)`
  padding-left: 20px;
`;

const Input = styled.TextInput`
  height: 35px;
  border-bottom-width: 1px;
`;

const Container = styled.View`
  margin-bottom: 20px;
`;

const FlexRowContainer = styled.View`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const PickedImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px;
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

const Title = styled(CustomText.Regular)`
  color: ${Color.Palette[4]};
`;

const ConditionTitle = styled(Title)`
  margin-left: 7.5px;
`;

const Subcontainer = styled.View`
  width: 100px;
  margin-right: 40px;
`;
