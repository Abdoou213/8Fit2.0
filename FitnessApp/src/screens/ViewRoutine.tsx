import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set navigation type
type Props = {
  navigation: any;
};

// Function to delete all routines in async storage
async function deleteAllRoutines() {
  try {
    await AsyncStorage.removeItem('routines');
    console.log('All routines deleted from async storage.');
  } catch (error) {
    console.log('Error deleting routines from async storage:', error);
  }
}

// Function to fetch all updated routines from async storage
async function fetchAllRoutines() {
  try {
    const routinesJson = await AsyncStorage.getItem('routines');
    const routines = routinesJson != null ? JSON.parse(routinesJson) : [];
    console.log('Fetch all routines', routines);
    return routines;
    console.log('', routines);
  } catch (error) {
    console.log('Error fetching routines from async storage:', error);
    return [];
  }
}


const ViewRoutine = ({ navigation }: Props) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState<number | null>(null);

  const handleRoutinePress = (index: number) => {
    setSelectedRoutineIndex(index);
  };

  useEffect(() => {
    const getRoutines = async () => {
      const routinesFromStorage = await fetchAllRoutines();
      if (routinesFromStorage !== null) {
        setRoutines(routinesFromStorage);
      }
    };
    getRoutines();
  }, []);  

  const handleDeleteAllRoutines = async () => {
    try {
      deleteAllRoutines();
      setRoutines([]);
      setSelectedRoutineIndex(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {routines.length === 0 ? (
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
          {routines.map((routine, index) => (
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
      <View style={styles.buttonContainer}>
      {selectedRoutineIndex !== null && (
        <TouchableOpacity
          style={styles.startWorkoutButton}
          onPress={() => navigation.navigate('StartWorkout')}
        >
          <Text style={styles.startWorkoutButtonText}>Start Workout</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.deleteRoutinesButton}
        onPress={handleDeleteAllRoutines}
      >
        <Text style={styles.deleteRoutinesButtonText}>Delete All Routines</Text>
      </TouchableOpacity>
    </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
  },
  deleteRoutinesButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteRoutinesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  startWorkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startWorkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});





export default ViewRoutine;
