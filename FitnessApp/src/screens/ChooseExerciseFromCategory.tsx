import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated, Alert } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Exercise, loadAllCategoryExercises, updateExerciseCategories } from '../Components/Exercise';
import { ExerciseCategory, loadExerciseCategories } from '../Components/ExerciseCategory';
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

const ChooseExerciseFromCategory = ({ route, navigation}: ChooseExerciseFromCategoryProps) => {

  // Access the exerciseCategory from route.params.category
  const exerciseCategory: ExerciseCategory = route.params?.category;
  
  // Initialize the exercises state with the exerciseList from exerciseCategory
  const [exercises, setExercises] = useState<Exercise[]>(exerciseCategory.exerciseList);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);

  // Access the updateRoutineExercises function from the navigation params
  const updateRoutineExercises = route.params?.updateRoutineExercises;
  const currWorkoutSession = route.params?.currWorkoutSession;
  const goBackToPreviousScreen = route.params?.goBackToPreviousScreen;
  const goBackToCurrentWorkout = route.params?.goBackToCurrentWorkout;

  // Initializes the list of exercises within the ExerciseCategory upon loading the page
  useEffect(() => {
    setExercises(exerciseCategory.exerciseList);

    //Load Exercise categories in case an exercise is deleted.
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
  }, [exerciseCategory]);

  // Function to handle adding an exercise to the routine and calling the callback
  const handleAddExerciseToRoutine = (newExercise: Exercise) => {

    // Check if updateRoutineExercises is defined, use it if available
    if (updateRoutineExercises) {
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
  };

  // Function to delete a single exercise from a category upon confirmation
  async function deleteExerciseFromCategory(exerciseToDelete: Exercise) {
    try {
      // Display a confirmation pop-up to confirm the deletion, do nothing if User cancels
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete "${exerciseToDelete.name}" from this category?`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              // User canceled, do nothing
              console.log('Deletion canceled.');
            },
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: async () => {
              // Fetch all exercises from AsyncStorage
              const allExercises = await loadAllCategoryExercises(exerciseCategory);
  
              // Find the index of the exercise to delete
              const indexToDelete = allExercises.findIndex(
                (exercise: Exercise) => exercise.name === exerciseToDelete.name
              );
  
              if (indexToDelete !== -1) {
                allExercises.splice(indexToDelete, 1);
  
                // Update the stored exercises within the category without the deleted exercise
                exerciseCategory.exerciseList = allExercises;
              
                // Update all categories with the updated exerciseCategory
                const updatedCategories = categories.map((category) => {
                  if (category.categoryId === exerciseCategory.categoryId) {
                    return exerciseCategory;
                  }
                  return category;
                });

                //Update all categories
                await updateExerciseCategories(updatedCategories);

                console.log(`Exercise "${exerciseToDelete.name}" deleted from category.`);
                setExercises(allExercises);
              } else {
                console.log(`Exercise "${exerciseToDelete.name}" not found in category.`);
              }
            },
            style: 'destructive',
          },
        ]
      );
    } catch (error) {
      console.log('Error deleting exercise from category:', error);
    }
  }

  const handleCreateExercise = () => {
  
    //Check if updateRoutineExercises is defined
    if (updateRoutineExercises && goBackToPreviousScreen ) {
      //Navigate to CreateExercise and pass the required props
      navigation.navigate('CreateExercise', {
        category: exerciseCategory ,
        updateRoutineExercises: updateRoutineExercises,
        goBackToPreviousScreen: goBackToPreviousScreen,
      });
    }

    if (currWorkoutSession && goBackToCurrentWorkout) {
      //Navigate to CreateExercise and pass the required props
      navigation.navigate('CreateExercise', {
        category: exerciseCategory,
        currWorkoutSession: currWorkoutSession,
        goBackToCurrentWorkout: goBackToCurrentWorkout,
      });
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
        ListFooterComponent={(
          <TouchableOpacity style={styles.createExerciseButton} onPress={() => handleCreateExercise()}>
            <Text style={styles.currentWorkoutButtonText}>Create</Text>
          </TouchableOpacity>
        )}
        data={exercises}
        renderItem={({ item }) => (
          <View>
              <View style={styles.underline}></View>
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => {handleAddExerciseToRoutine(item)}}
                >
                  <Text style={styles.chooseExerciseBox}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { deleteExerciseFromCategory(item) }}
                  >
                    <Text style={styles.closeButtonTextViewPastSession}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.underline}></View>
          </View>        
        )}
        keyExtractor={(item) => item.name}
      />
    );
  };
  
  export default ChooseExerciseFromCategory;
