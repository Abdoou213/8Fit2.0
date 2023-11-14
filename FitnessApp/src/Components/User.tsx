import AsyncStorage from "@react-native-async-storage/async-storage";
import { Routine } from "./AppComponents";
import Character, { createDefaultCharacter } from "./Character";
import { ExerciseCategory } from "./ExerciseCategory";
import { WorkoutSession } from "./WorkoutSession";

type User = {
  userId: number;
  username: string;
  userRoutines: Routine[];
  userExerciseCategories: ExerciseCategory[];
  userSessions: WorkoutSession[];
  userCharacter: Character | null;
  userStats: number[];
  routineCount: Record<string, number>; // new field for routine count
};

export async function createUser(): Promise<void> {
  let userCreated = await AsyncStorage.getItem("userCreated");
  let user: User | null = null;

  if (userCreated === null || userCreated === "false") {
    // Create default character
    const defaultCharacter = await createDefaultCharacter();

    // Create a new User object and initialize its properties
    user = {
      userId: 1,
      username: "Your Name",
      userRoutines: [],
      userExerciseCategories: [],
      userSessions: [],
      userCharacter: defaultCharacter,
      userStats: [0, 0, 0, 0, 0, 0], // Initialize userStats as an empty array
      routineCount: {}, // Initialize routineCount as an empty object
    };

    // Set the flag in AsyncStorage to true
    await AsyncStorage.setItem("userCreated", "true");

    // Store the default user object in AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("Created User");
  } else {
    // If a user object already exists in AsyncStorage, retrieve it
    const userJson = await AsyncStorage.getItem("user");
    if (userJson) {
      user = JSON.parse(userJson);
    }
  }
}

export async function getUser(): Promise<User | null> {
  let userJson = await AsyncStorage.getItem("user");
  if (userJson) {
    const user: User = JSON.parse(userJson);
    return user;
  }
  return null;
}

export async function updateUserStats(
  user: User,
  finalizedSession: WorkoutSession
) {
  // Extract the user's stats array
  const userStats = user.userStats;

  // Calculate new stats based on the finalized workout session
  const completedWorkouts = userStats[0] + 1;
  const averageWorkoutDuration =
    (userStats[1] * userStats[0] + finalizedSession.duration) / completedWorkouts;
  const longestWorkoutDuration = Math.max(
    userStats[2],
    finalizedSession.duration
  );
  const totalWorkoutDuration = userStats[3] + finalizedSession.duration;

  // Update routineCount
  const routineName = finalizedSession.name
    if (!user.routineCount[routineName]) {
      // If routine does not exist, create an entry and set count to 1
      user.routineCount[routineName] = 1;
    } else {
      // If routine exists, increment the count by 1
      user.routineCount[routineName]++;
    }

  // You may need to adjust the following two lines depending on your data structure
  const totalWeightLiftedAllTime =
    userStats[4] + calculateTotalWeightLifted(finalizedSession);
  const maxTotalWeightLiftedInOneWorkout = Math.max(
    userStats[5],
    calculateTotalWeightLifted(finalizedSession)
  );

  // Update the user's stats
  user.userStats = [
    completedWorkouts,
    averageWorkoutDuration,
    longestWorkoutDuration,
    totalWorkoutDuration,
    totalWeightLiftedAllTime,
    maxTotalWeightLiftedInOneWorkout,
  ];
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

// You might need to create a function to calculate total weight lifted from the finalized session
function calculateTotalWeightLifted(finalizedSession: WorkoutSession) {
  let totalWeight = 0;
  for (const exercise of finalizedSession.exercises) {
    for (const set of exercise.sets) {
      totalWeight += set.weight * set.reps;
    }
  }
  return totalWeight;
}

export default User;
