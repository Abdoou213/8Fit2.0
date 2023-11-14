import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Props } from '../Components/AppComponents';
import { styles } from '../Misc/ComponentStyles';
import User, { getUser } from '../Components/User';

const StatsWorkoutCompleted = ({ navigation }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAndStats = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUserAndStats();
  }, []);

  const colorArray = ['purple', 'blue', 'green', 'orange', 'red'];

  const statisticRows = user && typeof user === 'object'
    ? [
      {
        label: 'Workouts Completed:',
        value: user.userStats && user.userStats[0],
        bgColor: colorArray[0],
        icon: <MaterialCommunityIcons name="weight-lifter" size={40} color="black" />,
      },
    ]
    : [];

  if (user && typeof user === 'object') {

    let colorIndex = 1;

    for (const routineName in user.routineCount) {
      if (user.routineCount.hasOwnProperty(routineName)) {
        const routineCount = user.routineCount[routineName];

        const userStatsValue = user.userStats && user.userStats.length > 0 ? user.userStats[0] : 0;

        const bgColor = colorArray[colorIndex % colorArray.length];

        statisticRows.push({
          label: `${routineName} Completed:`,
          value: userStatsValue,
          bgColor,
          icon: <MaterialCommunityIcons name="weight-lifter" size={40} color="black" />,
        });

        colorIndex++;
      }
    }
  }

  const goBackToPreviousScreen = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackToPreviousScreen}>
        <Text style={styles.closeButtonStats}>X</Text>
      </TouchableOpacity>
      <Text style={styles.statsheader}>Workouts Completed Statistics</Text>

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

export default StatsWorkoutCompleted;
