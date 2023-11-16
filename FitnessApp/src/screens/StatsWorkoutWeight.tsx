import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Props } from '../Components/AppComponents';
import { WorkoutSession, fetchAllSessions } from '../Components/WorkoutSession';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Misc/ComponentStyles';
import User, { getUser } from '../Components/User';

const StatsWorkoutWeight = ({ navigation }: Props) => {
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
                label: 'Total Weight lifted all time:',
                value: user.userStats && user.userStats[4],
                bgColor: 'turquoise',
                icon: <MaterialCommunityIcons name="dumbbell" size={40} color="black" />,
            },
            {
                label: 'Max Total Weight lifted in single workout:',
                value: user.userStats && user.userStats[5],
                bgColor: 'blue',
                icon: <MaterialCommunityIcons name="arm-flex" size={40} color="black" />,
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
            <Text style={styles.statsheader}>Workout Weights Statistics</Text>

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

export default StatsWorkoutWeight;
