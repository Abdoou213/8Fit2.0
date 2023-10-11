import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../Misc/ComponentStyles";
import { useState } from "react";
import { createExerciseCategory, loadExerciseCategories } from "../Components/ExerciseCategory";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type CreateCategoryProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SelectExerciseCategory', 'CreateExerciseCategory'>;
    route: RouteProp<RootStackParamList, 'CreateExerciseCategory'>
  };

const CreateExerciseCategory =  ({route, navigation}: CreateCategoryProps) => {

    //ExerciseCategory name attribute
    const [exerciseCategoryName, setCategoryName] = useState('');
    const updateCategories = route.params.updateCategories;

    //Creates ExerciseCategory
    const handleCreateExerciseCategory = async () => {

        // Check if exerciseCategoryName is empty
        if (!exerciseCategoryName.trim()) {
          Alert.alert('Error', 'Exercise category name cannot be empty.');
          return;
        }

        const existingCategories = await loadExerciseCategories();

        // Check if a category with the same name already exists
        if (existingCategories.some((category) => category.name === exerciseCategoryName)) {
            Alert.alert('Error', 'An exercise category with the same name already exists.');
            console.error('Category with the same name already exists.');
            return;
        }
    
        const newExerciseCategory =  await createExerciseCategory(exerciseCategoryName);
        // Check if newExerciseCategory is undefined
        if (!newExerciseCategory) {
            // Handle the case where createExerciseCategory failed
            console.error('Failed to create exercise category.');
            return;
        }
        
        updateCategories(newExerciseCategory);
        navigation.goBack();
    }

    return (
      <View style={styles.screenListContainer}>
        <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButtonViewPastSession}
        >
          <Text style={styles.closeButtonTextViewPastSession}>X</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>      
        <Text style={styles.setLabelCreate}>Create Exercise Category</Text>
        <View style={styles.underline}></View>
          <Text style={styles.setLabelCreate}>Category Name:</Text>
          <TextInput style={styles.input} value={exerciseCategoryName} onChangeText={setCategoryName} />
          <TouchableOpacity style={styles.addButtonCreate} onPress={handleCreateExerciseCategory}>
            <Text style={styles.buttonText}>Create Category</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default CreateExerciseCategory;