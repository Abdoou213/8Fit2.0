import * as React from 'react';
import { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { WorkoutSession, fetchAllSessions, handleDeleteAllSessions } from '../Components/WorkoutSession';
import {styles} from '../Misc/ComponentStyles';

//Define Log component
const Log = () => {

  //1) Attributes
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);                   //List of workout sessions
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);  //Id of currently selected session
  const [refreshing, setRefreshing] = useState(false);

  //Method used to refresh Log screen
  const onRefresh = async () => {
    setRefreshing(true);
    const sessionsFromStorage = await fetchAllSessions();
    if (sessionsFromStorage !== null) {
      setSessions(sessionsFromStorage);
    }
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.viewroutinecontainer}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
              onPress={() => setSelectedSessionId(id)}
            >
              <Text style={styles.routineName}>{session.name}</Text>
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

//Add style to the component
/*const styles = StyleSheet.create({
  logContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});*/
//      <Text style={styles.text}>Log screen</Text>

export default Log;
