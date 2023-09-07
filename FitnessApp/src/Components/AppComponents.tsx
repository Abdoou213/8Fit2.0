
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

//========OBJECTS USED IN APP================
//Used for navigation between screens
export type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
  };

// Represents a singular set in a given exercise
export type Set = {
    setNum: number;
    weight: number;
    reps: number;
  };
  
// Exercise with a list of sets
export type Exercise = {
    name: string;
    sets: Set[];
    setsCount: number
  };

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
      console.log(exerciseCategories);
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

// Routine object, contains a predefined list of exercises with a predefined number of sets
export type Routine = {
    name: string;
    id: number;
    exercises: Exercise[];
  };

// Generates a random 5-digit integer for the new routine/workout session
export  const generateRandomId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};
