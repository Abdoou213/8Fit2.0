import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import CurrentWorkoutSession from '../CurrentWorkoutSession';
import SelectExerciseStack from './SelectExerciseStack';
import AwardExpToCharScreen from '../AwardExpToCharScreen';
import { useRoute, RouteProp } from '@react-navigation/native';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const OngoingSessionStack = () => {

const route = useRoute<RouteProp<RootStackParamList, 'OngoingSessionStack'>>();
const routine = route.params.routine;

  return (
    <Stack.Navigator>
      <Stack.Screen name="CurrentWorkoutSession" component={CurrentWorkoutSession} initialParams={{routine}} options={{ headerShown: false }}/>
      <Stack.Screen name="AwardExpToCharScreen" component={AwardExpToCharScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SelectExerciseStack" component={SelectExerciseStack} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default OngoingSessionStack;