import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Routine, Exercise, Set } from './ViewRoutine';

// Set navigation type
type Props = {
  navigation: any;
};

const ExerciseList = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <>
      {exercises.map((exercise) => (
        <View key={exercise.name} style={styles.exercise}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          {exercise.sets.map((set) => (
            <View key={set.id} style={styles.exerciseSet}>
              <Text style={styles.setLabel}>Set {set.id}: </Text>
              <View style={styles.setValuesContainer}>
                <Text style={styles.setValue}>{set.weight} lbs</Text>
                <Text style={styles.timesLabel}>x</Text>
                <Text style={styles.setValue}>{set.reps}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </>
  );
};

const CreateRoutine = ({ navigation }: Props) => {
  const [routineName, setRoutineName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<Set[]>([]);

  const handleAddSet = () => {
    const newSet = { id: sets.length + 1, weight: Number(weight), reps: Number(reps) };
    setSets([...sets, newSet]);
    setWeight('');
    setReps('');
  };

  const handleAddExercise = () => {
    const newExercise = { name: exerciseName, sets };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setSets([]);
  };

  const handleSaveRoutine = async () => {
    const newRoutine: Routine = { name: routineName, exercises };
    try {
      const existingRoutines = await AsyncStorage.getItem('routines');
      const parsedRoutines = existingRoutines ? JSON.parse(existingRoutines) : [];
  
      // Check if routine name already exists
      const routineExists = parsedRoutines.some((routine: Routine) => routine.name === routineName);
  
      if (routineExists) {
        Alert.alert('Routine name already exists');
        return;
      }
      // Save routine 
      const updatedRoutines = [...parsedRoutines, newRoutine];
      await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
      console.log('Routine saved successfully:321', newRoutine);
      // go to viewRoutine screen
      navigation.navigate('ViewRoutine');
    } catch (e) {
      console.error('Error saving routine:', e);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Routine Name:</Text>
        <TextInput value={routineName} onChangeText={setRoutineName} />

        <Text style={styles.label}>Exercise Name:</Text>
        <TextInput value={exerciseName} onChangeText={setExerciseName} />

        <View style={styles.setsContainer}>
          <View style={styles.setsInputContainer}>
            <Text style={styles.label}>Weight:</Text>
            <TextInput value={weight} onChangeText={setWeight} style={styles.input} />
          </View>
          <View style={styles.setsInputContainer}>
            <Text style={styles.label}>Reps:</Text>
            <TextInput value={reps} onChangeText={setReps} style={styles.input} />
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddSet}>
          <Text style={styles.buttonText}>Add Set</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRoutine}>
          <Text style={styles.buttonText}>Save Routine</Text>
        </TouchableOpacity>
      </View>

      <ExerciseList exercises={exercises} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setsInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    paddingVertical: 8,
    marginBottom: 8,
  },
  saveButton: {
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  exercise: {
    marginBottom: 16,
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  exerciseSet: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  setLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  setValuesContainer: {
    flexDirection: 'row',
  },
  setValue: {
    marginRight: 8,
  },
  timesLabel: {
    fontWeight: 'bold',
  },


  
});

export default CreateRoutine;
