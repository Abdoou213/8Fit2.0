import AsyncStorage from '@react-native-async-storage/async-storage';
import { Set } from './AppComponents';
import { Alert } from 'react-native';

// Exercise with a list of sets
export type Exercise = {
    name: string;
    sets: Set[];
    setsCount: number
  };

    // Function to delete a single exercise upon confirmation
export async function deleteExercise(exerciseToDelete: Exercise) {
    try {
        // Display a confirmation pop-up to confirm the deletion, do nothing if User cancels
        Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete "${exerciseToDelete.name}"?`,
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
                // User confirmed, proceed with deletion
                // Fetch all exercises from AsyncStorage
                const allExercises = await fetchAllExercises();
          
                      // Find the index of the exercise to delete
                      const indexToDelete = allExercises.findIndex(
                        (exercise: Exercise) => exercise.name === exerciseToDelete.name
                      );
          
                      if (indexToDelete !== -1) {
                        allExercises.splice(indexToDelete, 1);
          
                        // Update the stored exercises without the deleted exercise
                        await AsyncStorage.setItem('exercises', JSON.stringify(allExercises));
          
                        console.log(`Exercise "${exerciseToDelete.name}" deleted.`);
                      } else {
                        console.log(`Exercise "${exerciseToDelete.name}" not found.`);
                      }
                    },        
                style: 'destructive',
              },
            ]
          );
        } catch (error) {
          console.log('Error deleting exercise from async storage:', error);
        }
    }


  // Fetch all exercises from AsyncStorage
  export const fetchAllExercises = async (): Promise<Exercise[]> => {
    try {
      const exercisesJson = await AsyncStorage.getItem('exercises');
      
      if (exercisesJson) {
        // Parse the exercises from JSON
        const parsedExercises: Exercise[] = JSON.parse(exercisesJson);
        
        return parsedExercises;
      } else {
        return [];
      }
    } catch (e) {
      console.error('Error fetching exercises:', e);
      return [];
    }
  };
      