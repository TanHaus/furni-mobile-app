import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MarketScreen() {
  const col1 = [
    {
      name: 'Bedroom',
      source: require('../../assets/HomeScreen/Bedroom.png')
    },
    {
      name: 'Bathroom',
      source: require('../../assets/HomeScreen/Bathroom.png')
    },
    {
      name: 'Study',
      source: require('../../assets/HomeScreen/Study.png')
    }];
  const col2 = [
    {
      name: 'Dining room',
      source: require('../../assets/HomeScreen/DiningRoom.png')
    },
    {
      name: 'Living room',
      source: require('../../assets/HomeScreen/LivingRoom.png')
    },
    {
      name: 'Kitchen',
      source: require('../../assets/HomeScreen/Kitchen.png')
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
    <View
      style={{
        padding: 15
      }}>
      <Image source={imgSrc} />
      <View 
        style={{
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#ffffff' }}>{textContent}</Text>
      </View>
    </View>
  )
}

export default MarketScreen;
