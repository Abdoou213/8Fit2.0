import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { ScrollView, Animated, View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import {ExerciseBoxPastSession} from "../Components/ExerciseBox";
import { styles } from "../Misc/ComponentStyles";
import { WorkoutSession, fetchAllSessions } from "../Components/WorkoutSession";
import { useEffect, useState } from "react";

//StartWorkout Screen Properties
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

     // 3) Fetch session data using useEffect
    useEffect(() => {
        const fetchSessionData = async () => {
        const existingSessions = await fetchAllSessions();
        const session = existingSessions.find(session => session.id === currentSessionId);
        setSelectedSession(session || null);    //update selected session or null if not found
        };

        fetchSessionData();
    }, [currentSessionId]);

    // Use a loading state to handle the asynchronous data fetching
    if (selectedSession === null) {
        console.log('ACTIVITY')
        return <ActivityIndicator size="large" />;
    }

    return (
        <ScrollView  style={styles.container}>
          <Animated.View>
          <View style={styles.textInputsContainerHeader}>
            <Text style={styles.headerRows}>{selectedSession ? selectedSession.routine.name : ""}</Text> 
            <Text style={styles.headerRows}>Duration: {selectedSession ? selectedSession.duration : ""} minutes</Text>
            <Button title="X" //Return to Log upon clicking on this button
                    onPress={() => navigation.goBack()}/> 
          </View>
          </Animated.View>
          {selectedSession ? (
                <FlatList
                    data={selectedSession.routine ? selectedSession.routine.exercises : []}
                    renderItem={({ item }) => (
                        <ExerciseBoxPastSession exercise={item} />
                    )}
                    keyExtractor={item => item.name}
                />
            ) : null}
        </ScrollView >
      );
};

export default ViewPastSession;