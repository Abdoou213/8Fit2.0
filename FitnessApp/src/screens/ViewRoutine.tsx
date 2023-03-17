import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Set navigation type
type Props = {
  navigation: any;
};

const ROUTINES = [
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
];
  
  //Define ViewRoutine component
  const ViewRoutine = ({ navigation }: Props) => {
    const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(null);

  const handleRoutinePress = (index: any) => {
    setSelectedRoutineIndex(index);
  };

    return (
      <View style={styles.container}>
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
        </ScrollView>
        {selectedRoutineIndex !== null && (
          <TouchableOpacity style={styles.startWorkoutButton} onPress={() => navigation.navigate('StartWorkout')}>
            <Text style={styles.startWorkoutButtonText}>Start Workout</Text>
          </TouchableOpacity>
        )}
        {/* Add button to redirect to CreateRoutine*/}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateRoutine')}>
          <Ionicons name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
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
    },
    button: {
      position: 'absolute',
      bottom: 16,
      left: 100,
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
      padding: 10,
    },
    selectedRoutineBox: {
      borderColor: '#007AFF',
      borderWidth: 2,
    },
    routineName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
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
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    setBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginRight: 10,
      marginBottom: 10,
      padding: 5,
    },
    setInfo: {
      fontSize: 14,
    },
    startWorkoutButton: {
      backgroundColor: '#007AFF',
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    startWorkoutButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });


  export default ViewRoutine;
