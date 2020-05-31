import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MarketScreen() {
  const col1 = [
    {
      name: 'Bedroom',
      source: require('../../assets/home-screen/bedroom.png')
    },
    {
      name: 'Bathroom',
      source: require('../../assets/home-screen/bathroom.png')
    },
    {
      name: 'Study',
      source: require('../../assets/home-screen/study.png')
    }];
  const col2 = [
    {
      name: 'Dining room',
      source: require('../../assets/home-screen/dining-room.png')
    },
    {
      name: 'Living room',
      source: require('../../assets/home-screen/living-room.png')
    },
    {
      name: 'Kitchen',
      source: require('../../assets/home-screen/kitchen.png')
    }];
  
  return (
    <SafeAreaView 
      style={{
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <View>
        {col1.map(room => <ImgTextCard key={room.name} textContent={room.name} imgSrc={room.source} />)}
      </View>
      <View>
        {col2.map(room => <ImgTextCard key={room.name} textContent={room.name} imgSrc={room.source} />)}
      </View>      
    </SafeAreaView>
  );
}

function ImgTextCard(props) {
  const { textContent, imgSrc } = props;
  return (
    <View style={{padding: 15}}>
      <ImageBackground source={imgSrc} style={{height: 120, width: 160, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ color: '#ffffff' }}>{textContent}</Text>
      </ImageBackground>
    </View>
  )
}

export default MarketScreen;
