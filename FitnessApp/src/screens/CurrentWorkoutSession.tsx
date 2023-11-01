import { View, Text, Animated, TouchableOpacity, FlatList } from 'react-native';
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
 
    // Calculate EXP points based on your business logic here
    const expPoints = calculateExpForWorkout(finalizedSession); // Implement this function
    // Store the updated session
    storeSession(finalizedSession);

    // Move to the screen to award EXP points and pass the calculated EXP
    navigation.navigate('AwardExpToCharScreen', {
      experiencePointsSession: expPoints,
    });
    }  
  };

  //Calculates EXP gained from the session
  function calculateExpForWorkout(session: WorkoutSession) {
    if (!session) {
      return 0; // If the session or exercises are missing, no EXP to award.
    }
  
    const expPerCompletedRep = 10;
    let totalExp = 0;
    
    //+10EXP per repetition completed
    for (const exercise of session.exercises) {
      if (exercise.sets) {
        for (const set of exercise.sets) {
          if (set.reps > 0) {
            totalExp += set.reps * expPerCompletedRep;
          }
        }
      }
    }
  
    return totalExp;
  }

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
            </View>
          </View>
        </Animated.View>
      }
    />
  );
};

export default CurrentWorkoutSession;
