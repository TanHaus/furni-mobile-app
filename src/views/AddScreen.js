import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 

function AddScreen(props) {
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
        <View>

        </View>
      </SafeAreaView>
    );
}

export default AddScreen;
