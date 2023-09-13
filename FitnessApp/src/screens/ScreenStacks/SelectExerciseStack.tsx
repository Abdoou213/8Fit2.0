import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ChooseExerciseFromCategory from '../ChooseExerciseFromCategory';
import SelectExerciseCategory from '../SelectExerciseCategory';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Stack Navigator for exercise selection from a given ExerciseCategory.
const SelectExerciseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SelectExerciseCategory" component={SelectExerciseCategory} options={{ headerShown: false }}/>
      <Stack.Screen name="ChooseExerciseFromCategory" component={ChooseExerciseFromCategory} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default SelectExerciseStack;