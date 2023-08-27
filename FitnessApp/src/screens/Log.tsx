import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {Text, View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { WorkoutSession, fetchAllSessions, handleDeleteAllSessions } from '../Components/WorkoutSession';
import {styles} from '../Misc/ComponentStyles';
import { Props } from '../Components/AppComponents';

//Define Log component
const Log = ({ navigation }: Props) => {

  //1) Attributes
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);                   //List of workout sessions
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);  //Id of currently selected session
  const [refreshing, setRefreshing] = useState(false);                              //useState if page is being refreshed or not

  const handleViewPastSession = useCallback(   
    (sessionId: number) => {
        setSelectedSessionId(sessionId);
        console.log('PRESSED!!');
        console.log(sessionId);
        navigation.navigate('ViewPastSession', { sessionId });
    },
    [navigation]
  );

  const fetchSessions = async () => {
    const sessionsFromStorage = await fetchAllSessions();
    if (sessionsFromStorage !== null) {
      setSessions(sessionsFromStorage);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSessions();
    setRefreshing(false);
  };

  useEffect(() => {
    console.log('USEEFFECTLOG')
    const unsubscribe = navigation.addListener('focus', async () => {
      setRefreshing(true); // Enable refreshing when screen comes into focus
      await fetchSessions();
      setRefreshing(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.viewroutinecontainer}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.textInputsContainerHeader}>
      <Text style={{fontSize: 16, textAlign: 'center'}}>Log screen</Text>
      <TouchableOpacity
          style={styles.deleteRoutinesButton}
          onPress={handleDeleteAllSessions}
        >
          <Text style={styles.deleteRoutinesButtonText}>Delete All Sessions</Text>
        </TouchableOpacity>
      </View>
      {sessions.map((session, id) => (      
              <TouchableOpacity
                key={session.id}
                style={[styles.viewroutineroutineBox, selectedSessionId === id && styles.selectedRoutineBox]}
                onPress={() => {handleViewPastSession(session.id)}}
              >
              <Text style={styles.routineName}>{session.name}</Text>
              <Text style={styles.exerciseName}>{session.duration} minutes </Text>
              <View style={styles.exerciseList}>
                {session.exercises.map((exercise) => (
                  <View key={exercise.name} style={styles.exerciseBox}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.setInfo}> x {exercise.setsCount} Sets</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
    </ScrollView>
  );
}

export default Log;
