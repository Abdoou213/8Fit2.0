import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { WorkoutSession, fetchAllSessions } from '../Components/WorkoutSession';
import { styles } from '../Misc/ComponentStyles';
import {  Props } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Define Profile component
const ProfileScreen = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState('Enter your name here'); // Initialize the state with a default string
  
  const handleTextChange = (text: React.SetStateAction<string>) => {
    setInputText(text); // Update the state with the new text when it changes
  };

  const handleSave = () => {
    // Handle saving the edited text here, for example, by sending it to an API or saving it to a database
    console.log('Edited Text:', inputText);
  };

  return (
    <View style={styles.scrollViewContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.logHeaderTitle}>Profile</Text>
        <View style={styles.underline}></View>
      </View>
      {/* Add a View for the banner */}
      <View style={styles.banner}>
        <Text style={styles.profileStatsTitle}>Upload picture</Text>
      </View>
        {/* Profile Picture Circle */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}></View>        
      </View>
      <TextInput
        style={styles.logHeaderTitle}
        onChangeText={handleTextChange}
        value={inputText} // Bind the input value to the state
      />
      <Text style={styles.profileStatsTitle}>Statistics</Text>
      <View style={styles.underline}></View>
      <TouchableOpacity
        key={null}
        style={[styles.viewSpecialStatsBox]}
        onPress={() => null}
      ></TouchableOpacity>
      <Text style={styles.profileStatsTitle}>Character</Text>
      <View style={styles.underline}></View>
      <TouchableOpacity
        key={(0)}
        style={[styles.viewSpecialStatsBox]}
        onPress={() => (navigation.navigate('Character'))}
      ></TouchableOpacity>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {/* Add your buttons or other content here */}
      </View>
      <View style={styles.buttonContainer}>
      </View>
    </View>
  );
}

export default ProfileScreen;



