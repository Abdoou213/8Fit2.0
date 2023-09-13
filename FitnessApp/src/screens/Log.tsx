import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {Text, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { WorkoutSession, fetchAllSessions, handleDeleteAllSessions } from '../Components/WorkoutSession';
import { styles } from '../Misc/ComponentStyles';
import {  Props } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Define Log component
const LogScreen = ({ navigation }: Props) => {

  //1) Attributes
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);                   //List of workout sessions
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);  //Id of currently selected session
  const [refreshing, setRefreshing] = useState(false);                              //useState if page is being refreshed or not

  //Navigates to the ViewPastSession page upon clicking on a session.
  const handleViewPastSession = useCallback(
    (sessionId: number) => {
        setSelectedSessionId(sessionId);
        navigation.navigate('ViewPastSession', { sessionId });
    },
    [navigation]
  );

  //Async method to fetch all saved sessions to display on the screen.
  const fetchSessions = async () => {
    const sessionsFromStorage = await fetchAllSessions();
    if (sessionsFromStorage !== null) {
      setSessions(sessionsFromStorage);
    }
  };

  // Function to delete a single WorkoutSession
const deleteWorkoutSession = async (sessionToDelete: WorkoutSession) => {
  try {
    // Display a confirmation pop-up to confirm the deletion, do nothing if User cancels
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete the '${sessionToDelete.name}' workout session from '${sessionToDelete.startTimeString}'?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            // User canceled, do nothing
            console.log('Deletion canceled.');
          },
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            // User confirmed, proceed with deletion
            const allSessions = await fetchAllSessions();

            // Find the index of the session to delete
            const indexToDelete = allSessions.findIndex(
              (session: WorkoutSession) =>
                session.startTime === sessionToDelete.startTime
            );

            if (indexToDelete !== -1) {
              allSessions.splice(indexToDelete, 1);

              // Update the stored sessions without the deleted session
              await AsyncStorage.setItem(
                'sessions',
                JSON.stringify(allSessions)
              );

              setSessions(allSessions);

              console.log(
                `Workout session from ${sessionToDelete.startTimeString} deleted.`
              );
            } else {
              console.log(
                `Workout session from ${sessionToDelete.startTimeString} not found.`
              );
            }
          },
          style: 'destructive',
        },
      ]
    );
   
  } catch (error) {
    console.log('Error deleting workout session from AsyncStorage:', error);
  }
};

    //Async method to fetch all saved sessions to display on the screen.
    const handleDeleteSsession = async (session: WorkoutSession) => {
      deleteWorkoutSession(session);
      await fetchSessions();
    };

  //Handles the refreshing of the list of sessions to be displayed when the user scrolls up.
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSessions();
    setRefreshing(false);
  };

  //Initially displays the list of sessions upon opening the page.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setRefreshing(true); // Enable refreshing when screen comes into focus
      await fetchSessions();
      setRefreshing(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.scrollViewContainer}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

      <View style={styles.headerContainer}>        
      <Text style={styles.logHeaderTitle}>Log</Text>
        <TouchableOpacity
            style={styles.deleteRoutinesButton}
            onPress={handleDeleteAllSessions}>
            <Text style={styles.closeButtonTextViewPastSession}>Delete All</Text>
        </TouchableOpacity>
        <View style={styles.underline}></View>
      </View>

      {sessions.map((session, id) => (  
            
              <TouchableOpacity
                key={session.id}
                style={[styles.viewRoutineroutineBox, selectedSessionId === id && styles.selectedRoutineBox]}
                onPress={() => {handleViewPastSession(session.id)}}
              >

              <View style={styles.deleteRoutineButtonContainer}>
                <Text style={styles.routineName}>{session.name}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteSsession(session)}
                  style={styles.closeButtonViewPastSession}
                >
                  <Text style={styles.closeButtonTextViewPastSession}>X</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.underline}></View>
              <Text style={styles.setInfo}>{session.duration} minutes </Text>
              <View style={styles.exerciseList}>
                {session.exercises.map((exercise) => (
                  <View key={exercise.name} style={styles.exerciseInListDisplayed}>
                    <Text style={styles.setInfo}>{exercise.name}</Text>
                    <Text style={styles.setInfo}> x {exercise.setsCount} Sets</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
    </ScrollView>
  );
}

export default LogScreen;
