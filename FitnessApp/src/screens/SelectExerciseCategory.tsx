import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Animated } from 'react-native';
import { styles } from '../Misc/ComponentStyles';
import { Props, Routine, Exercise, Set, generateRandomId, ExerciseCategory, loadExerciseCategories } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SelectCategoryProps = {
  navigation: any; // The navigation prop used for screen navigation
  route: {
    params: {
      updateRoutineExercises: (newExercise: Exercise) => void; // Callback function to update routineExercises
    };
  };
};

const SelectExerciseCategory = ({ route, navigation }: SelectCategoryProps) => {

    //List of saved exercise categories
    const [categories, setCategories] = useState<ExerciseCategory[]>([]);
    const { updateRoutineExercises } = route.params;

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
    
    const handleAddExerciseToRoutine = (category: ExerciseCategory) => {
      console.log('handlu')
      console.log(category)
      console.log(updateRoutineExercises)
      console.log(goBackToCreateRoutine)
      navigation.navigate('ChooseExerciseFromCategory', {
        category: category,
        updateRoutineExercises: updateRoutineExercises,
        goBackToCreateRoutine: goBackToCreateRoutine
      });
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
          <TouchableOpacity
            //style={styles.exerciseItem}
            onPress={() => {handleAddExerciseToRoutine(item)}}
          >
            <Text style={styles.headerRowsDatePastSession}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    );
  };
  
  export default SelectExerciseCategory;