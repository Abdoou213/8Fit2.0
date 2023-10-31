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

  const animationFrames = [
    './frame1.png',
    'FitnessApp/src/Animations/frame2.png',
    '../Animations/frame3.png',
    '../Animations/frame4.png',
    '../Animations/frame5.png',
    '../Animations/frame6.png',
    '../Animations/frame7.png',
    '../Animations/frame8.png',
    '../Animations/frame9.png',
    '../Animations/frame10.png'
  ];

    //1) Screen Attributes
    const { currentSession } = route.params;
    const [character, setCharacter] = useState<Character>();
    
    const frameDuration = 100; // Adjust the duration between frames (in milliseconds)
  
    const [currentFrame, setCurrentFrame] = useState(0);

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
    console.log(character)

    const updateFrameIndex = () => {
      if (character && animationFrames) {
        setCurrentFrame((prevFrameIndex) => (prevFrameIndex + 1) % animationFrames.length);
      }
    };
    /*useEffect(() => {
      const frameCount = character?.walkingAnimation.length ? character?.idleAnimation.length : 0;
      const interval = setInterval(() => {
        setCurrentFrame((prevFrame: number) => (prevFrame + 1) % frameCount);
      }, frameDuration);

      return () => clearInterval(interval);
    }, [character?.idleAnimation]);*/
    // Function to update the frame index in a loop
  

  // Use useEffect to start the animation loop when the component mounts
  useEffect(() => {
    if (character && character.idleAnimation) {
      const animationInterval = setInterval(updateFrameIndex, 100); // Adjust the interval as needed
      return () => clearInterval(animationInterval); // Clear the interval when the component unmounts
    }
  }, [character]);

  if (!character || !character.idleAnimation || character.idleAnimation.length === 0) {
    return null; // Render nothing if character is undefined or has no idleAnimation
  }

  const idleAnimationSource = animationFrames[currentFrame]
    if (!idleAnimationSource) {
      // Handle the case where idleAnimationSource is not defined
      return null;
    }

    
    return (
        <View style={styles.awardExpScreenStyle}>
          <View style={{alignItems: 'center'}}>
          <Image source={{ uri: animationFrames[currentFrame] }} style={{ width: 300, height: 300 }} />
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
/*

*/
export default AwardExpToCharScreen;