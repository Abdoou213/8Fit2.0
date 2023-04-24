import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: any;
};

async function deleteAllRoutines() {
  try {
    await AsyncStorage.removeItem('routines');
    console.log('All routines deleted from async storage.');
  } catch (error) {
    console.log('Error deleting routines from async storage:', error);
  }
}

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
  const [refreshing, setRefreshing] = useState(false);

  const handleRoutinePress = (index: number) => {
    setSelectedRoutineIndex(index);
  };

  const onDeleteRoutine = async () => {
    if (selectedRoutineIndex !== null) {
      try {
        const updatedRoutines = [...routines];
        updatedRoutines.splice(selectedRoutineIndex, 1);
        await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
        setRoutines(updatedRoutines);
        setSelectedRoutineIndex(null);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const onRefresh = async () => {
    setRefreshing(true);
    const routinesFromStorage = await fetchAllRoutines();
    if (routinesFromStorage !== null) {
      setRoutines(routinesFromStorage);
    }
    setRefreshing(false);
  };

  const handleDeleteAllRoutines = async () => {
    try {
      deleteAllRoutines();
      setRoutines([]);
      setSelectedRoutineIndex(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const routinesFromStorage = await fetchAllRoutines();
      if (routinesFromStorage !== null) {
        setRoutines(routinesFromStorage);
      }
    });
    return unsubscribe;
  }, [navigation]);

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
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
                      {exercise.sets.map((set, index) => (
                        <View key={set.id} style={styles.setBox}>
                          <Text style={styles.setInfo}>{`${index + 1}. ${set.weight} lbs x ${set.reps} reps`}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.setInfo}>{`Sets: ${exercise.setsCount}`}</Text>
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
  {selectedRoutineIndex !== null && (
    <TouchableOpacity
      style={styles.deleteRoutineButton}
      onPress={() => onDeleteRoutine()}
    >
      <Text style={styles.deleteRoutineButtonText}>Delete</Text>
    </TouchableOpacity>
  )}
  <TouchableOpacity
    style={styles.deleteRoutinesButton}
    onPress={handleDeleteAllRoutines}
  >
    <Text style={styles.deleteRoutinesButtonText}>Delete All</Text>
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
  setsCount: number
};

export type Routine = {
  name: string;
  exercises: Exercise[];
};

//Add style to the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyRoutineText: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 20,
  },
  createRoutineButton: {
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2196f3',
    borderRadius: 5,
  },
  createRoutineButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  routineBox: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedRoutineBox: {
    backgroundColor: '#f2f2f2',
  },
  routineName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exerciseList: {
    marginTop: 10,
  },
  exerciseBox: {
    marginTop: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  setList: {
    marginTop: 5,
  },
  setBox: {
    marginTop: 5,
  },
  setInfo: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  startWorkoutButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#2196f3',
    borderRadius: 5,
  },
  startWorkoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteRoutineButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  deleteRoutineButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteRoutinesButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#cc0000',
    borderRadius: 5,
  },
  deleteRoutinesButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default ViewRoutine;
