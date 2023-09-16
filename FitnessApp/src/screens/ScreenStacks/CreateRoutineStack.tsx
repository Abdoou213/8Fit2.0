import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import CreateRoutine from '../CreateRoutine';
import CreateExercise from '../CreateExercise';
import ChooseExerciseFromCategory from "../ChooseExerciseFromCategory";
import SelectExerciseCategory from '../SelectExerciseCategory';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Defien Stack Navigator
const CreateRoutineStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateRoutine" component={CreateRoutine} />
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
      <Stack.Screen name="SelectExerciseCategory" component={SelectExerciseCategory} options={{ headerShown: false }}/>
      <Stack.Screen name="ChooseExerciseFromCategory" component={ChooseExerciseFromCategory} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default CreateRoutineStack;