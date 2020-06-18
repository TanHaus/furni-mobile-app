import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getListing, editListing, deleteListing } from "../../actions/listings";

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
  const { listing, onPageLoad, submitListingData, submitDeleteListing } = props;
  const [editListing, setEditListing] = useState({
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

  useEffect(() => {
    onPageLoad();
  }, []);
  useEffect(() => {
    setEditListing(listing);
  }, [listing]);

  const handleSubmit = () => {
    submitListingData(editListing);
  };
  const handleDelete = () => {
    submitDeleteListing(listing.listingId);
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
          value={editListing.title}
          onChangeText={(text) =>
            setEditListing({ ...editListing, title: text })
          }
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View>
            <Text>Price</Text>
            <TextInput
              style={{ height: 40, borderBottomWidth: 1 }}
              value={editListing.price}
              onChangeText={(num) =>
                setEditListing({ ...editListing, price: num })
              } // todo: filter out number. maybe use regex?
            />
          </View>
          <View>
            <Text>Item condition</Text>
            <Picker
              selectedValue={editListing.itemCondition}
              onValueChange={(value, index) =>
                setEditListing({ ...editListing, itemCondition: value })
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
          value={editListing.description}
          onChangeText={(text) =>
            setEditListing({ ...editListing, description: text })
          }
        />
        <Text>Delivery option</Text>
        <TextInput
          style={{ height: 40, borderBottomWidth: 1 }}
          value={editListing.deliveryOption}
          onChangeText={(text) =>
            setEditListing({ ...editListing, deliveryOption: text })
          }
        />
      </View>
      <Button onPress={handleSubmit} title="Edit listing" />
      <Button onPress={handleDelete} title="Delete listing" />
      <Text>{JSON.stringify(editListing)}</Text>
      {/* <TouchableOpacity onPress={openImagePickerAsync}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
      {pic ? <Image source={{uri: pic}} style={{width: 300, height: 300, resizeMode: 'contain'}}/> : <View />} */}
    </SafeAreaViewWrapper>
  );
}

function mapStateToProps(state) {
  return {
    listing: state.listings.listing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: () => dispatch(getListing(30)),
    submitListingData: (editListingData) =>
      dispatch(editListing(editListingData)),
    submitDeleteListing: (listingId) => dispatch(deleteListing(listingId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(AddScreen);
