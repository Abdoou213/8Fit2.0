import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import StatsWorkoutCompleted from '../StatsWorkoutCompleted';
import Statistics from '../Statistics';
import StatsWorkoutDuration from '../StatsWorkoutDuration';
import StatsWorkoutWeight from '../StatsWorkoutWeight';
import StatsMaximums from '../StatsMaximums';

//Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

//Define Stack Navigator
const StatisticsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />
      <Stack.Screen name="StatsWorkoutCompleted" component={StatsWorkoutCompleted} options={{ headerShown: false }} />
      <Stack.Screen name="StatsWorkoutDuration" component={StatsWorkoutDuration} options={{ headerShown: false }} />
      <Stack.Screen name="StatsWorkoutWeight" component={StatsWorkoutWeight} options={{ headerShown: false }} />
      <Stack.Screen name="StatsMaximums" component={StatsMaximums} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StatisticsStack;
