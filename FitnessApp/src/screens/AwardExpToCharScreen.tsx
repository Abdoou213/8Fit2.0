import { styles } from '../Misc/ComponentStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { WorkoutSession } from '../Components/WorkoutSession';
import Character, { getDefaultCharacter } from '../Components/Character';
import { useRef, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

type AwardExpScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AwardExpToCharScreen', 'CurrentWorkoutSession'>;
    route: {
      params: {
        currentSession: WorkoutSession
      };
    };
  };


const AwardExpToCharScreen = ({ route, navigation }: AwardExpScreenProps) => {

    //1) Screen Attributes
    const { currentSession } = route.params;
    const [character, setCharacter] = useState<Character>();
    
    const frameDuration = 100; // Adjust the duration between frames (in milliseconds)
  
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
      const frameCount = character?.walkingAnimation.length ? character?.idleAnimation.length : 0;
      const interval = setInterval(() => {
        setCurrentFrame((prevFrame: number) => (prevFrame + 1) % frameCount);
      }, frameDuration);

      return () => clearInterval(interval);
    }, [character?.idleAnimation]);

    useEffect(() => {
      // Fetch and set the default character when the component mounts
      getDefaultCharacter()
        .then((defaultCharacter) => {
          if (defaultCharacter) {
            setCharacter(defaultCharacter);
          }
        })
        .catch((error) => {
          console.error('Error initializing default character:', error);
        });
    }, []);
    
    return (
        <View style={styles.awardExpScreenStyle}>
          <View style={{alignItems: 'center'}}>
            <Image source={character ? character?.idleAnimation[currentFrame] : require('')} style={{ width: 300, height: 300 }} />
          </View>
          
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButtonViewPastSession}
            >
            <Text style={styles.closeButtonTextViewPastSession}>X</Text>
          </TouchableOpacity>
         
          <View style={styles.underline}></View>
          <View style={styles.awardExpTextContainer}>
            <Text style={styles.awardExpText}>Level: </Text>
            <Text style={styles.awardExpText}>{0}</Text>
          </View>
          <View style={styles.underline}></View>
          

          <View style={styles.awardExpTextContainer}>
            <Text style={styles.awardExpText}>EXP Bar PlaceHolder: </Text>
            <Text style={styles.awardExpText}>{0}</Text>
          </View>
          <View style={styles.underline}></View>
        </View>
    );
};

export default AwardExpToCharScreen;