import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ChooseExerciseFromCategory from '../ChooseExerciseFromCategory';
import SelectExerciseCategory from '../SelectExerciseCategory';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WorkoutSession } from '../../Components/WorkoutSession';
import { Exercise } from '../../Components/Exercise';
import CreateExercise from '../CreateExercise';
import { Routine } from '../../Components/AppComponents';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

export type SelectExerciseCategoryParams = {
  updateRoutineExercises?: (newExercise: Exercise) => void;
  routineExercises?: Exercise[];
  updateWorkoutSessionExercises?: (newExercise: Exercise) => void;
  currWorkoutSession?: WorkoutSession;
};

//Stack Navigator for exercise selection from a given ExerciseCategory.
const SelectExerciseStack = () => {

  //const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'SelectExerciseStack'>>();

  // Access the updateRoutineExercises function  or the currWorkoutSession from the route parameter (if defined)
  const currWorkoutSession = route.params?.currWorkoutSession;
  const updateRoutineExercises = route.params?.updateRoutineExercises;
  const routineExercises = route.params?.routineExercises;

  //Determine which optional parameter was defined and which wasn't
  // Create an object for initial parameters
  const params: SelectExerciseCategoryParams = {};

  if (currWorkoutSession) {
    params.currWorkoutSession = currWorkoutSession;
  }

  if (updateRoutineExercises) {
    params.updateRoutineExercises = updateRoutineExercises;
    params.routineExercises = routineExercises;
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="SelectExerciseCategory" component={SelectExerciseCategory} 
        initialParams={{ currWorkoutSession, updateRoutineExercises, routineExercises } as SelectExerciseCategoryParams}  options={{ headerShown: false }}/>
      <Stack.Screen name="ChooseExerciseFromCategory" component={ChooseExerciseFromCategory} options={{ headerShown: false }} />
      <Stack.Screen name="CreateExercise" component={CreateExercise} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default SelectExerciseStack;