import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Exercise, ExerciseCategory } from '../Components/AppComponents';
import { RouteProp, useNavigation } from '@react-navigation/native';

// ... Rest of your imports ...
import { RootStackParamList } from '../../App';

export type ChooseExerciseFromCategoryProps = {
  route: RouteProp<RootStackParamList, 'ChooseExerciseFromCategory'>;
  updateRoutineExercises: (newExercise: Exercise) => void;
  goBackToCreateRoutine: () => void; // Include this in your props
};

const ChooseExerciseFromCategory: React.FC<ChooseExerciseFromCategoryProps> = ({ route}) => {

  const navigation = useNavigation();

  // Access the exerciseCategory from route.params.category
  const exerciseCategory: ExerciseCategory = route.params?.category;
  // Initialize the exercises state with the exerciseList from exerciseCategory
  const [exercises, setExercises] = useState<Exercise[]>(exerciseCategory.exerciseList);

  // Access the updateRoutineExercises function from the navigation params
  const updateRoutineExercises = route.params?.updateRoutineExercises;
  const goBackToCreateRoutine = route.params?.goBackToCreateRoutine;

  // Initializes the list of exercises within the ExerciseCategory upon loading the page
  useEffect(() => {
    setExercises(exerciseCategory.exerciseList);
  }, [exerciseCategory]);

  // Function to handle adding an exercise to the routine and calling the callback
  const handleAddExerciseToRoutine = (newExercise: Exercise) => {
    // Add the newExercise to the routine exercises
    updateRoutineExercises(newExercise);
    goBackToCreateRoutine();
  };

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
                <Text style={styles.headerRowsDatePastSession}>Exercices</Text>
              </View>
            </View>
          </Animated.View>
        }
        data={exercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {handleAddExerciseToRoutine(item)}}
          >
            <Text style={styles.headerRowsDatePastSession}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    );
  };
  
  export default ChooseExerciseFromCategory;
