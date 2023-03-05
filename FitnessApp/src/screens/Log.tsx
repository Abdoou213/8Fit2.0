import * as React from 'react';
import {Text, View, Button} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'Log'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export  default function  Log ({navigation}: Props) {
  return (
    <View>
        <Text onPress={() => navigation.navigate('Log')}> Log Screen</Text>
    </View>
  );
}

