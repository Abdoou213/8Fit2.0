import * as React from 'react';
import {Text, View, Button} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'CreateRoutine'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export  default function  CreateRoutine ({navigation}: Props) {
  return (
    <View>
        <Text onPress={() => navigation.navigate('CreateRoutine')}> Create Routine Screen</Text>
    </View>
  );
}

