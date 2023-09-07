import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ViewRoutine from '../ViewRoutine';
import CreateRoutine from '../CreateRoutine';
import CurrentWorkoutSession from '../CurrentWorkoutSession';
import CreateRoutineStack from './CreateRoutineStack';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Defien Stack Navigator
const ViewRoutineStack = () => {
  return (
    <Stack.Navigator>
        {/* Define the screens for the View Routine Stack Navigator */}
      <Stack.Screen name="ViewRoutine" component={ViewRoutine} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateRoutine" component={CreateRoutineStack} options={{ headerShown: false }}/>
      <Stack.Screen name="CurrentWorkoutSession" component={CurrentWorkoutSession} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ViewRoutineStack;
