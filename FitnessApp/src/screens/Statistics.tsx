import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

//Define Statistics component
const Statistics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics screen</Text>
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

export default Statistics;
