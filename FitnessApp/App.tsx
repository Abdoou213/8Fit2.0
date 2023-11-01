import React, { useEffect } from 'react';
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
import Character from './src/Components/Character';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';
import ProfileScreenStack from './src/screens/ScreenStacks/ProfileScreenStack';

//Set page
const profileName = 'ProfileScreen';
const viewRoutineName = 'Routines';
const logName = 'Log';

//Define the type of the routes
export type RootStackParamList = {
  //1. Allows the user to name a new routine and add a given number of exercises to it
  CreateRoutine: undefined,
  //2. Navigator Stack for Routine creation
  CreateRoutineStack:undefined,
  //3.
  CreateExercise: {
    category: ExerciseCategory; //ExerciseCategory chosen to create exercise
    currWorkoutSession?: WorkoutSession; // Optional WorkoutSession prop
    updateRoutineExercises?: (newExercise: Exercise) => void;
    goBackToPreviousScreen: () => void;
    goBackToCurrentWorkout?: (currWorkoutSession: WorkoutSession) => void; }; //callBack method to modify current routine
  
  //4.
  SelectExerciseCategory: SelectExerciseCategoryParams,
  //5.
  CreateExerciseCategory: {
    updateCategories: (newCategory: ExerciseCategory) => void;
  }, 
  //6.
  ChooseExerciseFromCategory: {
    category: ExerciseCategory;
    route: RouteProp<RootStackParamList, 'ChooseExerciseFromCategory'>;
    updateRoutineExercises?: (newExercise: Exercise) => void;
    routineExercises?: Exercise[];
    currWorkoutSession?: WorkoutSession,
    goBackToPreviousScreen: () => void;
    goBackToCurrentWorkout?: (currWorkoutSession: WorkoutSession) => void;
  },
  //7.
  SelectExerciseStack: {
    currWorkoutSession?: WorkoutSession; // Optional WorkoutSession prop
    updateRoutineExercises?: (newExercise: Exercise) => void;
    routineExercises?: Exercise[];
  },
  //8.
  ViewRoutine: undefined,   //Lists all routines saved by the user for them to choose from
  //9.
  Routines: undefined,
  //10.
  ProfileScreen: undefined,
  //11.
  Log: undefined,
  //12.
  LogScreen: undefined,
  //13. Starts a workout session based on the given routine
  CurrentWorkoutSession: { 
    routine?: Routine,
    currWorkoutSession?: WorkoutSession; // Optional WorkoutSession prop
   },
   //14.
  ViewPastSession: {sessionId: number},
  //17.
  ProfileScreenStack: undefined;
  //15.
  AwardExpToCharScreen: {
    experiencePointsSession: number
  }
  //16.
  OngoingSessionStack: {
    routine: Routine
  },
};

//Create bottom tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();

//Define App component
const App = () => {
  useEffect(() => {
    if(Platform.OS === 'android'){
      SplashScreen.hide();
    }
    
  }, [])
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
        <Tab.Screen name="ProfileScreen" component={ProfileScreenStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Routines" component={ViewRoutineStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Log" component={LogScreenStack} options={{ headerShown: false }}/>
    </Tab.Navigator> 
  </NavigationContainer>

  );
}

export default App;
