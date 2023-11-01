import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ProfileScreen from '../Profile';
import CharacterScreen from '../CharacterScreen';
import Statistics from '../Statistics';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="Character" component={CharacterScreen}/>
      <Stack.Screen name="Statistics" component={Statistics}/>
    </Stack.Navigator>
  );
};

export default ProfileScreenStack;