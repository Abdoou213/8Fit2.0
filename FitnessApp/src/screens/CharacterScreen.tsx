import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Props } from '../Components/AppComponents';
import { styles } from '../Misc/ComponentStyles';

//Define Char component 
const CharacterScreen = ({ navigation }: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <Text style={{ fontSize: 24,
        fontWeight: 'bold',}}>Character screen</Text>
      <TouchableOpacity style={{width: 300, height: 300, backgroundColor: 'black'}} onPress={() => (navigation.goBack())}>
            <Text style={{ fontSize: 24,fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}


export default CharacterScreen;
