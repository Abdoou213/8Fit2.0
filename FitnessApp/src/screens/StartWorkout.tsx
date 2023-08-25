import { StyleSheet, View, Text, Animated, ScrollView, TouchableOpacity, Alert, FlatList, TextInput } from 'react-native';
import { RootStackParamList } from '../../App';
import ExerciseBox from '../Components/AppComponents';
import {WorkoutSession, createWorkoutSession, storeSession, finalizeWorkoutSession} from '../Components/WorkoutSession';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useState } from 'react';
//import { styles } from '../Misc/ComponentStyles';

//StartWorkout Screen Properties
type StartWorkoutProps = {
  navigation: StackNavigationProp<RootStackParamList, 'StartWorkout', 'ViewRoutine'>;
  route: RouteProp<RootStackParamList, 'StartWorkout'>;
};

//Define StartWorkout component
const StartWorkout = ({ route, navigation }: StartWorkoutProps) => {

  console.log('Checkpoint 1');
  //1) Screen Attributes
  const { routine: chosenRoutine } = route.params; // Extract the routine parameter

  //2) Create the workoutSession data using the methods
  const workoutSession = createWorkoutSession(chosenRoutine);
  //setWorkoutSession(newSession);

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
    navigation.navigate('ViewRoutine');
  };
  
  console.log('Checkpoint 2');
  return (
    <ScrollView  style={styles.container}>
      <Animated.View>
      <View style={styles.textInputsContainerHeader}>
        <Text style={styles.headerRows}>{workoutSession ? workoutSession.routine.name : ""}</Text> 
        <Text style={styles.headerRows}> Start Time: {workoutSession ? workoutSession.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''} </Text>
        <Text style={styles.headerRows}> End Time:  </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop: 20 }}>
            <TouchableOpacity 
              style={{backgroundColor: '#007AFF', padding: 8, borderRadius: 5, width: '30%', marginRight: 10}}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}} >+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{backgroundColor: '#007AFF', padding: 8, borderRadius: 5, width: '50%',justifyContent: 'center'}}
              onPress={handleFinishWorkout}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Finish</Text>
            </TouchableOpacity>
        </View>
      </View>
      </Animated.View>
      <FlatList
        data={workoutSession.routine ? workoutSession.routine.exercises : []}
        renderItem={({ item }) => <ExerciseBox title={item.name} exercise={item} />}  //exercise name + exercise
        keyExtractor={item => item.name}  //TODO: key extractor should be id
      />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  textInputsContainerHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerRows: {
    height: 30,
    width: '75%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'linen',
    fontSize: 19,
    marginBottom: 5,
  },
  set: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    paddingVertical: 0,
    flex: 1
  },
  setText: {
    fontSize: 16,
    marginTop: 2.5,
    marginBottom: 2.5,
    //height: 30,
    flex: 1
  },
  addSetButton: {
    backgroundColor: 'indianred',
    padding: 8,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  addSetButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  exerciseBox: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  exerciseTitleStartWorkout: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  setsContainer: {
    marginTop: 10,
    
  },
});

export default StartWorkout;

