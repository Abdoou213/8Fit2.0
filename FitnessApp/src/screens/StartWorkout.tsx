import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

//Define StartWorkout component
const StartWorkout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start Workout Screen</Text>
    </View>
  );
}

//Add style to the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StartWorkout;

