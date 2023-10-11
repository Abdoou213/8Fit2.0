import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { ExerciseCategory, loadExerciseCategories } from '../Components/ExerciseCategory';
import { Exercise, updateExerciseCategories } from '../Components/Exercise';
import { WorkoutSession } from '../Components/WorkoutSession';

export type CreateExerciseProps = {
  navigation: any; // The navigation prop used for screen navigation
  route: {
    params: {
      category: ExerciseCategory; // ExerciseCategory chosen to create exercise
      currWorkoutSession?: WorkoutSession; // Optional WorkoutSession prop
      updateRoutineExercises?: (newExercise: Exercise) => void; // Callback function to update routineExercises
      goBackToPreviousScreen: () => void;
      goBackToCurrentWorkout?: (currWorkoutSession: WorkoutSession) => void;
    };
  };
};

const CreateExercise = ({ route, navigation }: CreateExerciseProps) => {
    
    //List of saved exercise categories
    const [categories, setCategories] = useState<ExerciseCategory[]>([]);
    const [exerciseName, setExerciseName] = useState('');
    const [setsCount, setSetsCount] = useState('');

    // Receive the callback function from the route params
    const exerciseCategory = route.params.category;
    const updateRoutineExercises = route.params?.updateRoutineExercises;
    const currWorkoutSession = route.params?.currWorkoutSession;
    const goBackToPreviousScreen = route.params?.goBackToPreviousScreen;
    const goBackToCurrentWorkout = route.params?.goBackToCurrentWorkout;

    // Function to check if an exercise with the same name exists
    const checkIfExerciseExists = (exerciseName: string) => {
      for (const category of categories) {
        for (const exercise of category.exerciseList) {
          if (exercise.name === exerciseName) {
            return true; // Exercise with the same name found
          }
        }
      }
      return false; // No exercise with the same name found
    };
    
    //Load all ExerciseCategory objects, used to validate that current exercise does not already exist
    useEffect(() => {
      const loadCategories = async () => {
        try {
          const loadedCategories = await loadExerciseCategories();
          setCategories(loadedCategories);
        } catch (error) {
          // Handle errors
          console.error('Error loading exercise categories:', error);
        }
      };
    
      loadCategories(); // Call the async function to load exercise categories
    }, []);
    
    // Adds an exercise to the current routine
    const handleCreateExercise = async () => {
      // Determine the target category (you need to implement this logic)
      const targetCategory = exerciseCategory;

      if (!targetCategory) {
        // Handle the case where no target category is selected
        return;
      }

      // Validation checks
      if (!exerciseName.trim()) {
        Alert.alert('Exercise name cannot be empty');
        return;
      }

      if (exerciseName.length > 50) {
        Alert.alert('Exercise name is too long (max 50 characters)');
        return;
      }

      if (!setsCount.trim() || isNaN(parseInt(setsCount)) || parseInt(setsCount) <= 0) {
        Alert.alert('Invalid number of sets');
        return;
      }

      if (parseInt(setsCount) > 30) {
        Alert.alert('Invalid number of sets (max 30)');
        return;
      }
      

      // Check if an exercise with the same name exists
      if (checkIfExerciseExists(exerciseName)) {
        // An exercise with the same name already exists, show an alert
        Alert.alert('Exercise Already Exists', 'An exercise with the same name already exists. Please enter a different one.');
        return;
      }
  
      // Create the new Exercise object
      const newExercise: Exercise = {
        name: exerciseName,
        // Creates the array of sets
        sets: Array.from({ length: parseInt(setsCount) }, (_, index) => ({
          setNum: index + 1,
          weight: 0,
          reps: 0,
        })),
        setsCount: parseInt(setsCount),
      };

      // Update the target category's exerciseList with the new exercise
      const updatedCategories = categories.map((category) => {
        if (category.categoryId === targetCategory.categoryId) {
          return {
            ...category,
            exerciseList: [...category.exerciseList, newExercise],
          };
        }
    
        return category;
      });

      // Use the callback function to update routineExercises (if currently modifying routine)
      if (updateRoutineExercises && goBackToPreviousScreen) {
        updateRoutineExercises(newExercise);
        goBackToPreviousScreen();
      }

      // If not, check if updateWorkoutSessionExercises is defined and use it
      if (currWorkoutSession && goBackToCurrentWorkout) {
        const updatedWorkoutSession = {
          ...currWorkoutSession,
          exercises: [...currWorkoutSession.exercises, newExercise],
        };
        goBackToCurrentWorkout(updatedWorkoutSession)
      }
      
      setCategories(updatedCategories);
      // Reset useStates
      setExerciseName('');
      setSetsCount('');

      // Update ExerciseCategories in AsyncStorage
      await updateExerciseCategories(updatedCategories);

      navigation.goBack(); // Returns to the CreateRoutine Screen
    };

    return (
      <View style={styles.screenListContainer}>
        <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButtonViewPastSession}
        >
          <Text style={styles.closeButtonTextViewPastSession}>X</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>      
        <Text style={styles.setLabelCreate}>Create Exercise</Text>
        <View style={styles.underline}></View>
          <Text style={styles.setLabelCreate}>Exercise Name:</Text>
          <TextInput style={styles.input} value={exerciseName} onChangeText={setExerciseName} />
          <Text style={styles.setLabelCreate}>Number of Sets:</Text>
          <TextInput keyboardType="numeric" style={styles.input} value={setsCount} onChangeText={setSetsCount} />
          <TouchableOpacity style={styles.addButtonCreate} onPress={handleCreateExercise}>
            <Text style={styles.buttonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default CreateExercise;