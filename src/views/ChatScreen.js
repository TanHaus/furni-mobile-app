import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ChatScreen() {
  return (
    <SafeAreaView>
      <Text style ={{padding: 15}}>Chats</Text>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <View 
            style={{
              width: 50, 
              height: 50, 
              backgroundColor: 'powderblue'
            }} 
          />
          <View style={{width: 200, height: 50, backgroundColor: 'skyblue'}}>
            <Text>fARniture</Text>
            <Text>Purple Chair</Text>
            <Text>I really like the chair!</Text>
          </View>
          <View 
            style={{
              width: 50, 
              height: 50, 
              backgroundColor: 'steelblue'
            }} 
          />
        </View>
        <View 
            style={{
              width: 50, 
              height: 50, 
              backgroundColor: 'steelblue'
            }} 
          />
      </View>
    </SafeAreaView>
  );
}

export default ChatScreen;
