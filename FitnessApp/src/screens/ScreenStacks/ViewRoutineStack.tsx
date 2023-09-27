import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ViewRoutine from '../ViewRoutine';
import CurrentWorkoutSession from '../CurrentWorkoutSession';
import CreateRoutineStack from './CreateRoutineStack';
import SelectExerciseStack from './SelectExerciseStack';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const ViewRoutineStack = () => {
  return (
    <Stack.Navigator>
        {/* Define the screens for the View Routine Stack Navigator */}
      <Stack.Screen name="ViewRoutine" component={ViewRoutine} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateRoutineStack" component={CreateRoutineStack} options={{ headerShown: false }}/>
      <Stack.Screen name="CurrentWorkoutSession" component={CurrentWorkoutSession} options={{ headerShown: false }}/>
      <Stack.Screen name="SelectExerciseStack" component={SelectExerciseStack} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ViewRoutineStack;
