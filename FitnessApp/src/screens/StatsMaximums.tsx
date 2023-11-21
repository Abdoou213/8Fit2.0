import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Props } from '../Components/AppComponents';
import { styles } from '../Misc/ComponentStyles';
import User, { getUser } from '../Components/User';
import { WorkoutSession, fetchAllSessions } from '../Components/WorkoutSession';

const StatsMaximums = ({ navigation }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]); // List of workout sessions

  useEffect(() => {
    const fetchUserAndStats = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUserAndStats();
  }, []);

  const fetchSessions = async () => {
    try {
      const sessionsFromStorage = await fetchAllSessions();
      console.log('Fetched sessions:', sessionsFromStorage); // Check what is actually being fetched
      if (sessionsFromStorage !== null) {
        setSessions(sessionsFromStorage);
      } else {
        console.log('No sessions found in storage.');
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };
  
  useEffect(() => {
    fetchSessions();
  }, []);

  const colorArray = ['purple', 'blue', 'green', 'orange', 'red'];

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
  const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

  let monthlySessions = 0;
  let weeklySessions = 0;

    if(user != null){      
        for (const item of sessions) {
            if (item.startTime <= oneMonthAgo && item.startTime >= currentDate) {
              // If the condition is true, skip the current iteration to exclude the item
              continue;
            }
            // If the condition is false, include the item in the new array
            monthlySessions++;
        }
        for (const item of sessions) {
            if (item.startTime <= sevenDaysAgo && item.startTime >= currentDate) {
              // If the condition is true, skip the current iteration to exclude the item
              continue;
            }
            // If the condition is false, include the item in the new array
            weeklySessions++;
        }
    }

  const statisticRows = user && typeof user === 'object'
    ? [
        {
            label: 'Sessions completed (Past 7 days):',
            value: weeklySessions,
            bgColor: colorArray[3],
            icon: <MaterialCommunityIcons name="star" size={40} color="black" />,
        },
        {
            label: 'Sessions completed (Past 30 days):',
            value: monthlySessions,
            bgColor: colorArray[1],
            icon: <MaterialCommunityIcons name="star" size={40} color="black" />,
        },
    ]
    : [];

  const goBackToPreviousScreen = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackToPreviousScreen}>
        <Text style={styles.closeButtonStats}>X</Text>
      </TouchableOpacity>
      <Text style={styles.statsheader}>Recent Activity</Text>

      {statisticRows.map((row, index) => (
        <View key={index} style={[styles.statisticRow, { backgroundColor: row.bgColor }]}>
          <View style={styles.iconCell}>{row.icon}</View>
          <View style={styles.statisticCell}>
            <Text style={[styles.statisticText, styles.textRight]}>{row.label}</Text>
            <Text style={[styles.statisticValue, styles.textRight]}>{row.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StatsMaximums;
