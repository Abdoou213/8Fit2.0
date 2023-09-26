import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LogScreenStack from './src/screens/ScreenStacks/LogScreenStack';
import Profile from './src/screens/Profile';
import ViewRoutineStack from './src/screens/ScreenStacks/ViewRoutineStack';
import { Routine } from './src/Components/AppComponents';
import { Exercise } from './src/Components/Exercise';
import { ExerciseCategory } from './src/Components/ExerciseCategory';
import { WorkoutSession } from './src/Components/WorkoutSession';
import { SelectExerciseCategoryParams } from './src/screens/ScreenStacks/SelectExerciseStack';

//Set page
const profileName = 'Profile';
const viewRoutineName = 'Routines';
const logName = 'Log';

//Define the type of the routes
export type RootStackParamList = {
  CreateRoutine: undefined, //Allows the user to name a new routine and add a given number of exercises to it
  CreateRoutineStack:undefined, //Navigator Stack for Routine creation
  CreateExercise: { updateRoutineExercises: (newExercise: Exercise) => void }, //callBack method to modify current routine
  SelectExerciseCategory: SelectExerciseCategoryParams,   
  ChooseExerciseFromCategory: {
    category: ExerciseCategory;
    route: RouteProp<RootStackParamList, 'ChooseExerciseFromCategory'>;
    updateRoutineExercises?: (newExercise: Exercise) => void;
    currWorkoutSession?: WorkoutSession,
    goBackToPreviousScreen: () => void;
    goBackToCurrentWorkout?: (currWorkoutSession: WorkoutSession) => void;
  },
  SelectExerciseStack: {
    currWorkoutSession?: WorkoutSession; // Optional WorkoutSession prop
    updateRoutineExercises?: (newExercise: Exercise) => void;
  },
  ViewRoutine: undefined,   //Lists all routines saved by the user for them to choose from
  Routines: undefined,
  Profile: undefined,
  Log: undefined,
  LogScreen: undefined,
  //Starts a workout session based on the given routine
  CurrentWorkoutSession: { 
    routine?: Routine,
    currWorkoutSession?: WorkoutSession; // Optional WorkoutSession prop
   },
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
