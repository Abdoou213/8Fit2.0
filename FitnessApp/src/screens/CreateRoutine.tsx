import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Props, Routine, generateRandomId } from '../Components/AppComponents';
import { Exercise } from '../Components/Exercise';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRoutine = ({ navigation }: Props) => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const updateRoutineExercises = (newExercise: Exercise) => {
    setExercises([...exercises, newExercise]);
  }

  const handleSaveRoutine = async () => {
    if (!routineName.trim()) {
      Alert.alert('Routine name cannot be empty');
      return;
    }
    
    if (routineName.length > 30) {
      Alert.alert('Routine name is too long (max 30 characters)');
      return;
    }

    if (exercises.length === 0) {
      Alert.alert('Please add at least one exercise to the routine');
      return;
    }

    const newRoutine: Routine = { name: routineName, exercises, id: generateRandomId() };
    try {
      const existingRoutines = await AsyncStorage.getItem('routines');
      const parsedRoutines = existingRoutines ? JSON.parse(existingRoutines) : [];
      const routineExists = parsedRoutines.some((routine: Routine) => routine.name === routineName);

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

  const handleCancel = () => {
    navigation.navigate('ViewRoutine');
  };

  const handleSelectExercise = () => {
    navigation.navigate('SelectExerciseStack', {
      routineExercises: exercises,
      updateRoutineExercises,
    });
  };

  return (
    <View style={styles.screenListContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.setLabelCreate}>Routine Name:</Text>
        <TextInput style={styles.input} value={routineName} onChangeText={setRoutineName} />
        <TouchableOpacity style={styles.addButtonCreate} onPress={handleSelectExercise}>
          <Text style={styles.buttonText}>Select Exercise</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.createRoutineExercisesListLabel}>Exercises</Text>
      <FlatList
        data={exercises}
        style={styles.screenListContainer}
        renderItem={({ item }) => (
          <View key={item.name} style={styles.exerciseCreate}>
            <Text style={styles.createRoutineExerciseName}>{item.name}</Text>
            <Text style={styles.setLabelCreate}>Number of Sets: {item.setsCount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity style={styles.saveButtonCreate} onPress={handleSaveRoutine}>
        <Text style={styles.buttonText}>Save Routine</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButtonCreate} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoutine;
