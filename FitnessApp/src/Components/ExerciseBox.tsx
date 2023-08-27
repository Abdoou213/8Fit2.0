import { styles } from '../Misc/ComponentStyles';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {WorkoutSession} from './WorkoutSession';
import {Exercise, Set, generateRandomId} from './AppComponents';
import { useState } from 'react';

//Interface of exercise box parameters
interface ExerciseBoxProps {
    title: string,
    exercise: Exercise
    workoutSession: WorkoutSession,
    setWorkoutSession: React.Dispatch<React.SetStateAction<WorkoutSession>>;
  }

//Define the ExerciseBox object displayed in the CurrentWorkout page
export const ExerciseBox = ({exercise, workoutSession, setWorkoutSession }: ExerciseBoxProps) => {

    const [updatedExercise, setUpdatedExercise] = useState<Exercise>(exercise);
    
    //This function recreates the array of sets, adds a set with weights 0 and 0 reps
    const handleAddSet = () => {
      const updatedSession = { ...workoutSession };

      // Find the index of the exercise based on its id
      const exerciseIndex = updatedSession.exercises.findIndex(ex => ex.name === exercise.name);

      // Update the session's exercise sets
      updatedSession.exercises[exerciseIndex].sets.push({
        setNum: generateRandomId(),
        weight: 0,
        reps: 0,
      });

      // Update the workout session state in the parent component (CurrentWorkoutSession)
      setWorkoutSession(updatedSession);
      console.log('Added new Set!');
    };

    // Function to update weight of a given set upon receiving user input
    const handleWeightChange = (index: number, value: string) => {
      const newSets = [...updatedExercise.sets];
      newSets[index].weight = parseFloat(value) || 0; // Convert input to number or set to 0
      setUpdatedExercise({ ...updatedExercise, sets: newSets });
    };

    // Function to update the number of repetitions of a given set upon receiving user input
    const handleRepsChange = (index: number, value: string) => {
      const newSets = [...updatedExercise.sets];
      newSets[index].reps = parseInt(value) || 0; // Convert input to number or set to 0
      setUpdatedExercise({ ...updatedExercise, sets: newSets });
    };
    
    return (
      <View style={styles.exerciseBoxStartWorkout}>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
          <View style={styles.setsContainer}>
            {exercise.sets.map((set: Set, index: number) => (
              <View key={index} style={styles.set}>
                <Text style={styles.setText}>Set {index + 1}</Text>
                <TextInput keyboardType="numeric" style={styles.setText} 
                onChangeText={(value) => handleWeightChange(index, value)}>{set.weight}</TextInput>
                <Text style={styles.setText}>kg/lbs</Text>
                <TextInput keyboardType="numeric" style={styles.setText} 
                onChangeText={(value) => handleRepsChange(index, value)}>{set.reps}</TextInput>
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

  //Define the ExerciseBox object displayed in the ViewPastSession page
export const ExerciseBoxPastSession = ({ exercise }: { exercise: Exercise }) => {
  
  return (
    <View style={styles.exerciseBoxStartWorkout}>
      <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <View style={styles.setsContainer}>
          {exercise.sets.map((set: Set, index: number) => (
            <View key={index} style={styles.set}>
              <Text style={styles.setText}>Set {index + 1}</Text>
              <Text style={styles.setText}>{set.weight}</Text>
              <Text style={styles.setText}>kg/lbs</Text>
              <Text style={styles.setText}>{set.reps}</Text>
              <Text style={styles.setText}>reps</Text>
            </View>
          ))}
        </View>
    </View>
  );
};

export default ExerciseBox;