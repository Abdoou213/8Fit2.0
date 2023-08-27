import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, Exercise, generateRandomId } from "./AppComponents";

//================WORKOUT SESSION AND METHODS===============
//Workout Session Objects and its methods
export type WorkoutSession = {
    routine: Routine,   //TODO: make null if new session w/o routine
    name: string,
    id: number,
    exercises: Exercise[];
    startTime: Date,
    endTime: Date,
    duration: number; 
  };

// Method to create a new WorkoutSession
export const createWorkoutSession = (
  routine: Routine,
): WorkoutSession => {
  return {
    routine,
    name: routine.name,             //TODO: Add an empty string if routine is null
    id: generateRandomId(),
    exercises: routine.exercises,   // Initialize exercises with routine's exercises
    startTime: new Date(),          // Initialize to the current date and time
    endTime: new Date(),            // Initialize to the current date and time
    duration: 0,
  };
};

//Finalizes a WorkoutSession and calculates the duration
export const finalizeWorkoutSession = (
  workoutSession: WorkoutSession
): WorkoutSession => {
  const currentTime = new Date();
  const durationMilliseconds = currentTime.getTime() - workoutSession.startTime.getTime();
  const durationMinutes = Math.floor(durationMilliseconds / (1000 * 60)); // Convert to minutes

  return {
    ...workoutSession,
    endTime: currentTime,
    duration: durationMinutes,
  };
};

//Stores the completed session to the log
export const storeSession = async (session: WorkoutSession) => {
  try {
    //Load existing sessions
    const existingSessions = await fetchAllSessions();

    // Check if the session already exists
    const sessionExists = existingSessions.some(existingSession => existingSession.id === session.id);

    if (!sessionExists) {
      // Add the new session to the existing list
      const updatedSessions = [session, ...existingSessions];
      
      await AsyncStorage.setItem('sessions', JSON.stringify(updatedSessions));

      console.log('Session saved successfully!');
    }
  } catch (e) {
    console.error('Error saving session:', e);
  }
};

// Fetch all workout sessions from AsyncStorage
export const fetchAllSessions = async (): Promise<WorkoutSession[]> => {
    try {
      console.log('FETCHED')
      const sessions = await AsyncStorage.getItem('sessions');
      
      if (sessions) {
        //Retrieve all previous workout sessions
        const parsedSessions: WorkoutSession[] = JSON.parse(sessions);
        
        return parsedSessions;
      } else {
        return [];
      }
    } catch (e) {
      console.error('Error fetching sessions:', e);
      return [];
    }
  };

// Deletes all saved workout sessions from AsyncStorage
export const handleDeleteAllSessions = async () => {
  try {
    await AsyncStorage.removeItem('sessions');
    console.log('All sessions deleted successfully!');
  } catch (e) {
    console.error('Error deleting sessions:', e);
  }
};