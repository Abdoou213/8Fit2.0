import { View, Text, Animated, TouchableOpacity, Alert, FlatList } from 'react-native';
import { RootStackParamList } from '../../App';
import ExerciseBox from '../Components/ExerciseBox';
import {WorkoutSession, createWorkoutSession, storeSession, finalizeWorkoutSession} from '../Components/WorkoutSession';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { styles } from '../Misc/ComponentStyles';
import { Routine } from '../Components/AppComponents';

//CurrentWorkout Screen Properties
type CurrentWorkoutSessionProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CurrentWorkoutSession', 'ViewRoutine'>;
  route: {
    params: {
      routine?: Routine,
      currWorkoutSession?: WorkoutSession
    };
  };
};

//Define CurrentWorkoutSession component
const CurrentWorkoutSession = ({ route, navigation }: CurrentWorkoutSessionProps) => {

  //1) Screen Attributes
  const { currWorkoutSession } = route.params;
  const initialWorkoutSession = currWorkoutSession ? currWorkoutSession : createWorkoutSession(route.params?.routine as Routine); 
  const [routineLoaded, setRoutineLoaded] = useState<boolean>(false);

  //2) Create the workoutSession data using the methods
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession>(
    initialWorkoutSession
  );

  useFocusEffect(() => {
    // Load the routine only if it hasn't been loaded yet
    if (!routineLoaded) {
      // Initialize routine here if it's not available
      // For example, you can fetch it from storage or wherever it's stored
      setRoutineLoaded(true); // Mark the routine as loaded
    }
    
    if (currWorkoutSession) {
      setWorkoutSession(currWorkoutSession);
    }
  },);

  // Opens the page towards the ExerciseCategory to choose a new Exercise from
  const handleAddExercise = () => {
    navigation.navigate('SelectExerciseStack', {
      currWorkoutSession: workoutSession,
    });
  };

  //Define a function to handle finishing the workout session
  const handleFinishWorkout = () => {

    if (workoutSession) {
      // Update the workoutSession with endTime and duration
      const finalizedSession = finalizeWorkoutSession(workoutSession);
 
      // Store the updated session
      storeSession(finalizedSession);
    }

    //Return to list of routines
    navigation.goBack();
  };

  const handleTestingBallz = () => {
    navigation.navigate('AwardExpToCharScreen', {
      currentSession: workoutSession,
    });
  };

  return (
    <FlatList
      data={workoutSession.routine ? workoutSession.exercises : []}
      style={styles.scrollViewContainer}
      renderItem={({ item }) => (
        <ExerciseBox
          title={item.name}
          exercise={item}
          workoutSession={workoutSession}
          setWorkoutSession={setWorkoutSession}
        />
      )}
      keyExtractor={item => item.name}
      ListHeaderComponent={
        <Animated.View>
          <View style={styles.headerContainer}>
            <Text style={styles.logHeaderTitle}> {workoutSession ? workoutSession.routine.name : ""} </Text>
            <Text style={styles.currentWorkoutHeaderDate}> {workoutSession ? workoutSession.startTimeString : ""} </Text>
            <View style={styles.underline}></View>
            <View style={styles.currentWorkoutHeader}>
              <TouchableOpacity style={styles.finishButtonCurrentWorkout}>
                <Text style={styles.headerTextCurrentWorkout} onPress={handleAddExercise}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.finishButtonCurrentWorkout} onPress={handleFinishWorkout}>
                <Text style={styles.headerTextCurrentWorkout}>Finish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.finishButtonCurrentWorkout} onPress={handleTestingBallz}>
                <Text style={styles.headerTextCurrentWorkout}>Character</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      }
    />
  );
};

export default CurrentWorkoutSession;
