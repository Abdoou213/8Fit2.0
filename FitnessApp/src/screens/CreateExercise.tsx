import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { styles } from '../Misc/ComponentStyles';
import { Exercise, ExerciseCategory, loadExerciseCategories } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateExerciseProps = {
  navigation: any; // The navigation prop used for screen navigation
  route: {
    params: {
      updateRoutineExercises: (newExercise: Exercise) => void; // Callback function to update routineExercises
    };
  };
};

const CreateExercise = ({ route, navigation }: CreateExerciseProps) => {

    //List of saved exercise categories
    const [categories, setCategories] = useState<ExerciseCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);;
    const [exerciseName, setExerciseName] = useState('');
    const [setsCount, setSetsCount] = useState('');

    // Receive the callback function from the route params
    const { updateRoutineExercises } = route.params;

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

    const updateExerciseCategories = async (updatedCategories: ExerciseCategory[]) => {
      try {
        // Convert the updated categories to JSON string
        const updatedCategoriesJSON = JSON.stringify(updatedCategories);
    
        // Update the ExerciseCategories in AsyncStorage
        await AsyncStorage.setItem('exerciseCategories', updatedCategoriesJSON);
        
        console.log('ADDED EXERCISE')
      } catch (error) {
        // Handle errors here
        console.error('Error updating exercise categories:', error);
      }
    };

    //Adds an exercise to the current routine
    const handleCreateExercise = async () => {
      // Determine the target category (you need to implement this logic)
      const targetCategory = selectedCategory;

      if (!targetCategory) {
        // Handle the case where no target category is selected
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

      // Use the callback function to update routineExercises
      updateRoutineExercises(newExercise);
      setCategories(updatedCategories);
      //Reset useStates
      setExerciseName('');
      setSetsCount('');

      // Update ExerciseCategories in AsyncStorage
      await updateExerciseCategories(updatedCategories);

      navigation.goBack(); // Returns to the CreateRoutine Screen
    };

    return (
      <View style={styles.screenListContainer}>
        <View style={styles.inputContainer}>      
        <Text style={styles.setLabelCreate}>Create Exercise</Text>
        <View style={styles.underline}></View>
        <ModalSelector
        data={categories.map((category) => ({ key: category.categoryId.toString(), label: category.name }))}
        initValue={selectedCategory ? selectedCategory.name : "Select Category"}
        onChange={(option) => {
          const selectedCategoryId = parseInt(option.key); // Parse the key to an integer
          const selectedCategory = categories.find((category) => category.categoryId === selectedCategoryId);
          setSelectedCategory(selectedCategory || null);
        }}
        />
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