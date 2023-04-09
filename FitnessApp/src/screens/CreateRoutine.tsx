import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Routine, Exercise, Set } from './ViewRoutine';

type Props = {
  navigation: any;
};

const CreateRoutine = ({ navigation }: Props) => {
  const [routineName, setRoutineName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [setsCount, setSetsCount] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercise = () => {
    const newExercise: Exercise = {
      name: exerciseName,
      sets: [],
      setsCount: parseInt(setsCount),
    };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setSetsCount('');
  };


  const handleSaveRoutine = async () => {
    const newRoutine: Routine = { name: routineName, exercises };
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



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Routine Name:</Text>
        <TextInput style={styles.input} value={routineName} onChangeText={setRoutineName} />

        <Text style={styles.label}>Exercise Name:</Text>
        <TextInput style={styles.input} value={exerciseName} onChangeText={setExerciseName} />

        <Text style={styles.label}>Number of Sets:</Text>
<View style={styles.input}>
<Picker
    selectedValue={setsCount}
    onValueChange={(value) => setSetsCount(value)}
  >
    {[...Array(10)].map((_, index) => (
      <Picker.Item key={index} label={(index + 1).toString()} value={(index + 1).toString()} />
    ))}
  </Picker>

</View>


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
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.setLabel}>Number of Sets: {item.setsCount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />


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
    marginBottom: 8,
  },
  cancelButton: {
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    paddingVertical: 8,
    marginBottom: 8,
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
