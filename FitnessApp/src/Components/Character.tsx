import AsyncStorage from '@react-native-async-storage/async-storage';

type Character = {
    id: number;
    name: string;
    level: number,
    expTotalAmount: number,
    color: string
  }

  export async function createDefaultCharacter(): Promise<Character | null> {
    let defaultCharacterCreated = await AsyncStorage.getItem('defaultCharacterCreated');
    let defaultCharacter: Character | null = null;
  
    if (defaultCharacterCreated === null || defaultCharacterCreated === 'false') {
      // Create a new Character object and initialize its attributes
      defaultCharacter = {
        id: 1,
        name: 'Cat Fighter',
        level: 1,
        expTotalAmount: 0,
        color: 'white',
      };
  
      // Set the flag in AsyncStorage to true
      await AsyncStorage.setItem('defaultCharacterCreated', 'true');
  
      // Store the default character in the Character section of AsyncStorage
      await AsyncStorage.setItem('defaultCharacter', JSON.stringify(defaultCharacter));
      console.log('created character');
      console.log(defaultCharacter);
    }
  
    return defaultCharacter;
  }

  export async function getDefaultCharacter(): Promise<Character> {
    try {
      const defaultCharacter = await AsyncStorage.getItem('defaultCharacter');
  
      if (defaultCharacter) {
        const characterParsed = JSON.parse(defaultCharacter);
        return characterParsed;
      } else {
        const newChar: Character = {
          id: 0,
          name: '',
          level: 1,
          expTotalAmount: 0,
          color: 'white'
        };
        return newChar;
      }
    } catch (error) {
      // Handle the error here, e.g., log it or return a default character
      console.error('Error while getting default character:', error);
  
      // Return a default character or throw the error
      const newChar: Character = {
        id: 0,
        name: '',
        level: 1,
        expTotalAmount: 0,
        color: 'white'
      };
      return newChar;
    }
  }
  

export async function deleteCharacterAndResetFlag(): Promise<void> {
  try {
    // Remove the character data from AsyncStorage
    await AsyncStorage.removeItem('defaultCharacter');
    await AsyncStorage.setItem('defaultCharacterCreated', 'false');
    console.log('deleted')
  } catch (error) {
    console.error('Error deleting character:', error);
  }
}

export default Character;

