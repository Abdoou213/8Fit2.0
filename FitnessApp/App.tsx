import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LogScreenStack from './src/Screens/ScreenStacks/LogScreenStack';
import Profile from './src/Screens/Profile';
import ViewRoutineStack from './src/Screens/ScreenStacks/ViewRoutineStack';
import { Routine } from './src/Components/AppComponents';

//Set page
const profileName = 'Profile';
const viewRoutineName = 'Routines';
const logName = 'Log';

//Define the type of the routes
export type RootStackParamList = {
  CreateRoutine: undefined, //Allows the user to name a new routine and add a given number of exercises to it
  ViewRoutine: undefined,   //Lists all routines saved by the user for them to choose from
  Routines: undefined,
  Profile: undefined,
  Log: undefined,
  LogScreen: undefined,
  CurrentWorkoutSession: { routine: Routine }; //Starts a workout session based on the given routine
  ViewPastSession: {sessionId: number};
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
        }
        return <Ionicons name={iconName} size={size} color={color}/>
        },

      })}>
        {/* Define the screens for the Bottom Tab Navigator */}
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Tab.Screen name="Routines" component={ViewRoutineStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Log" component={LogScreenStack} options={{ headerShown: false }}/>
    </Tab.Navigator> 
  </NavigationContainer>

  );
}

export default App;
