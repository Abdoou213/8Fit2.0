
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Exercise } from './Exercise';

//========OBJECTS USED IN APP================
//Used for navigation between screens
export type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
  };

// Represents a singular set in a given exercise
export type Set = {
    setNum: number;
    weight: number;
    reps: number;
  };

// Routine object, contains a predefined list of exercises with a predefined number of sets
export type Routine = {
    name: string;
    id: number;
    exercises: Exercise[];
  };

// Generates a random 5-digit integer for the new routine/workout session
export  const generateRandomId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};
