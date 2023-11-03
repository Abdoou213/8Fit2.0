import { View, Text, Animated, TouchableOpacity, FlatList } from 'react-native';
import { RootStackParamList } from '../../App';
import ExerciseBox from '../Components/ExerciseBox';
import {WorkoutSession, createWorkoutSession, storeSession, finalizeWorkoutSession} from '../Components/WorkoutSession';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { styles } from '../Misc/ComponentStyles';
import { Routine } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Character, { updateCharacterExpAndLevel } from '../Components/Character';
import FrameAnimation from '../Components/FrameAnimation';

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

  const computeExpProgressCalled = useRef(false);

  //2) Create the workoutSession data using the methods
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession>(
    initialWorkoutSession
  );

  useFocusEffect(() => {
    // Load the routine only if it hasn't been loaded yet
    if (!routineLoaded) {
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
  const handleFinishWorkout = async () => {

    if (workoutSession) {
      // Update the workoutSession with endTime and duration
      const finalizedSession = finalizeWorkoutSession(workoutSession);
 
      // Calculate EXP points based on your business logic here
      const expPoints = calculateExpForWorkout(finalizedSession); // Implement this function
      // Store the updated session
      storeSession(finalizedSession);
      
      await initializeCharacter(expPoints);
      let didLevelUp = await AsyncStorage.getItem('characterLeveledUp');
      await AsyncStorage.setItem('characterLeveledUp', 'false');

      // Move to the screen to award EXP points and pass the calculated EXP
      if(didLevelUp === 'true'){       
        navigation.navigate('LevelUpScreen',{earnedExp: expPoints});
      }else{
        navigation.navigate('AwardExpToCharScreen',{earnedExp: expPoints});
      }
      
    }  
  };

  const initializeCharacter = async (expPoints: number) => {
        
    const defaultCharacterJSON = await AsyncStorage.getItem('defaultCharacter');

    if(defaultCharacterJSON){
      const defaultCharacter = JSON.parse(defaultCharacterJSON);

      if(!computeExpProgressCalled.current && defaultCharacter){
        await updateCharacterExpAndLevel(defaultCharacter, expPoints);
      }
      
      computeExpProgressCalled.current = true;
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
            <View style={{ alignContent: 'center', width: 200, height: 100, marginLeft: 85, flexDirection: 'row'}}>
              <FrameAnimation frameRateMs={300} animationType='workingOut' style={{ flex: 1 }}/>
            </View>
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
