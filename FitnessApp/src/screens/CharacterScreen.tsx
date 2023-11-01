import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { Props } from '../Components/AppComponents';

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
