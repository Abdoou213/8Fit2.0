import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { WorkoutSession, fetchAllSessions } from '../Components/WorkoutSession';
import { styles } from '../Misc/ComponentStyles';
import {  Props } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';


//Define Profile component
const ProfileScreen = () => {
  const [inputText, setInputText] = useState('Enter your name here'); // Initialize the state with a default string
  const [bannerImage, setBannerImage] = useState('https://images5.alphacoders.com/132/1329624.png'); // State for the banner image
  const [profileImage, setProfileImage] = useState('https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/164316223/original/bf227084f4419c3d5ad3f8c32aa5b576da37387b/do-minecraft-8-bit-profile-picture.jpg'); // State for the profile picture
  
  const handleTextChange = (text: React.SetStateAction<string>) => {
    setInputText(text); // Update the state with the new text when it changes
  };

  const handleSave = () => {
    // Handle saving the edited text here, for example, by sending it to an API or saving it to a database
    console.log('Edited Text:', inputText);
  };

  // Function to open the image picker for the banner
  const pickBannerImage = async () => {
    try {
      const response: any = await launchImageLibrary({ mediaType: 'photo' });
      if (!response.didCancel) {
        setBannerImage(response.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to open the image picker for the profile picture
  const pickProfileImage = async () => {
    try {
      const response: any = await launchImageLibrary({ mediaType: 'photo' });
      if (!response.didCancel) {
        setProfileImage(response.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.scrollViewContainer}>
    <View style={styles.headerContainer}>
      <Text style={styles.logHeaderTitle}>Profile</Text>
      <View style={styles.underline}></View>
    </View>

    <TouchableOpacity onPress={pickBannerImage}>
      <View style={styles.banner}>
        {bannerImage ? (
          <Image source={{ uri: bannerImage }} style={styles.banner} />
        ) : (
          <Text style={styles.buttonText}></Text>
        )}
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={pickProfileImage}>
      <View style={styles.profilePictureContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profilePicture} />
        ) : (
          <Text style={styles.buttonText}></Text>
        )}
      </View>
    </TouchableOpacity>

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
      key={0}
      style={[styles.viewSpecialStatsBox]}
      onPress={() => 0}
    ></TouchableOpacity>

    {/* Button Container */}
    <View style={styles.buttonContainer}>
    </View>
    <View style={styles.buttonContainer}></View>
  </View>
  );
}

export default ProfileScreen;



