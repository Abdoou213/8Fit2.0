import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
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
        <View key={exercise.name}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{exercise.name}</Text>
          {exercise.sets.map((set) => (
            <View key={set.id} style={{ flexDirection: 'row' }}>
              <Text>Set {set.id}: </Text>
              <Text>{set.weight} lbs</Text>
              <Text> x </Text>
              <Text>{set.reps}</Text>
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
      const updatedRoutines = [...parsedRoutines, newRoutine];
      await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
      console.log('Routine saved successfully:', newRoutine);
  
      // Add a delay of 500 milliseconds (half a second) before navigating to the 'ViewRoutine' screen
      setTimeout(() => {
        navigation.navigate('ViewRoutine');
      }, 500);
    } catch (e) {
      console.error('Error saving routine:', e);
    }
  };
  
  
  

  return (
    <View style={{ padding: 16 }}>
      <Text>Routine Name:</Text>
      <TextInput value={routineName} onChangeText={setRoutineName} />

      <Text>Exercise Name:</Text>
      <TextInput value={exerciseName} onChangeText={setExerciseName} />

      <Text>Weight:</Text>
      <TextInput value={weight} onChangeText={setWeight} />

      <Text>Reps:</Text>
      <TextInput value={reps} onChangeText={setReps} />

  
      <Button title="Add Set" onPress={handleAddSet} />
      <Button title="Add Exercise" onPress={handleAddExercise} />
      <Button title="Save Routine" onPress={handleSaveRoutine} />

      <ExerciseList exercises={exercises} />
    </View>
  );
};

export default CreateRoutine;
