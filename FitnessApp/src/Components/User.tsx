import AsyncStorage from "@react-native-async-storage/async-storage"
import { Routine } from "./AppComponents"
import Character, { createDefaultCharacter } from "./Character"
import { ExerciseCategory } from "./ExerciseCategory"
import { WorkoutSession } from "./WorkoutSession"

type User = {
    userId: number,
    username: string,
    userRoutines: Routine[],
    userExerciseCategories: ExerciseCategory[],
    userSessions: WorkoutSession[],
    userCharacter: Character | null
}

export async function createUser(): Promise<void> {
    let userCreated = await AsyncStorage.getItem('userCreated');
    let user: User | null = null;
    
    if (userCreated === null || userCreated === 'false') {
        //Create default character
        const defaultCharacter = await createDefaultCharacter();
        
        // Create a new User object and initialize its properties
        user = {
            userId: 1,
            username: 'Your Name',
            userRoutines: [],
            userExerciseCategories: [],
            userSessions: [],
            userCharacter: defaultCharacter
        };
  
        // Set the flag in AsyncStorage to true
        await AsyncStorage.setItem('userCreated', 'true');
    
        // Store the default user object in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('Created User')
    } else {
      // If a user object already exists in AsyncStorage, retrieve it
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        user = JSON.parse(userJson);
      }
    }
  }

export async function getUser(): Promise<User | null> {
    let userJson = await AsyncStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      return user;
    }
    return null;
  }

export default User;