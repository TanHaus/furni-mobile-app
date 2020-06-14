import React, { useState } from "react";
import { connect } from "react-redux";

import { createListing } from "../../actions/listings";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { SafeAreaViewWrapper, Button } from "../../components";

function AddScreen(props) {
  const { submitListingData } = props;
  const [listing, setListing] = useState({
    title: "",
    price: 0,
    itemCondition: "new",
    description: "",
    deliveryOption: "",
  });
  const [pic, setPic] = useState("");

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted) {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
      if (!pickerResult.cancelled) {
        setPic(pickerResult.uri);
      }
    } else {
      alert("Permission to access camera roll is required!");
    }
  };

  const handleSubmit = () => {
    submitListingData(listing);
  };

  return (
    <SafeAreaViewWrapper>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather
          name="x"
          size={24}
          color="#d0d0d0"
          onPress={() => props.navigation.goBack()}
        />
        <Text>New listing</Text>
      </View>
      <View>
        <Text>Title</Text>
        <TextInput
          style={{ height: 40, borderBottomWidth: 1 }}
          value={listing.title}
          onChangeText={(text) => setListing({ ...listing, title: text })}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View>
            <Text>Price</Text>
            <TextInput
              style={{ height: 40, borderBottomWidth: 1 }}
              value={listing.price}
              onChangeText={(num) => setListing({ ...listing, price: num })} // todo: filter out number. maybe use regex?
            />
          </View>
          <View>
            <Text>Item condition</Text>
            <Picker
              selectedValue={listing.itemCondition}
              onValueChange={(value, index) =>
                setListing({ ...listing, itemCondition: value })
              }
            >
              {["new", "used"].map((condition) => (
                <Picker.Item label={condition} value={condition} />
              ))}
            </Picker>
          </View>
        </View>
        <Text>
          Description (please specify the materials and dimensions height width
          length in cm if possible)
        </Text>
        <TextInput
          style={{ height: 40, borderBottomWidth: 1 }}
          value={listing.description}
          onChangeText={(text) => setListing({ ...listing, description: text })}
        />
        <Text>Delivery option</Text>
        <TextInput
          style={{ height: 40, borderBottomWidth: 1 }}
          value={listing.deliveryOption}
          onChangeText={(text) =>
            setListing({ ...listing, deliveryOption: text })
          }
        />
      </View>
      <Button onPress={handleSubmit} title="Create listing" />
      <Text>{JSON.stringify(listing)}</Text>
      {/* <TouchableOpacity onPress={openImagePickerAsync}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
      {pic ? <Image source={{uri: pic}} style={{width: 300, height: 300, resizeMode: 'contain'}}/> : <View />} */}
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    submitListingData: (newListingData) =>
      dispatch(createListing(newListingData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(AddScreen);
