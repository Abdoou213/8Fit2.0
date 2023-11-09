import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#2d2d47',
        padding: 20,
        paddingBottom: 70,
      },
      viewRoutineroutineBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#2d2d47',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
      },
      selectedRoutineBox: {
        backgroundColor: '#2d2d47',
        borderColor: '#a6a571',
        borderWidth: 4,
      },
      routineName: {
        fontSize: 20,
        fontFamily: 'PixelifySansRegular',
        marginBottom: 10,
        color: 'white'
      },
      emptyRoutineText: {
        color: '#000',
        fontFamily: 'PixelifySansRegular',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      exerciseList: {
        marginTop: 10,
      },
      exerciseInListDisplayed: {
        marginBottom: 10,
        flexDirection: 'row'
      },
      setInfo: {
        fontSize: 16,
        fontFamily: 'PixelifySansRegular',
        marginBottom: 5,
        color: 'white'
      },
      createRoutineButton: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#76ab63',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        flex: 0,
      },
      createRoutineButtonText: {
        color: '#fff',
        fontFamily: 'PixelifySansRegular',
        fontSize: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 16,
        left: 20,
        right: 20,
      },
      deleteRoutinesButton: {
        backgroundColor: '#bd1730',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      deleteRoutineButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      deleteRoutinesButtonText: {
        color: '#fff',
        fontFamily: 'PixelifySansRegular',
        fontSize: 18, 
        textAlign: 'center',
        paddingVertical: 1
      },
      currentWorkoutButton: {
        backgroundColor: '#76ab63',
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1
      },
      currentWorkoutButtonText: {
        color: '#fff',
        fontFamily: 'PixelifySansRegular',
        fontSize: 18,
        alignItems: 'center'
      },
      screenListContainer: {
        paddingHorizontal: 20,
        backgroundColor: '#2d2d47',
        flex: 1
      },
      inputContainer: {
        marginBottom: 16,
        color: '#76ab63',
      },
      createPageHeaderLabels: {
        fontFamily: 'PixelifySansRegular',
        marginBottom: 8,
        fontSize: 16,
        color: '#fff',
      },
      input: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
        color: '#fff'
      },
      setsContainerExerciseBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor : 'black',
        borderRadius: 10
      },
      setsInputContainer: {
        flex: 1,
        marginRight: 8,
      },

      //Create Routine
      addButtonCreate: {
        borderRadius: 10,
        backgroundColor: '#76ab63',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 5,
        marginBottom: 5,
      },
      saveButtonCreate: {
        borderRadius: 10,
        backgroundColor: '#76ab63',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 5,
        marginBottom: 5,
      },
      cancelButtonCreate: {
        borderRadius: 10,
        backgroundColor: '#bd1730',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 5,
        marginBottom: 5,
      },
      buttonText: {
        color: '#fff',
        fontFamily: 'PixelifySansRegular',
        fontSize: 18,
      },
      exerciseCreate: {
        marginBottom: 16,
      },
      createRoutineExerciseName: {
        fontFamily: 'PixelifySansRegular',
        fontSize: 18,
        color:'#fff'
      },
      createRoutineExercisesListLabel: {
        fontFamily: 'PixelifySansRegular',
        fontSize: 18,
        color:'#fff',
        textDecorationLine: 'underline',
        textAlign: 'center',
        padding: 5,
      },
      setLabelCreate: {
        fontFamily: 'PixelifySansRegular',
        marginBottom: 8,
        color: '#fff',
        fontSize: 14
      },
      exerciseTitle: {
        fontSize: 20,
        fontFamily: 'PixelifySansRegular',
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: '#2d2d47',
        color: '#fff',
        borderColor: '#a6a571',
        borderWidth: 3
      },
      setExerciseBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#2d2d47',
        paddingVertical: 0,
        flex: 1,
        borderColor : '#a6a571',
        borderWidth: 2
      },
      setTextExerciseBox: {
        fontSize: 16,
        marginTop: 2.5,
        marginBottom: 2.5,
        padding: 5,
        color: '#fff',
        flex: 1,
        fontFamily: 'PixelifySansRegular',
      },
      deleteSetButtonText: {
        marginTop: 2.5,
        fontSize: 16,
        padding: 1,
        color: '#fff',
        flex: 1,
        fontFamily: 'PixelifySansRegular',
      },
      deleteSetButton: {
        marginTop: 2.5,
        backgroundColor: 'transparent',
        padding: 7,
        borderRadius: 1,
        marginRight: 1,
      },
      headerRowsPastSession: {
        height: 30,
        width: '75%',
        color: '#fff',
        paddingLeft: 10,
        fontSize: 24,
        marginBottom: 5,
        fontFamily: 'PixelifySansRegular',
      },
      headerRowsDatePastSession: {
        height: 30,
        width: '75%',
        color: '#fff',
        paddingLeft: 10,
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'PixelifySansRegular',
      },
      logHeaderTitle: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 5,
        textAlign: 'center', 
        justifyContent: 'center',
        fontFamily: 'PixelifySansRegular',
      },
      currentWorkoutHeaderDate: {
        color: '#fff',
        fontSize: 19,
        marginBottom: 5,
        textAlign: 'center', 
        justifyContent: 'center',
        fontFamily: 'PixelifySansRegular',
      },
      underline: {
        borderBottomWidth: 1,
        borderBottomColor: '#a6a571',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      underlineDate: {
        borderBottomWidth: 1,
        borderBottomColor: '#a6a571',
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textInputsContainerHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        marginBottom: 5,
      },

      //ExerciseBox
      exerciseBoxContainer: {
        borderWidth: 3,
        borderColor: '#a6a571',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#2d2d47'
      },
      addSetButtonExerciseBox: {
        backgroundColor: '#a6a571',
        padding: 8,
        borderRadius: 5,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
      addSetButtonTextExerciseBox: {
        color: '#2d2d47',
        fontSize: 16,
        fontFamily: 'PixelifySansRegular',
        textAlign: 'center',
      },
      closeButtonViewPastSession: {
        backgroundColor: 'transparent',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
      },
      deleteRoutineButton: {
        backgroundColor: 'transparent',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
      },
      closeButtonTextViewPastSession: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'PixelifySansRegular',
      },
      headerContainerPastSession: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      },     
      headerContainer: {
        marginTop: 20,
        marginBottom: 20,
      },

      //Current Workout Screen
      finishButtonCurrentWorkout:{
        backgroundColor: "#a6a571",
        padding: 8,
        borderRadius: 5,
        width: "45%",
        justifyContent: "center"
      },
      headerTextCurrentWorkout: {
        color: '#2d2d47',
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'PixelifySansRegular',
      },
      currentWorkoutHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        marginTop: 20
      },

      //ChooseExerciseFromCategory
      deleteButtonContainer: {
        paddingHorizontal: 8,
      },
      deleteButtonText: {
        fontSize: 18,
        color: 'red',
        fontFamily: 'PixelifySansRegular',
      },
      viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottomWidth: 1,
        borderBottomColor: 'gray', 
        paddingVertical: 8, 
      },
      itemContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 8, 
      },
      chooseExerciseBox: {
        height: 30,
        width: '100%',
        color: '#fff',
        paddingLeft: 10,
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'PixelifySansRegular',
      },
      createExerciseButton: {
        marginBottom: 15,
        backgroundColor: '#a6a571',
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1
      },

      // Profile Screen Styles
      banner: {
        backgroundColor: 'gray', // Change the background color as desired
        width: '100%',
        height: 150, // Adjust the height to control the banner size
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5, // Customize the shape of the banner
        borderBottomRightRadius: 5, // Customize the shape of the banner
      },
      profilePictureContainer: {
        position: 'absolute',
        top: -90, // Adjust the position of the profile picture relative to the banner
        left: 10,
        alignSelf: 'center',
        backgroundColor: 'white', // Background color for the circular container
        borderRadius: 50, // Make it a circle by setting borderRadius to half of the width/height
        width: 100, // Adjust the width and height as needed
        height: 100,
        borderWidth: 2, // You can add a border for the circle
        borderColor: 'black', // Border color for the circle
      },
      profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: 50, // Make it a circle by setting borderRadius to half of the width/height
        // Add your profile picture image source or content here
      },
      profileStatsTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'left', 
        justifyContent: 'center',
      },
      viewSpecialStatsBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#2d2d47',
        borderRadius: 10,
        marginBottom: 20,
        padding: 50,
        paddingBottom: 5,
      },

      //Award Character Screen
      awardExpScreenStyle: {
        flex: 1,
        backgroundColor: '#2d2d47',
        padding: 20,
        paddingBottom: 5,
        alignContent: 'center'
      },
      awardExpTextContainer: {
        flexDirection: 'row',
        paddingVertical: 2,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
      },
      awardExpText: {
        fontFamily: 'PixelifySansRegular',
        marginBottom: 8,
        color: '#fff',
        textAlign: "center",
        alignItems: 'center',
        fontSize: 25
      },
      levelUpText: {
        fontFamily: 'PixelifySansSemiBold',
        marginBottom: 8,
        color: '#fff',
        textAlign: "center",
        alignItems: 'center',
        fontSize: 70
      },

      //Statistics
      container: {
        flex: 1,
        backgroundColor: '#2d2d47',
      },
      closeButtonStats: {
        color: 'white',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
      },
      statsheader: {
        fontSize: 30,
        margin: 20,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'PixelifySansRegular',
      },
      statisticRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      },
      iconCell: {
        width: 40,
        alignItems: 'center',
      },
      statisticCell: {
        flex: 1,
        marginBottom:10,
        marginTop:10
      },
      statisticText: {
        fontSize: 16,
        fontFamily: 'PixelifySansRegular',
      },
      statisticValue: {
        fontSize: 24,
        fontFamily: 'PixelifySansRegular',
      },
      textRight: {
        textAlign: 'right',
        color: 'white',
      },
});
