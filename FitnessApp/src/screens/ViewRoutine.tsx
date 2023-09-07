import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Props, Routine } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Deletes all currently saved routines
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
  //Variables used across this screen
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState<number | null>(null);  //TODO: SHOULD USE ROUTINE ID NOT INDEX
  const [refreshing, setRefreshing] = useState(false);

  //Detects which Routine was selected
  const handleRoutinePress = (index: number) => {
    console.log(index)
    setSelectedRoutineIndex(index);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const routinesFromStorage = await fetchAllRoutines();
    if (routinesFromStorage !== null) {
      setRoutines(routinesFromStorage);
    }
    setRefreshing(false);
  };

  //Deletes all previously created routines
  const handleDeleteAllRoutines = async () => {
    try {
      deleteAllRoutines();
      setRoutines([]);
      setSelectedRoutineIndex(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to initialize exercise categories if not already initialized (done first time users opens the app)
 const initializeExerciseCategories = async () => {
  try {
    // Check if the initialization flag is set in AsyncStorage
    const isInitialized = await AsyncStorage.getItem('exerciseCategoriesInitialized');
    console.log('INITIALIZEDDDDDDDDD')
    if (!isInitialized) {
      // Initialize default exercise categories
      const defaultCategories = [
        // Your default categories here
        { name: 'Core', categoryId: 1, exerciseList: [] },
        { name: 'Back', categoryId: 2, exerciseList: [] },
        { name: 'Biceps', categoryId: 3, exerciseList: [] },
        { name: 'Triceps', categoryId: 4, exerciseList: [] },
        { name: 'Chest', categoryId: 5, exerciseList: [] },
        { name: 'Legs', categoryId: 6, exerciseList: [] },
      ];

      // Save the default exercise categories to AsyncStorage
      await AsyncStorage.setItem('exerciseCategories', JSON.stringify(defaultCategories));
      console.log('INITIALIZED')
      // Set the initialization flag in AsyncStorage
      await AsyncStorage.setItem('exerciseCategoriesInitialized', 'true');
    }
  } catch (error) {
    console.error('Error initializing exercise categories:', error);
  }
};

  useEffect(() => {
    console.log('ZOINKS');
    initializeExerciseCategories();
    const unsubscribe = navigation.addListener('focus', async () => {
      const routinesFromStorage = await fetchAllRoutines();
      if (routinesFromStorage !== null) {
        setRoutines(routinesFromStorage);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.scrollViewContainer}>
      <Text style={styles.logHeaderTitle}>Routines</Text>
      <View style={styles.underline}></View>
      {routines.length === 0 ? (
        <View style={styles.scrollViewContainer}>
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
              style={[styles.viewRoutineroutineBox, selectedRoutineIndex === index && styles.selectedRoutineBox]}
              onPress={() => handleRoutinePress(index)}
            >
              <Text style={styles.routineName}>{routine.name}</Text>
              <View style={styles.underline}></View>
              <View style={styles.exerciseList}>
                {routine.exercises.map((exercise) => (
                  <View key={exercise.name} style={styles.exerciseInListDisplayed}>
                    <Text style={styles.setInfo}>{exercise.name}</Text>
                    <Text style={styles.setInfo}> x {exercise.setsCount} Sets</Text>
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
            style={styles.currentWorkoutButton}
            onPress={() => navigation.navigate('CurrentWorkoutSession', { routine: routines[selectedRoutineIndex] })}
          >
            <Text style={styles.currentWorkoutButtonText}>Start Workout</Text>
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

export default ViewRoutine;
