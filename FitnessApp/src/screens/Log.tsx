import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {Text, View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { WorkoutSession, fetchAllSessions, handleDeleteAllSessions } from '../Components/WorkoutSession';
import {styles} from '../Misc/ComponentStyles';
import { Props } from '../Components/AppComponents';

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
        <View style={styles.underline}></View>
        <TouchableOpacity
            style={styles.deleteRoutinesButton}
            onPress={handleDeleteAllSessions}>
            <Text style={styles.deleteRoutinesButtonText}>Delete All Sessions</Text>
        </TouchableOpacity>
      </View>

      {sessions.map((session, id) => (      
              <TouchableOpacity
                key={session.id}
                style={[styles.viewRoutineroutineBox, selectedSessionId === id && styles.selectedRoutineBox]}
                onPress={() => {handleViewPastSession(session.id)}}
              >
              <Text style={styles.routineName}>{session.name}</Text>
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
