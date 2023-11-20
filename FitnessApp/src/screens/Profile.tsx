import * as React from 'react';
import {Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../Misc/ComponentStyles';
import {  Props } from '../Components/AppComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import FrameAnimation from '../Components/FrameAnimation';
import { url } from 'inspector';

import background from '../Components/Pictures/background.jpg';
import pfp from '../Components/Pictures/pfp.jpg';
import { getUser } from '../Components/User';

//Define Profile component
const ProfileScreen = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState('Enter your name here'); // Initialize the state with a default string
  const [bannerImage, setBannerImage] = useState<any>(background); // State for the banner image
  const [profileImage, setProfileImage] = useState<any>(pfp); // State for the profile picture

  // Add useEffect hook to fetch the user's name
  useEffect(() => {
    const fetchUserName = async () => {
      const user = await getUser();
      if (user) {
        setInputText(user.username);
      }
    };

    fetchUserName();
  }, []);

  // Function to update the user's name in AsyncStorage
  const updateUserName = async (newName: string) => {
    let user = await getUser();
    if (user) {
      user.username = newName;
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
  };

  const handleTextChange = (text: React.SetStateAction<string>) => {
    setInputText(text); // Update the state with the new text when it changes
  };

  const handleSave = () => {
    console.log('Edited Text:', inputText);
  };

  const pickBannerImage = async () => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo' });
      if (response.assets) {
        setBannerImage({ uri: response.assets[0].uri });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pickProfileImage = async () => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo' });
      if (response.assets) {
        setProfileImage({ uri: response.assets[0].uri });
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
        {/* Check if bannerImage is a local image or a picked image */}
        <Image source={bannerImage.uri ? { uri: bannerImage.uri } : bannerImage} style={styles.banner} />
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={pickProfileImage}>
      <View style={styles.profilePictureContainer}>
        {/* Check if profileImage is a local image or a picked image */}
        <Image source={profileImage.uri ? { uri: profileImage.uri } : profileImage} style={styles.profilePicture} />
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
        onPress={() => (navigation.navigate('StatisticsStack'))}
    ></TouchableOpacity>
      <Text style={styles.profileStatsTitle}>Character</Text>
      <View style={styles.underline}></View>
      <TouchableOpacity
        key={(0)}
        onPress={() => (navigation.navigate('Character'))}
      >
        <View style={{ width: 100, height: 100 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../Animations/White/SpinningIdle/frame10.png')} style={{ width: 300, height: 300}} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;



