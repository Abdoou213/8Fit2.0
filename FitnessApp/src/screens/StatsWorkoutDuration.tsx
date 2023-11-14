import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Props } from '../Components/AppComponents';
import { WorkoutSession, fetchAllSessions } from '../Components/WorkoutSession';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Misc/ComponentStyles';
import User, { getUser } from '../Components/User';

const StatsWorkoutDuration = ({ navigation }: Props) => {
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

    const statisticRows = user && typeof user === 'object'
        ? [
            {
                label: 'Average Workout Duration:',
                value: user.userStats && user.userStats[1],
                bgColor: 'orange',
                icon: <MaterialCommunityIcons name="clock-time-three-outline" size={40} color="black" />,
            },
            {
                label: 'Longest Workout Duration:',
                value: user.userStats && user.userStats[2],
                bgColor: 'red',
                icon: <MaterialCommunityIcons name="timer-sand-empty" size={40} color="black" />,
            },
            {
                label: 'Total Workout Duration:',
                value: user.userStats && user.userStats[3],
                bgColor: 'green',
                icon: <MaterialCommunityIcons name="timer" size={40} color="black" />,
            },
        ]
        : [];

    // Function to navigate back to the previous screen
    const goBackToPreviousScreen = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={goBackToPreviousScreen}
            >
                <Text style={styles.closeButtonStats}>X</Text>
            </TouchableOpacity>
            <Text style={styles.statsheader}>Workout Duration Statistics</Text>

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

export default StatsWorkoutDuration;
