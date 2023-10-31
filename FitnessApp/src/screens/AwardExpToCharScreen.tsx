import { styles } from '../Misc/ComponentStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Character from '../Components/Character';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import FrameAnimationIdle from '../Components/IdleFrameAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

type AwardExpScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AwardExpToCharScreen', 'CurrentWorkoutSession'>;
    route: {
      params: {
        experiencePointsSession: number
      };
    };
  };

  const AwardExpToCharScreen = ({ route, navigation }: AwardExpScreenProps) => {

    const { experiencePointsSession} = route.params;
    const [character, setCharacter] = useState<Character | null>(null);

    //Loads Character
    useEffect(() => {
      const initializeCharacter = async () => {
        
        const defaultCharacterJSON = await AsyncStorage.getItem('defaultCharacter');
        console.log('JSON')
          console.log(defaultCharacterJSON)
        if(defaultCharacterJSON){
          const defaultCharacter = JSON.parse(defaultCharacterJSON);
          setCharacter(defaultCharacter);
          await AsyncStorage.setItem('defaultCharacter', JSON.stringify(character));
          console.log('CHAAAR')
          console.log(defaultCharacter)
        }
      };
  
      initializeCharacter();
    }, []);
    
    //Leave page after 3 seconds
    useEffect(() => {
      const timeout = setTimeout(() => {
        navigation.navigate('ViewRoutine');
      }, 4000);
  
      return () => {
        clearTimeout(timeout);
      };
    }, [navigation]);

    return (
        <View style={styles.awardExpScreenStyle}>
         <View style={{ alignContent: 'center', width: 300, height: 300, marginLeft: 30  }}>
            <FrameAnimationIdle/>
          </View>
          <View style={styles.underline}></View>
          <View style={styles.awardExpTextContainer}>
            <Text style={styles.awardExpText}>Level: </Text>
            <Text style={styles.awardExpText}>{character ? character.level : 0}</Text>
          </View>
          <View style={styles.underline}></View>       
          <View style={styles.awardExpTextContainer}>
            <Text style={styles.awardExpText}>EXP Gained: +</Text>
            <Text style={styles.awardExpText}>{experiencePointsSession}</Text>
          </View>
          <View style={styles.underline}></View>
        </View>
    );
};
/*

*/
export default AwardExpToCharScreen;