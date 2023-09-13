import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import {Exercise } from '../Components/Exercise';
import {ExerciseCategory, loadExerciseCategories } from '../Components/ExerciseCategory';
import { WorkoutSession } from '../Components/WorkoutSession';

type SelectCategoryProps = {
  navigation: any; // The navigation prop used for screen navigation
  route: {
    params: {
      updateRoutineExercises?: (newExercise: Exercise) => void; // Callback function to update routineExercises
      currWorkoutSession?: WorkoutSession;
    };
  };
};

const SelectExerciseCategory = ({ route, navigation }: SelectCategoryProps) => {

    //List of saved exercise categories
    const [categories, setCategories] = useState<ExerciseCategory[]>([]);
    const { currWorkoutSession, updateRoutineExercises } = route.params;

    //Loads all existing ExerciseCategory objects upon loading page
    useEffect(() => {
      const fetchExerciseCategories = async () => {
        try {
          const loadedCategories = await loadExerciseCategories();
          setCategories(loadedCategories);
        } catch (error) {
          // Handle any errors
          console.error('Error loading exercise categories:', error);
        }
      };
  
      // Fetch exercise categories when the component mounts
      fetchExerciseCategories();
    }, []);

    const goBackToCreateRoutine = () => {
      navigation.navigate('CreateRoutine');
    };

    const goBackToCurrentWorkout = (currWorkoutSession: WorkoutSession) => {
      navigation.navigate('CurrentWorkoutSession', {currWorkoutSession: currWorkoutSession});
    };
    
    const handleAddExerciseToRoutine = (category: ExerciseCategory) => {
      if(updateRoutineExercises){
        navigation.navigate('ChooseExerciseFromCategory', {
          category: category,
          updateRoutineExercises: updateRoutineExercises,
          goBackToPreviousScreen: goBackToCreateRoutine
        });
      }

      if(currWorkoutSession){
        navigation.navigate('ChooseExerciseFromCategory', {
          category: category,
          currWorkoutSession: currWorkoutSession,
          goBackToCurrentWorkout: goBackToCurrentWorkout
        });
    }
  }

    return (
      <FlatList
        style={styles.screenListContainer}
        ListHeaderComponent={
          <Animated.View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButtonViewPastSession}
            >
              <Text style={styles.closeButtonTextViewPastSession}>X</Text>
            </TouchableOpacity>
            <View style={styles.headerContainerPastSession}>
              <View style={styles.underline}>
                <Text style={styles.headerRowsDatePastSession}>Categories</Text>
              </View>
            </View>
          </Animated.View>
        }
        data={categories}
        renderItem={({ item }) => (
          <View>
            <View style={styles.underline}></View>
            <TouchableOpacity
              onPress={() => {handleAddExerciseToRoutine(item)}}
            >
              <Text style={styles.headerRowsDatePastSession}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.underline}></View>
          </View>
          
        )}
        keyExtractor={(item) => item.name}
      />
    );
  };
  
  export default SelectExerciseCategory;