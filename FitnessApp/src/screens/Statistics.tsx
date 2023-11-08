import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Props } from '../Components/AppComponents';
import { WorkoutSession, fetchAllSessions } from '../Components/WorkoutSession';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Misc/ComponentStyles';

const Statistics = ({ navigation }: Props) => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const sessionsFromStorage = await fetchAllSessions();
    if (sessionsFromStorage !== null) {
      setSessions(sessionsFromStorage);
    }
  };

  // Calculate statistics
  const numWorkoutsCompleted = sessions.length;
  const totalWorkoutTime = sessions.reduce(
    (total, session) => total + session.duration,
    0
  );
  const averageDuration =
    numWorkoutsCompleted > 0
      ? Math.round(totalWorkoutTime / numWorkoutsCompleted)
      : 0;
  const maxWeightLifted = sessions.reduce((max, session) => {
    const maxSessionWeight = Math.max(
      ...session.exercises.map((exercise) =>
        Math.max(...exercise.sets.map((set) => set.weight))
      )
    );
    return maxSessionWeight > max ? maxSessionWeight : max;
  }, 0);
  const longestDuration = Math.round(
    Math.max(...sessions.map((session) => session.duration))
  );

  const statisticRows = [
    {
      label: 'Workouts Completed:',
      value: numWorkoutsCompleted,
      bgColor: 'yellow',
      icon: <MaterialCommunityIcons name="weight-lifter" size={40} color="black" />,
    },
    {
      label: 'Total Workout Time (min):',
      value: totalWorkoutTime,
      bgColor: 'orange',
      icon: <MaterialCommunityIcons name="clock-time-three-outline" size={40} color="black" />,
    },
    {
      label: 'Average Duration (min):',
      value: averageDuration,
      bgColor: 'red',
      icon: <MaterialCommunityIcons name="timer-sand-empty" size={40} color="black" />,
    },
    {
      label: 'Max Weight Lifted (lbs):',
      value: maxWeightLifted,
      bgColor: 'green',
      icon: <MaterialCommunityIcons name="dumbbell" size={40} color="black" />,
    },
    {
      label: 'Longest Duration (min):',
      value: longestDuration,
      bgColor: 'turquoise',
      icon: <MaterialCommunityIcons name="timer" size={40} color="black" />,
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.statsheader, styles.fontFamily]}>Statistics</Text>

      {statisticRows.map((row, index) => (
        <View key={index} style={[styles.statisticRow, { backgroundColor: row.bgColor }]}>
          <View style={styles.iconCell}>{row.icon}</View>
          <View style={styles.statisticCell}>
            <Text style={[styles.statisticText, styles.fontFamily, styles.textRight]}>{row.label}</Text>
            <Text style={[styles.statisticValue, styles.fontFamily, styles.textRight]}>{row.value}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.statsbuttonText, styles.fontFamily]}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Statistics;
