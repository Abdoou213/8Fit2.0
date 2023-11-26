import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Misc/ComponentStyles';
import User, { getUser } from '../Components/User';
import { Props } from '../Components/AppComponents';

const Statistics = ({ navigation }: Props) => {
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

  const goBackToPreviousScreen = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackToPreviousScreen}>
        <Text style={styles.closeButtonStats}>X</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StatsWorkoutCompleted')}>
        <Text style={[styles.statsheader, { paddingBottom: 40  }]}>Statistics</Text>
        <View style={[styles.statisticRow, { backgroundColor: 'purple' }]}>
          <View style={styles.iconCell}>
            <MaterialCommunityIcons name="weight-lifter" size={40} color="black" />
          </View>
          <View style={styles.statisticCell}>
            <Text style={[styles.statsheader, styles.textRight]}>Workout Completed</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Button for StatsWorkoutDuration */}
      <TouchableOpacity onPress={() => navigation.navigate('StatsWorkoutDuration')}>
        <View style={[styles.statisticRow, { backgroundColor: 'blue' }]}>
          <View style={styles.iconCell}>
            <MaterialCommunityIcons name="timer" size={40} color="black" />
          </View>
          <View style={styles.statisticCell}>
            <Text style={[styles.statsheader, styles.textRight]}>Workout Duration</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Button for StatsWorkoutWeight */}
      <TouchableOpacity onPress={() => navigation.navigate('StatsWorkoutWeight')}>
        <View style={[styles.statisticRow, { backgroundColor: 'green' }]}>
          <View style={styles.iconCell}>
            <MaterialCommunityIcons name="dumbbell" size={40} color="black" />
          </View>
          <View style={styles.statisticCell}>
            <Text style={[styles.statsheader, styles.textRight]}>Workout Weight</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Button for StatsRecentActivity */}
      <TouchableOpacity onPress={() => navigation.navigate('StatsRecentActivity')}>
        <View style={[styles.statisticRow, { backgroundColor: 'orange' }]}>
          <View style={styles.iconCell}>
            <MaterialCommunityIcons name="star" size={40} color="black" />
          </View>
          <View style={styles.statisticCell}>
            <Text style={[styles.statsheader, styles.textRight]}>Recent Activity</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Statistics;
