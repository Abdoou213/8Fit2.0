import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Exercise, ExerciseCategory } from '../Components/AppComponents';
import { RouteProp, useNavigation } from '@react-navigation/native';

// ... Rest of your imports ...
import { RootStackParamList } from '../../App';
import { WorkoutSession } from '../Components/WorkoutSession';

export type ChooseExerciseFromCategoryProps = {
  navigation: any; // The navigation prop used for screen navigation
  route: {
    params: {
      category: ExerciseCategory
      updateRoutineExercises?: (newExercise: Exercise) => void;
      goBackToPreviousScreen: () => void; // Callback function to update routineExercises
      currWorkoutSession?: WorkoutSession;
      goBackToCurrentWorkout?: (currWorkoutSession: WorkoutSession) => void; //Used to return to CurrentWorkout screen with updated WorkoutSession
    };
  };
};

const ChooseExerciseFromCategory = ({ route}: ChooseExerciseFromCategoryProps) => {

  const navigation = useNavigation();

  // Access the exerciseCategory from route.params.category
  const exerciseCategory: ExerciseCategory = route.params?.category;
  // Initialize the exercises state with the exerciseList from exerciseCategory
  const [exercises, setExercises] = useState<Exercise[]>(exerciseCategory.exerciseList);

  // Access the updateRoutineExercises function from the navigation params
  const updateRoutineExercises = route.params?.updateRoutineExercises;
  const currWorkoutSession = route.params?.currWorkoutSession;
  const goBackToPreviousScreen = route.params?.goBackToPreviousScreen;
  const goBackToCurrentWorkout = route.params?.goBackToCurrentWorkout;

  // Initializes the list of exercises within the ExerciseCategory upon loading the page
  useEffect(() => {
    setExercises(exerciseCategory.exerciseList);
  }, [exerciseCategory]);

  // Function to handle adding an exercise to the routine and calling the callback
  const handleAddExerciseToRoutine = (newExercise: Exercise) => {
    // Check if updateRoutineExercises is defined, use it if available
    console.log('CHOOOOOOSUUUU')
    console.log(updateRoutineExercises)
    console.log(currWorkoutSession)
    console.log(goBackToCurrentWorkout)

    if (updateRoutineExercises) {
      updateRoutineExercises(newExercise);
      goBackToPreviousScreen();
    }

    // If not, check if updateWorkoutSessionExercises is defined and use it
    if (currWorkoutSession && goBackToCurrentWorkout) {
      console.log('KAIZOKUO NINARU OTOKODA')
      //updateWorkoutSessionExercises(newExercise);
      const updatedWorkoutSession = {
        ...currWorkoutSession,
        exercises: [...currWorkoutSession.exercises, newExercise],
      };
      console.log(updatedWorkoutSession)
      goBackToCurrentWorkout(updatedWorkoutSession)
    }

    
  };

    return (
      <FlatList
        style={styles.screenListContainer}
        ListHeaderComponent={
          <Animated.View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButtonViewPastSession}
            >
              <Text style={styles.closeButtonTextViewPastSession}>X</Text>
            </TouchableOpacity>
            <View style={styles.headerContainerPastSession}>
              <View style={styles.underline}>
                <Text style={styles.headerRowsDatePastSession}>Exercices</Text>
              </View>
            </View>
          </Animated.View>
        }
        data={exercises}
        renderItem={({ item }) => (
          <View>
              <View style={styles.underline}></View>
              <TouchableOpacity
                onPress={() => {handleAddExerciseToRoutine(item)}}
              >
                <Text style={styles.headerRowsDatePastSession}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.underline}></View>
          </View>
          
        )}
        keyExtractor={(item) => item.name}
      />
    );
  };
  
  export default ChooseExerciseFromCategory;
