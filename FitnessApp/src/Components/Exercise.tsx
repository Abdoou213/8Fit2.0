import AsyncStorage from '@react-native-async-storage/async-storage';
import { Set } from './AppComponents';
import { ExerciseCategory, loadExerciseCategories } from './ExerciseCategory';

// Exercise with a list of sets
export type Exercise = {
    name: string;
    sets: Set[];
    setsCount: number
  };

  export const updateExerciseCategories = async (updatedCategories: ExerciseCategory[]) => {
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

  //Fetch all exercises within a given category
  export const loadAllCategoryExercises = async (category: ExerciseCategory): Promise<Exercise[]> => {
    try {
      // Fetch all exercises
      const allExercises = await fetchAllExercises();
  
      // Filter exercises by the given category
      const categoryExercises = allExercises.filter((exercise) =>
        category.exerciseList.some((categoryExercise) => categoryExercise.name === exercise.name)
      );
  
      return categoryExercises;
    } catch (e) {
      console.error(`Error loading exercises for category "${category.name}":`, e);
      return [];
    }
  };
  
  // Fetch all exercises from AsyncStorage
  export const fetchAllExercises = async (): Promise<Exercise[]> => {
    try {
      // Fetch all exercise categories
      const categories = await loadExerciseCategories();
  
      // Use reduce to concatenate exercise lists from all categories into one array
      const allExercises: Exercise[] = categories.reduce<Exercise[]>(
        (accumulator, category) => accumulator.concat(category.exerciseList),
        []
      );
  
      return allExercises;
    } catch (e) {
      console.error('Error fetching exercises:', e);
      return [];
    }
  };
      