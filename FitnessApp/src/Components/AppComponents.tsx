import { styles } from '../Misc/ComponentStyles';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import {generateRandomId} from './WorkoutSession';

//========OBJECTS USED IN APP================
//Used for navigation between screens
export type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
  };

export type Set = {
    id: number;
    weight: number;
    reps: number;
  };
  
export type Exercise = {
    name: string;
    sets: Set[];
    setsCount: number
  };

//Routine object, contains a predefined list of exercises with a predefined number of sets
export type Routine = {
    name: string;
    id: number;
    exercises: Exercise[];
  };
  
//Interface of exercise box parameters
interface ExerciseBoxProps {
  title: string,
  exercise: Exercise;
}

//Define the ExerciseBox object displayed in the CurrentWorkout page
const ExerciseBox = ({exercise }: ExerciseBoxProps) => { 
    //This function recreates the array of sets, adds a set with weights 0 and 0 reps
    const addSet = (exercise: Exercise) => {
  
      const newSet: Set = { id: generateRandomId(), weight: 0, reps: 0 }; // Create a new set with weight and reps set to 0
      const updatedSets = [...exercise.sets, newSet]; // Create update array with new added set
      
      //Reloaded copy of the Exercise with the new number of sets
      const updatedExercise: Exercise = {
        ...exercise,
        sets: updatedSets,
        setsCount: updatedSets.length
      };
  
      return updatedExercise; // Return the updated exercise object
    };
    
    //This method is responsible with adding an extra set to a given exercise
    const handleAddSet = () => {
      addSet(exercise);
    };
  
    return (
      <View style={styles.exerciseBoxStartWorkout}>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
          <View style={styles.setsContainer}>
            {exercise.sets.map((set: Set, index: number) => (
              <View key={index} style={styles.set}>
                <Text style={styles.setText}>Set {index + 1}</Text>
                <TextInput style={styles.setText}>{set.weight}</TextInput>
                <Text style={styles.setText}>kg/lbs</Text>
                <TextInput style={styles.setText}>{set.reps}</TextInput>
                <Text style={styles.setText}>reps</Text>
              </View>
            ))}
          </View>
        <TouchableOpacity style={styles.addSetButton} onPress={handleAddSet}>
          <Text style={styles.addSetButtonText}>Add Set</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default ExerciseBox;