import { styles } from '../Misc/ComponentStyles';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {WorkoutSession} from './WorkoutSession';
import { Set, generateRandomId} from './AppComponents';
import {Exercise } from './Exercise';
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

      //Increment the set count
      updatedSession.exercises[exerciseIndex].setsCount++;

      // Update the workout session state in the parent component (CurrentWorkoutSession)
      setWorkoutSession(updatedSession);
      console.log('Added new Set!');
    };

     // Function to update weight of a given set upon receiving user input
    const handleWeightChange = (index: number, value: string) => {
      setWorkoutSession(prevSession => {
        const updatedSession = { ...prevSession };
        const exerciseIndex = updatedSession.exercises.findIndex(ex => ex.name === exercise.name);
        const newSets = [...updatedSession.exercises[exerciseIndex].sets];
        newSets[index].weight = parseFloat(value) || 0;
        updatedSession.exercises[exerciseIndex].sets = newSets;
        return updatedSession;
      });
    };

    // Function to update the number of repetitions of a given set upon receiving user input
    const handleRepsChange = (index: number, value: string) => {
      setWorkoutSession(prevSession => {
        const updatedSession = { ...prevSession };
        const exerciseIndex = updatedSession.exercises.findIndex(ex => ex.name === exercise.name);
        const newSets = [...updatedSession.exercises[exerciseIndex].sets];
        newSets[index].reps = parseInt(value) || 0;
        updatedSession.exercises[exerciseIndex].sets = newSets;
        return updatedSession;
      });
    };
    
    return (
      <View style={styles.exerciseBoxContainer}>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <View style={styles.underline}></View>
          <View style={styles.setsContainerExerciseBox}>
            {exercise.sets.map((set: Set, index: number) => (
              <View key={index} style={styles.setExerciseBox}>
                <Text style={styles.setTextExerciseBox}>Set {index + 1}</Text>
                <TextInput keyboardType="numeric" style={styles.setTextExerciseBox} 
                onChangeText={(value) => handleWeightChange(index, value)}>{set.weight}</TextInput>
                <Text style={styles.setTextExerciseBox}>kg/lbs</Text>
                <TextInput keyboardType="numeric" style={styles.setTextExerciseBox} 
                onChangeText={(value) => handleRepsChange(index, value)}>{set.reps}</TextInput>
                <Text style={styles.setTextExerciseBox}>reps</Text>
              </View>
            ))}
          </View>
        <TouchableOpacity style={styles.addSetButtonExerciseBox} onPress={handleAddSet}>
          <Text style={styles.addSetButtonTextExerciseBox}>Add Set</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //Define the ExerciseBox object displayed in the ViewPastSession page
export const ExerciseBoxPastSession = ({ exercise }: { exercise: Exercise }) => {
  
  return (
    <View style={styles.exerciseBoxContainer}>
      <Text style={styles.exerciseTitle}>{exercise.name}</Text>
      <View style={styles.underline}></View>
        <View style={styles.setsContainerExerciseBox}>
          {exercise.sets.map((set: Set, index: number) => (
            <View key={index} style={styles.setExerciseBox}>
              <Text style={styles.setTextExerciseBox}>Set {index + 1}</Text>
              <Text style={styles.setTextExerciseBox}>{set.weight}</Text>
              <Text style={styles.setTextExerciseBox}>kg/lbs</Text>
              <Text style={styles.setTextExerciseBox}>{set.reps}</Text>
              <Text style={styles.setTextExerciseBox}>reps</Text>
            </View>
          ))}
        </View>
    </View>
  );
};

export default ExerciseBox;