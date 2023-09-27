import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import CreateRoutine from '../CreateRoutine';
import CreateExercise from '../CreateExercise';
import SelectExerciseStack from './SelectExerciseStack';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const CreateRoutineStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateRoutine" component={CreateRoutine} />
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
      <Stack.Screen name="SelectExerciseStack" component={SelectExerciseStack} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default CreateRoutineStack;