import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { ScrollView, Animated, View, Text, FlatList, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import {ExerciseBoxPastSession} from "../Components/ExerciseBox";
import { styles } from "../Misc/ComponentStyles";
import { WorkoutSession, fetchAllSessions } from "../Components/WorkoutSession";
import { useEffect, useState } from "react";

//CurrentWorkout Screen Properties
type ViewPastSessionProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ViewPastSession', 'Log'>;
    route: RouteProp<RootStackParamList, 'ViewPastSession'>
  };

//This page is displayed upon clicking on a given finished session to view the list of exercises and their sets/reps
const ViewPastSession =  ({route, navigation} : ViewPastSessionProps) => {

    //1) Screen Attributes
    const currentSessionId = route.params.sessionId; // Extract the routine parameter

     // 2) State to hold selected session
    const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);

    //3) Fetch session data using useEffect
    useEffect(() => {
        const fetchSessionData = async () => {
        const existingSessions = await fetchAllSessions();
        const session = existingSessions.find(session => session.id === currentSessionId);
        setSelectedSession(session || null);    //update selected session or null if not found
        };

        fetchSessionData();
    }, [currentSessionId]);

    //4) Use a loading state to handle the asynchronous data fetching
    if (selectedSession === null) {
      return <ActivityIndicator size="large" />;
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
                <View style={styles.underlineDate}>
                  <Text 
                    style={styles.headerRowsDatePastSession}>{selectedSession ? 'Date: ' + selectedSession.startTimeString: 'Date: '}
                  </Text>
                </View>
                <View style={styles.underline}>
                  <Text style={styles.headerRowsPastSession}>
                    {selectedSession ? selectedSession.routine.name : ''}
                  </Text>
                </View>
                <View style={styles.underline}>
                  <Text style={styles.headerRowsDatePastSession}>
                    Duration: {selectedSession ? selectedSession.duration : ''} minutes
                  </Text>
                </View>
                
              </View>
            </Animated.View>
            }
            data={selectedSession ? selectedSession.routine.exercises : []}
            renderItem={({ item }) => (
            <ExerciseBoxPastSession exercise={item} />
            )}
            keyExtractor={item => item.name}
        />
      );
};

export default ViewPastSession;