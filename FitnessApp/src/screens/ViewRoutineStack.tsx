import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ViewRoutine from './ViewRoutine';
import CreateRoutine from './CreateRoutine';

import { RootStackParamList } from '../../App';

const Stack = createStackNavigator<RootStackParamList>();

const ViewRoutineStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="ViewRoutine" component={ViewRoutine} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateRoutine" component={CreateRoutine} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ViewRoutineStack;
