import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Exercise } from '../Components/Exercise';
import { ExerciseCategory, loadExerciseCategories, deleteExerciseCategory } from '../Components/ExerciseCategory';
import { WorkoutSession } from '../Components/WorkoutSession';
import { Alert } from 'react-native';

type SelectCategoryProps = {
  navigation: any; // The navigation prop used for screen navigation
  route: {
    params: {
      routineExercises?: Exercise[];
      updateRoutineExercises?: (newExercise: Exercise) => void; // Callback function to update routineExercises
      currWorkoutSession?: WorkoutSession;
    };
  };
};

const SelectExerciseCategory = ({ route, navigation }: SelectCategoryProps) => {

    //List of saved exercise categories
    const [categories, setCategories] = useState<ExerciseCategory[]>([]);
    const { currWorkoutSession, updateRoutineExercises, routineExercises } = route.params;

    //Loads all existing ExerciseCategory objects upon loading page
    useEffect(() => {
      const fetchExerciseCategories = async () => {
        try {
          const loadedCategories = await loadExerciseCategories();
          setCategories(loadedCategories);
        } catch (error) {
          // Handle any errors
          console.error('Error loading exercise categories:', error);
        }
      };
  
      // Fetch exercise categories when the component mounts
      fetchExerciseCategories();
    }, []);

    const goBackToCreateRoutine = () => {
      navigation.navigate('CreateRoutine');
    };

    const goBackToCurrentWorkout = (currWorkoutSession: WorkoutSession) => {
      navigation.navigate('CurrentWorkoutSession', {currWorkoutSession: currWorkoutSession});
    };
    
    const handleAddExerciseToRoutine = (category: ExerciseCategory) => {
      if(updateRoutineExercises){
        navigation.navigate('ChooseExerciseFromCategory', {
          category: category,
          updateRoutineExercises: updateRoutineExercises,
          routineExercises: routineExercises,
          goBackToPreviousScreen: goBackToCreateRoutine
        });
      }

      if(currWorkoutSession){
        navigation.navigate('ChooseExerciseFromCategory', {
          category: category,
          currWorkoutSession: currWorkoutSession,
          goBackToCurrentWorkout: goBackToCurrentWorkout
        });
    }
  }

  //Callback function to update routineExercises
  const updateCategoriesList = (newCategory: ExerciseCategory) => {
    setCategories([...categories, newCategory]); 
  }

  //Takes the user to the CreateCategory page
  const handleCreateCategory = () => {
    navigation.navigate('CreateExerciseCategory',
    {updateCategories: updateCategoriesList});
  }

  //Deletes the chosen ExerciseCategory
  const handleDeleteCategory = (category: ExerciseCategory) => {
    // Check if the category has exercises, if it does, modify message to notify user
    const hasExercises = category.exerciseList.length > 0;
  
    // Display a confirmation dialog
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete the exercise category "${category.name}"? ${
        hasExercises ? 'Some exercises are associated with this category.' : ''
      }`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          onPress: () => confirmDeleteCategory(category),
        },
      ],
      { cancelable: false }
    );
  };

  //Completes the deletion of the chosen category upon confirmation by the user and updates list of categories in screen
  const confirmDeleteCategory = async (category: ExerciseCategory) => {
    const deleted = await deleteExerciseCategory(category.name);
    const newCategories = await loadExerciseCategories();
  
    if (deleted) {
      // Successfully deleted, you can perform any additional actions here
      console.log(`Category "${category.name}" deleted successfully.`);
      setCategories(newCategories);
    } else {
      // Deletion failed or was canceled
      console.log(`Deletion of category "${category.name}" was unsuccessful.`);
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
                <Text style={styles.headerRowsDatePastSession}>Categories</Text>
              </View>
            </View>
          </Animated.View>
        }
        ListFooterComponent={(
          <TouchableOpacity style={styles.createExerciseButton} onPress={() => handleCreateCategory()}>
            <Text style={styles.currentWorkoutButtonText}>Create Category</Text>
          </TouchableOpacity>
        )}
        data={categories}
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
                    onPress={() => handleDeleteCategory(item)}
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
  
  export default SelectExerciseCategory;