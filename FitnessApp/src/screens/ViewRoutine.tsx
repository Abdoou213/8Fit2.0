import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Set navigation type
type Props = {
  navigation: any;
};

//Define ViewRoutine component
const ViewRoutine = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View Routine Screen</Text>
      {/* Add button to redirect to CreateRoutine*/}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateRoutine')}>
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 16,
    left: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
  },
});

export default ViewRoutine;
