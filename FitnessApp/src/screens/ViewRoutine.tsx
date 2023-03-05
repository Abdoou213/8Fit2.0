import * as React from 'react';
import {Text, View, Button} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'Routine'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export  default function  ViewRoutine ({navigation}: Props) {
  return (
    <View>
        <Text onPress={() => navigation.navigate('CreateRoutine')}> View Routine Screen</Text>
    </View>
  );
}

