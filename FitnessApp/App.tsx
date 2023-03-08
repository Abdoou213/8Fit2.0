import React from 'react';
import {Text, View} from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import CreateRoutine from './src/screens/CreateRoutine';
import ViewRoutine from './src/screens/ViewRoutine';
import Log from './src/screens/Log';
import Profile from './src/screens/Profile';
import ViewRoutineStack from './src/screens/ViewRoutineStack';

const profileName = 'Profile';
const viewRoutineName = 'Routine';
const logName = 'Log';


export type RootStackParamList = {
  CreateRoutine: undefined,
  ViewRoutine: undefined,
  Routine: undefined,
  Profile: undefined,
  Log: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  
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
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Tab.Screen name="Routine" component={ViewRoutineStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Log" component={Log} options={{ headerShown: false }}/>
    </Tab.Navigator> 
  </NavigationContainer>

  );
}

export default App;
