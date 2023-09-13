import { Exercise } from "./Exercise";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Exercise Category
export type ExerciseCategory = {
    name: string;
    categoryId: number;
    exerciseList: Exercise[];
}

// Function to load all ExerciseCategory objects from AsyncStorage
export const loadExerciseCategories = async (): Promise<ExerciseCategory[]> => {
  const rawCategoriesStored = await AsyncStorage.getItem('exerciseCategories'); // Get the JSON string from AsyncStorage

  if (rawCategoriesStored) {
    // If data exists, parse it into an array of objects
    const parsedCategories = JSON.parse(rawCategoriesStored);

    // Ensure that parsedCategories is an array
    if (Array.isArray(parsedCategories)) {
      // Map over the parsed array and convert each item to ExerciseCategory objects
      const exerciseCategories = parsedCategories.map((rawCategory) => {
        // Assuming rawCategory has the shape of ExerciseCategory
        return {
          name: rawCategory.name || '', // Ensure a default value for name
          categoryId: rawCategory.categoryId || 0, // Ensure a default value for categoryId
          exerciseList: rawCategory.exerciseList || [], // Ensure a default empty array for exerciseList
        };
      });

      // Now exerciseCategories contains an array of ExerciseCategory objects
      return exerciseCategories;
    } else {
      // Handle the case where the parsed data is not an array
      console.error('Parsed data is not an array.');
      return [];
    }
  } else {
    // Handle the case where no data is stored in AsyncStorage
    console.error('No data found in AsyncStorage.');
    return [];
  }

};