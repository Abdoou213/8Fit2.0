import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import ViewRoutine from './ViewRoutine';
import CreateRoutine from './CreateRoutine';
import StartWorkout from './StartWorkout';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Defien Stack Navigator
const ViewRoutineStack = () => {
  return (
    <Stack.Navigator>
        {/* Define the screens for the View Routine Stack Navigator */}
      <Stack.Screen name="ViewRoutine" component={ViewRoutine} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateRoutine" component={CreateRoutine} options={{ headerShown: false }}/>
      <Stack.Screen name="StartWorkout" component={StartWorkout} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ViewRoutineStack;
