import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Props, Routine, Exercise, Set } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Creates the current routine
const CreateRoutine = ({ navigation }: Props) => {
  const [routineName, setRoutineName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [setsCount, setSetsCount] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  //Adds an exercise to a routine
  const handleAddExercise = () => {

    //Create the new Exercise object
    const newExercise: Exercise = {
      name: exerciseName,
      //Creates the array of sets
      sets: Array.from({ length: parseInt(setsCount) }, (_, index) => ({
        id: index + 1,
        weight: 0,
        reps: 0,
      })),
      setsCount: parseInt(setsCount),
    };

    //Update with hooks
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setSetsCount('');
  };

  //Saves the current routine
  const handleSaveRoutine = async () => {

    // Generates a random 5-digit integer for the new routine
    const generateRandomId = () => {
      return Math.floor(10000 + Math.random() * 90000);
    };

    const newRoutine: Routine = { name: routineName, exercises, id: generateRandomId() };
    try {
      const existingRoutines = await AsyncStorage.getItem('routines');
      const parsedRoutines = existingRoutines ? JSON.parse(existingRoutines) : [];

      const routineExists = parsedRoutines.some((routine: Routine) => routine.name === routineName);

      //Block in case of duplicating routine
      if (routineExists) {
        Alert.alert('Routine name already exists');
        return;
      }

      const updatedRoutines = [...parsedRoutines, newRoutine];
      await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
      console.log('Routine saved successfully:', newRoutine);
      navigation.navigate('ViewRoutine');
    } catch (e) {
      console.error('Error saving routine:', e);
    }
  };

  //Handles leaving the current creation screen to return to the list of routines
  const handleCancel = () => {
    navigation.navigate('ViewRoutine');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Routine Name:</Text>
        <TextInput style={styles.input} value={routineName} onChangeText={setRoutineName} />

        <Text style={styles.label}>Exercise Name:</Text>
        <TextInput style={styles.input} value={exerciseName} onChangeText={setExerciseName} />

        <Text style={styles.label}>Number of Sets:</Text>
        <TextInput style={styles.input} value={setsCount} onChangeText={setSetsCount} />

        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRoutine}>
          <Text style={styles.buttonText}>Save Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View key={item.name} style={styles.exercise}>
            <Text style={styles.createRoutineExerciseName}>{item.name}</Text>
            <Text style={styles.setLabel}>Number of Sets: {item.setsCount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default CreateRoutine;
