import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ChatsScreen() {
  const event = new Date('05 October 2011 14:48 UTC');
  return (
    <SafeAreaView>
      <Text 
        style={{
          padding: 20,
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }}
      >
        Chats
      </Text>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <ChatCard 
            sellerName="fARniture" 
            listingName="Purple Chair" 
            lastMessage="I really like THE Chair!"
            lastActiveDate={event} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function ChatCard(props) {
  const { sellerName, listingName, lastMessage, lastActiveDate, imgSrc, status } = props
  return (
    <View style={{width: 200, height: 50}}>
      <View
        style={{
          flexDirection: 'row'
        }}>
        <Text>{sellerName}</Text>
        <Text
          style={{
            position: 'absolute',
            right: 0
          }}
        >
          {lastActiveDate.toISOString()}
        </Text>
      </View>
      
      <Text
        style={{
          fontWeight: 'bold'
        }}
      >
        {listingName}
      </Text>
      <Text>{lastMessage}</Text>
    </View>
  )
}

export default ChatsScreen;
