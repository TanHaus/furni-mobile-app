import React, { useState } from "react";
import { connect } from "react-redux";
import { createListing } from "../../actions/listings";
import { TouchableOpacity, Image, View } from "react-native";
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
import { AntDesign } from "@expo/vector-icons";

function AddScreen(props) {
  const { navigation, submitListingData } = props;
  const [listing, setListing] = useState({
    title: "",
    price: 0,
    itemCondition: "new",
    description: "",
    deliveryOption: "",
  });
  const [pics, setPics] = useState([]);
  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted) {
      // const pickerResult = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [3, 3],
      //   quality: 1,
      //   base64: true,
      // });
      let pickerResult = await ImagePicker.launchCameraAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        // base64: true,
      });
      // console.log(pickerResult.base64);
      console.log(pickerResult.fileName);
      console.log(pickerResult.type);
      if (!pickerResult.cancelled) {
        // const res = await fetch('http://10.0.2.2:4080/listings/44/pics', {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   // send our base64 string as POST request
        //   body: JSON.stringify({
        //     imgsource: pickerResult.base64,
        //   }),
        // })
        // console.log(res);
        setPics((pics) => [...pics, pickerResult.uri]);
      } else alert("Permission to access camera roll is required!");
    }
  };

  const handleSubmit = () => {
    submitListingData({ listing, pics });
  };

  return (
    <SafeAreaViewWrapper>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <Title weight={TextWeight.Bold}>NEW LISTING</Title>
      </TitleContainer>
      <Container
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {pics &&
          pics.map((pic, index) => (
            <Image
              key={index}
              source={{ uri: pic }}
              style={{ width: 80, height: 80, margin: 10 }}
            />
          ))}
        <TouchableOpacity onPress={openImagePickerAsync}>
          <AntDesign name="plussquareo" size={80} color="black" />
        </TouchableOpacity>
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>Title</CustomText.Regular>
        <Input
          value={listing.title}
          onChangeText={(text) => setListing({ ...listing, title: text })}
        />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>Price</CustomText.Regular>
        <Input
          value={listing.price}
          onChangeText={(value) => setListing({ ...listing, price: value })}
        />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          Item condition
        </CustomText.Regular>
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
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          Description (tip: specify the materials and dimensions to attract more
          buyers)
        </CustomText.Regular>
        <Input
          value={listing.description}
          onChangeText={(text) => setListing({ ...listing, description: text })}
        />
      </Container>
      <Container>
        <CustomText.Regular color={Color.Palette[4]}>
          Delivery option
        </CustomText.Regular>
        <Input
          value={listing.deliveryOption}
          onChangeText={(text) =>
            setListing({ ...listing, deliveryOption: text })
          }
        />
      </Container>
      <Container>
        <Button title="Add a new listing" onPress={handleSubmit} />
      </Container>
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

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
`;

const Container = styled.View`
  margin-bottom: 30px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const RegisterText = styled(CustomText.Small)`
  text-decoration-line: underline;
`;
