import { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Props } from '../Components/AppComponents';
import FrameAnimation from '../Components/FrameAnimation';
import { styles } from '../Misc/ComponentStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Character, { calculateLevelUpThreshold } from '../Components/Character';

//Define Char component 
const CharacterScreen = ({ navigation }: Props) => {

  //Character object
  const [character, setCharacter] = useState<Character | null>(null);
  const [isCharacterInitialized, setIsCharacterInitialized] = useState(false);
  
  //Loads Character
  useEffect(() => {

    const initializeCharacter = async () => {
    
    const defaultCharacterJSON = await AsyncStorage.getItem('defaultCharacter');

    if(defaultCharacterJSON){
        const defaultCharacter = JSON.parse(defaultCharacterJSON);
        setCharacter(defaultCharacter);
        setIsCharacterInitialized(true);
        console.log(defaultCharacter)
    }
    };
    
    initializeCharacter();
  }, []);

  function calculateNextExpThreshold(): number{

    let nextLevelExpThreshold = 0;

    if(character){
      nextLevelExpThreshold = calculateLevelUpThreshold(character?.level, 1.22);
    }

    return nextLevelExpThreshold;
  }

 // Function to navigate back to the previous screen
 const goBackToPreviousScreen = () => {
    navigation.goBack();
  };

  // Render only when the character is initialized
  if (!isCharacterInitialized) {
    return null;
  }

  //Function to save character name change
  async function handleChangeName(updatedName: string) {
    if (character && character.name !== updatedName) {
      if (updatedName.length > 13) {
        Alert.alert('Name Too Long', 'The name should be 13 characters or less.');
      } else {
        const updatedCharacter = { ...character, name: updatedName };
        setCharacter(updatedCharacter);
        await AsyncStorage.setItem('defaultCharacter', JSON.stringify(updatedCharacter));
      }
    }
  }

  return (
    <View style={styles.awardExpScreenStyle}>
      <TouchableOpacity
        onPress={goBackToPreviousScreen}
      >
        <Text style={styles.closeButtonStats}>X</Text>
      </TouchableOpacity>
      <View style={{ alignContent: 'center', width: 300, height: 300, marginLeft: 30, flexDirection: 'column'}}>
        <FrameAnimation frameRateMs={200} animationType='idle' style={{ flex: 1 }}/>
        <TextInput style={styles.characterNameText} onChangeText={ (value) => handleChangeName(value)}>{character?.name}</TextInput>
      </View>
      <View style={styles.underline}></View>
      <View style={styles.awardExpTextContainer}>
        <Text style={styles.awardExpText}>Level </Text>
        <Text style={styles.awardExpText}>{character ? character.level : 0}</Text>
      </View>
      <View style={styles.underline}></View>  
      <View style={styles.awardExpTextContainer}>
        <Text style={styles.awardExpText}>{character?.expTotalAmount}/{calculateNextExpThreshold()}EXP</Text>
      </View>
      <View style={styles.underline}></View>
    </View>
);
}


export default CharacterScreen;
