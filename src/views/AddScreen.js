import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 

function AddScreen(props) {
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
  }

  return (
    <SafeAreaView>
      <View 
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Feather name="x" size={24} color="#d0d0d0" onPress={() => props.navigation.goBack()} />      
        <Text>New listing</Text>
      </View>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
      {pic ? <Image source={{uri: pic}} style={{width: 300, height: 300, resizeMode: 'contain'}}/> : <View />}
    </SafeAreaView>
  );
}

export default AddScreen;
