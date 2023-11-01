import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import ViewRoutine from '../ViewRoutine';
import CreateRoutineStack from './CreateRoutineStack';
import OngoingSessionStack from './OngoingSessionStack';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const ViewRoutineStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ViewRoutine" component={ViewRoutine} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateRoutineStack" component={CreateRoutineStack} options={{ headerShown: false }}/>
      <Stack.Screen name="OngoingSessionStack" component={OngoingSessionStack} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ViewRoutineStack;
