import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set navigation type
type Props = {
  navigation: any;
};
// Array of routines for display
const ROUTINES: Routine[] = [
  {
    name: 'Routine 1',
    exercises: [
      {
        name: 'Exercise 1',
        sets: [
          { id: 1, weight: 100, reps: 10 },
          { id: 2, weight: 110, reps: 8 },
          { id: 3, weight: 120, reps: 6 },
        ],
      },
      {
        name: 'Exercise 2',
        sets: [
          { id: 1, weight: 50, reps: 10 },
          { id: 2, weight: 55, reps: 8 },
          { id: 3, weight: 60, reps: 6 },
        ],
      },
    ],
  },
  {
    name: 'Routine 2',
    exercises: [
      {
        name: 'Exercise 1',
        sets: [
          { id: 1, weight: 120, reps: 10 },
          { id: 2, weight: 130, reps: 8 },
          { id: 3, weight: 140, reps: 6 },
        ],
      },
      {
        name: 'Exercise 2',
        sets: [
          { id: 1, weight: 60, reps: 10 },
          { id: 2, weight: 65, reps: 8 },
          { id: 3, weight: 70, reps: 6 },
        ],
      },
    ],
  },
  {
    name: 'Routine 3',
    exercises: [
      {
        name: 'Exercise 1',
        sets: [
          { id: 1, weight: 120, reps: 10 },
          { id: 2, weight: 130, reps: 8 },
          { id: 3, weight: 140, reps: 6 },
        ],
      },
      {
        name: 'Exercise 2',
        sets: [
          { id: 1, weight: 60, reps: 10 },
          { id: 2, weight: 65, reps: 8 },
          { id: 3, weight: 70, reps: 6 },
        ],
      },
    ],
  },
];

//Define ViewRoutine component
const ViewRoutine = ({ navigation }: Props) => {
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(null);

  const handleRoutinePress = (index: any) => {
    setSelectedRoutineIndex(index);
  };

  return (
    <View style={styles.container}>
      {ROUTINES.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.emptyRoutineText}>No routines found.</Text>
          <TouchableOpacity
            style={styles.createRoutineButton}
            onPress={() => navigation.navigate('CreateRoutine')}
          >
            <Text style={styles.createRoutineButtonText}>Create a new Routine</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {ROUTINES.map((routine, index) => (
            <TouchableOpacity
              key={routine.name}
              style={[styles.routineBox, selectedRoutineIndex === index && styles.selectedRoutineBox]}
              onPress={() => handleRoutinePress(index)}
            >
              <Text style={styles.routineName}>{routine.name}</Text>
              <View style={styles.exerciseList}>
                {routine.exercises.map((exercise) => (
                  <View key={exercise.name} style={styles.exerciseBox}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <View style={styles.setList}>
                      {exercise.sets.map((set) => (
                        <View key={set.id} style={styles.setBox}>
                          <Text style={styles.setInfo}>{set.weight} lbs x {set.reps} reps</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.createRoutineButton}
            onPress={() => navigation.navigate('CreateRoutine')}
          >
            <Text style={styles.createRoutineButtonText}>Create a new Routine</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      {selectedRoutineIndex !== null && (
        <TouchableOpacity
          style={styles.startWorkoutButton}
          onPress={() => navigation.navigate('StartWorkout')}
        >
          <Text style={styles.startWorkoutButtonText}>Start Workout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Define the structure of the routine object
export type Set = {
  id: number;
  weight: number;
  reps: number;
};

export type Exercise = {
  name: string;
  sets: Set[];
};

export type Routine = {
  name: string;
  exercises: Exercise[];
};

// Define the function to store a routine object
export const storeRoutine = async (routine: Routine) => {
  try {
    const existingRoutines = await AsyncStorage.getItem('routines');
    let routines = [];

    if (existingRoutines !== null) {
      routines = JSON.parse(existingRoutines);
    }

    routines.push(routine);
    await AsyncStorage.setItem('routines', JSON.stringify(routines));
  } catch (error) {
    console.error(error);
  }
};

// Define the function to retrieve all routine objects
export const getRoutines = async (): Promise<Routine[]> => {
  try {
    const routines = await AsyncStorage.getItem('routines');

    if (routines !== null) {
      return JSON.parse(routines);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

//Add style to the component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 70,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  routineBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  selectedRoutineBox: {
    backgroundColor: '#f0f0f0',
  },
  routineName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyRoutineText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  exerciseList: {
    marginTop: 10,
  },
  exerciseBox: {
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  setList: {
    marginLeft: 20,
  },
  setBox: {
    marginBottom: 5,
  },
  setInfo: {
    fontSize: 14,
  },
  startWorkoutButton: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  createRoutineButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    flex: 0,
  },
  createRoutineButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});





export default ViewRoutine;
