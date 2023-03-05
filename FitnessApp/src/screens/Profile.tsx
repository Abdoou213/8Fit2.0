import * as React from 'react';
import {Text, View, Button} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,'Profile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export  default function Profile ({navigation}: Props) {
  return (
    <View>
        <Text onPress={() => navigation.navigate('Profile')}> Profile Screen</Text>
    </View>
  );
}

