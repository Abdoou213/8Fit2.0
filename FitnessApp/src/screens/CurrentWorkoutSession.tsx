import { StyleSheet, View, Text, Animated, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { RootStackParamList } from '../../App';
import ExerciseBox from '../Components/ExerciseBox';
import {WorkoutSession, createWorkoutSession, storeSession, finalizeWorkoutSession} from '../Components/WorkoutSession';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { styles } from '../Misc/ComponentStyles';

//CurrentWorkout Screen Properties
type CurrentWorkoutSessionProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CurrentWorkoutSession', 'ViewRoutine'>;
  route: RouteProp<RootStackParamList, 'CurrentWorkoutSession'>;
};

//Define CurrentWorkoutSession component
const CurrentWorkoutSession = ({ route, navigation }: CurrentWorkoutSessionProps) => {

  //1) Screen Attributes
  const { routine: chosenRoutine } = route.params; // Extract the routine parameter

  //2) Create the workoutSession data using the methods
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession>(
    createWorkoutSession(chosenRoutine)
  );

  //Define a function to handle finishing the workout session
  const handleFinishWorkout = () => {
    console.log(workoutSession);
    if (workoutSession) {
      // Update the workoutSession with endTime and duration
      const finalizedSession = finalizeWorkoutSession(workoutSession);

      // Store the updated session
      storeSession(finalizedSession);
    }

    //Return to list of routines
    navigation.goBack();
  };

  return (
    <FlatList
      data={workoutSession.routine ? workoutSession.routine.exercises : []}
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
                <Text style={styles.headerTextCurrentWorkout}>+</Text>
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