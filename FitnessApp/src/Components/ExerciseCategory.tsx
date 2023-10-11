import { generateRandomId } from "./AppComponents";
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

//Creates a new ExerciseCategory
export const createExerciseCategory = async (categoryName: string): Promise<ExerciseCategory | undefined> => {
  try {
    // Load existing exercise categories
    const existingCategories = await loadExerciseCategories();

    // Check if a category with the same name already exists
    if (existingCategories.some((category) => category.name === categoryName)) {
      console.error('Category with the same name already exists.');
      return undefined;
    }

    // Generate a unique categoryId
    const newCategoryId = generateRandomId();

    // Create a new ExerciseCategory
    const newCategory: ExerciseCategory = {
      name: categoryName,
      categoryId: newCategoryId,
      exerciseList: [], // Empty exerciseList initially
    };

    // Update the list of existing categories with the new category
    const updatedCategories = [...existingCategories, newCategory];

    // Save the updated list of categories to AsyncStorage
    await AsyncStorage.setItem('exerciseCategories', JSON.stringify(updatedCategories));

    console.log('New category added successfully.');
    return newCategory;
  } catch (error) {
    // Handle errors
    console.error('Error creating and adding exercise category:', error);
    return undefined;
  }
};

// Function to delete an ExerciseCategory by name from AsyncStorage
export const deleteExerciseCategory = async (categoryName: string): Promise<boolean> => {
  try {
    // Load existing exercise categories
    const existingCategories = await loadExerciseCategories();

    // Find the index of the category with the given name
    const categoryIndex = existingCategories.findIndex((category) => category.name === categoryName);

    // Check if the category with the given name exists
    if (categoryIndex === -1) {
      console.error(`Category with name ${categoryName} not found.`);
      return false; // Category not found
    }

    // Remove the category from the list
    existingCategories.splice(categoryIndex, 1);

    // Save the updated list of categories to AsyncStorage
    await AsyncStorage.setItem('exerciseCategories', JSON.stringify(existingCategories));

    console.log(`Category ${categoryName} deleted successfully.`);
    return true; // Category deleted successfully
  } catch (error) {
    // Handle errors
    console.error('Error deleting exercise category:', error);
    return false; // Deletion failed
  }
};

