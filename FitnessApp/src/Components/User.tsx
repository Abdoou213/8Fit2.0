import { Routine } from "./AppComponents"
import Character from "./Character"
import { ExerciseCategory } from "./ExerciseCategory"
import { WorkoutSession } from "./WorkoutSession"

type User = {
    userId: number,
    username: string,
    userRoutines: Routine[],
    userExerciseCategories: ExerciseCategory[],
    userSessions: WorkoutSession[],
    userCharacter: Character
}

export default User;