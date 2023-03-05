import React from 'react';
import {Text, View} from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import CreateRoutine from './src/screens/CreateRoutine';
import ViewRoutine from './src/screens/ViewRoutine';
import Log from './src/screens/Log';
import Profile from './src/screens/Profile';

const profileName = 'Profile';
const viewRoutineName = 'Routine';
const logName = 'Log';


export type RootStackParamList = {
  CreateRoutine: undefined, 
  Routine: undefined,
  Profile: undefined,
  Log: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName={viewRoutineName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
        let iconName: string='';
        let rn = route.name;

        if(rn === viewRoutineName) {
          iconName = focused ? 'barbell-sharp' : 'barbell-sharp';
        } else if (rn === profileName){
          iconName = focused ? 'person' : 'person';
        } else if (rn === logName){
          iconName = focused ? 'fitness' : 'fitness';
        }
        return <Ionicons name={iconName} size={size} color={color}/>
        },
        
      })}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Routine" component={ViewRoutine}/>
        <Tab.Screen name="Log" component={Log} />
    </Tab.Navigator>
  </NavigationContainer>

  );
};