import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ProfileScreen from '../Profile';
import LogScreen from "../Log";
import CharacterScreen from '../CharacterScreen';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="Character" component={CharacterScreen}/>
    </Stack.Navigator>
  );
};

export default ProfileScreenStack;