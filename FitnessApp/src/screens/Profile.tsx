import * as React from 'react';
import {Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { styles } from '../Misc/ComponentStyles';
import {  Props } from '../Components/AppComponents';

//Define Profile component
const ProfileScreen = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState('Enter your name here'); // Initialize the state with a default string
  
  const handleTextChange = (text: React.SetStateAction<string>) => {
    setInputText(text); // Update the state with the new text when it changes
  };

  const handleSave = () => {
    console.log('Edited Text:', inputText);
  };

  return (
    <View style={styles.scrollViewContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.logHeaderTitle}>Profile</Text>
        <View style={styles.underline}></View>
      </View>
      <View style={styles.banner}>
        <Text style={styles.profileStatsTitle}>Upload picture</Text>
      </View>
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
        onPress={() => (navigation.navigate('Statistics'))}
      ></TouchableOpacity>
      <Text style={styles.profileStatsTitle}>Character</Text>
      <View style={styles.underline}></View>
      <TouchableOpacity
        key={(0)}
        style={[styles.viewSpecialStatsBox]}
        onPress={() => (navigation.navigate('Character'))}
      ></TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;



