import { styles } from '../Misc/ComponentStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Character from '../Components/Character';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import FrameAnimation from '../Components/FrameAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

type AwardExpScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AwardExpToCharScreen', 'CurrentWorkoutSession'>;
    route: {
      params: {
        earnedExp: number
      };
    }
  };

  const AwardExpToCharScreen = ({route, navigation }: AwardExpScreenProps) => {

    const [character, setCharacter] = useState<Character | null>(null);
    const expGained = route.params.earnedExp;

    useEffect(() => {
      // Set a timeout to navigate to another screen after 3 seconds
      const timeout = setTimeout(() => {
        navigation.navigate('ViewRoutine');
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }, [navigation]);

    //Loads Character
    useEffect(() => {

      const initializeCharacter = async () => {
        
        const defaultCharacterJSON = await AsyncStorage.getItem('defaultCharacter');

        if(defaultCharacterJSON){
          const defaultCharacter = JSON.parse(defaultCharacterJSON);
          setCharacter(defaultCharacter);
          console.log(defaultCharacter)
        }
      };
      
      initializeCharacter();
    }, []);


    if (!character) {
      return null;
    }

    return (
      <View style={styles.awardExpScreenStyle}>
        <View style={{ alignContent: 'center', width: 300, height: 300, marginLeft: 30, flexDirection: 'row'}}>
          <FrameAnimation frameRateMs={150} animationType='idle' style={{ flex: 1 }}/>
        </View>
        <View style={styles.underline}></View>
        <View style={styles.awardExpTextContainer}>
          <Text style={styles.awardExpText}>Level: </Text>
          <Text style={styles.awardExpText}>{character ? character.level : 0}</Text>
        </View>
        <View style={styles.underline}></View>       
        <View style={styles.awardExpTextContainer}>
          <Text style={styles.awardExpText}>EXP Gained: +</Text>
          <Text style={styles.awardExpText}>{expGained}</Text>
        </View>
        <View style={styles.underline}></View>
      </View>
  );
};
export default AwardExpToCharScreen;