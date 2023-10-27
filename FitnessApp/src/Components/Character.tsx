import AsyncStorage from '@react-native-async-storage/async-storage';

type Character = {
    id: number;
    name: string;
    level: number,
    expTotalAmount: number,
    idleAnimation: string[];
    walkingAnimation: string[];
    workingOutAnimation: string[];
  }

export async function createDefaultCharacter(): Promise<void> {
  let defaultCharacterCreated = await AsyncStorage.getItem('defaultCharacterCreated');
  let defaultCharacter: Character | null = null;

  if (defaultCharacterCreated === null) {
    // Create a new Character object and initialize its attributes
    defaultCharacter = {
      id: 1, // Set the appropriate ID
      name: 'Cat Fighter',
      level: 1,
      expTotalAmount: 0,
      idleAnimation: ['../Animations/frame1.png','../Animations/frame2.png','../Animations/frame3.png',
      '../Animations/frame4.png','../Animations/frame5.png','../Animations/frame6.png','../Animations/frame7.png',
      '../Animations/frame8.png','../Animations/frame9.png','../Animations/frame10.png',],
      walkingAnimation: [],
      workingOutAnimation: [],
    };

    // Set the flag in AsyncStorage to true
    await AsyncStorage.setItem('defaultCharacterCreated', 'true');

    // Store the default character in the Character section of AsyncStorage
    await AsyncStorage.setItem('defaultCharacter', JSON.stringify(defaultCharacter));
  }

  return;
}

export async function getDefaultCharacter(): Promise<Character | null> {
  try {
    const defaultCharacter = await AsyncStorage.getItem('defaultCharacter');
    console.log('zz');
    if (defaultCharacter) {
      console.log('BONGA');
      const characterParsed = JSON.parse(defaultCharacter);
      return characterParsed;
    } else {
      console.log('No default character found in AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Error initializing default character:', error);
    return null;
  }
};

export default Character;

