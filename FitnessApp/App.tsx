import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Log from './src/screens/Log';
import Profile from './src/screens/Profile';
import ViewRoutineStack from './src/screens/ViewRoutineStack';
import CurrentWorkout from './src/screens/CurrentWorkout';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Set page
const profileName = 'Profile';
const viewRoutineName = 'Routine';
const logName = 'Log';
const currentWorkoutName = 'CurrentWorkout';

//Define the type of the routes
export type RootStackParamList = {
  CreateRoutine: undefined,
  ViewRoutine: undefined,
  Routine: undefined,
  Profile: undefined,
  Log: undefined;
  CurrentWorkout: undefined;
};

//Create bottom tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();

//Define App component
const App = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName={viewRoutineName}
      screenOptions={({ route }) => ({
        //Define the tab icons
        tabBarIcon: ({ focused, color, size}) => {
        let iconName: string='';
        let rn = route.name;

        if(rn === viewRoutineName) {
          iconName = focused ? 'barbell-sharp' : 'barbell-sharp';
        } else if (rn === profileName){
          iconName = focused ? 'person' : 'person';
        } else if (rn === logName){
          iconName = focused ? 'fitness' : 'fitness';
        }else if (rn === currentWorkoutName) { // Add the new screen to the tab bar
          iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline'; // Set the icon for the new screen
        }
        return <Ionicons name={iconName} size={size} color={color}/>
        },
        
      })}>
        {/* Define the screens for the Bottom Tab Navigator */}
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Tab.Screen name="Routine" component={ViewRoutineStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Log" component={Log} options={{ headerShown: false }}/>
        <Tab.Screen name="CurrentWorkout" component={CurrentWorkout} options={{ headerShown: false }} />
    </Tab.Navigator> 
  </NavigationContainer>

  );
}

export default App;
