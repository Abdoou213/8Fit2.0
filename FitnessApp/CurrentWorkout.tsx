import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Animated,TouchableOpacity, ScrollView } from 'react-native';
//import ExerciseBox from './ExerciseBox';



const CurrentWorkout = () => {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Bench Press',
      sets: [
        { weight: 50, repetitions: 10 },
        { weight: 60, repetitions: 8 },
        { weight: 70, repetitions: 6 }
      ]
    },
    {
      id: '2',
      title: 'Deadlift',
      sets: [
        { weight: 60, repetitions: 8 },
        { weight: 70, repetitions: 6 },
        { weight: 80, repetitions: 4 }
      ]
    },
    {
      id: '3',
      title: 'Bicep Curl',
      sets: [
        { weight: 40, repetitions: 8 },
        { weight: 40, repetitions: 6 },
        { weight: 40, repetitions: 4 }
      ]
    },
    {
      id: '4',
      title: 'Tricep Extensions',
      sets: [
        { weight: 25, repetitions: 8 },
        { weight: 25, repetitions: 8 },
        { weight: 30, repetitions: 8 }
      ]
    },
    {
      id: '5',
      title: 'Pullups',
      sets: [
        { weight: 0, repetitions: 10 },
        { weight: 0, repetitions: 8 },
        { weight: 0, repetitions: 6 }
      ]
    }
  ]);

 // const scrollY = new Animated.Value(0);
 // const translateY = scrollY.interpolate ({inputRange:[0,45],
    //outputRange:[0,-45]})

    // Define Exercise and Set interfaces
    interface Exercise {
      id: string;
      title: string;
      sets: Set[];
    }
    
    interface Set {
      weight: number;
      repetitions: number;
    }

    interface ExerciseBoxProps {
      title: string;
      sets: {
        weight: number;
        repetitions: number;
      }[];
    }

// Define ExerciseBox component
const ExerciseBox = ({ title, sets }: ExerciseBoxProps) => {
  return (
    <View style={styles.exerciseBox}>
      <Text style={styles.exerciseTitle}>{title}</Text>
      <View style={styles.setsContainer}>
        {sets.map((set, index) => (
          <View key={index} style={styles.set}>
            <Text style={styles.setText}>Set {index + 1}</Text>
            <Text style={styles.setText}>{set.weight} kg</Text>
            <Text style={styles.setText}>{set.repetitions} reps</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <ScrollView  style={styles.container}>
      <Animated.View 
     //</ScrollView> style = {{transform:
      //  [{translateY:translateY}]}}
      >
      <View style={styles.textInputsContainerHeader}>
        <Text style={styles.headerRows}> Routine name </Text>
        <Text style={styles.headerRows}> Start Time: </Text>
        <Text style={styles.headerRows}> End Time:  </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop: 20 }}>
            <TouchableOpacity 
              style={{backgroundColor: 'indianred', padding: 8, borderRadius: 5, width: '30%', marginRight: 10}}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{backgroundColor: 'indianred', padding: 8, borderRadius: 5, width: '50%',justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Finish</Text>
            </TouchableOpacity>
        </View>
      </View>
      </Animated.View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ExerciseBox title={item.title} sets={item.sets} />}
        keyExtractor={item => item.id}
        //onScroll = {(e) =>{
         //   scrollY.setValue(e.nativeEvent.contentOffset.y)
       // }} 
      />
      
    </ScrollView >
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'black',
    },
    textInputsContainerHeader: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    headerRows: {
      height: 30,
      width: '75%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingLeft: 10,
      backgroundColor: 'linen',
      fontSize: 19,
      marginBottom: 5,
    },
    set: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: 'white',
    },
    setText: {
      fontSize: 16,
    },
    addButton: {
      backgroundColor: 'indianred',
      padding: 8,
      borderRadius: 5,
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    exerciseBox: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    exerciseTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      backgroundColor: 'white',
    },
    setsContainer: {
      marginTop: 10,
    },
  });
  
  
  export default CurrentWorkout;