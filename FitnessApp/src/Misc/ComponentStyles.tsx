import { StyleSheet } from 'react-native';
import * as CSS from 'csstype';

export const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
        paddingBottom: 70,
        borderColor: 'white',
      },
      viewRoutineroutineBox: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
      },
      selectedRoutineBox: {
        backgroundColor: 'black',
        borderColor: 'white',
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
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        flex: 1,
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
        backgroundColor: 'red',
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
        height: 50,
        borderRadius: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      currentWorkoutButtonText: {
        color: '#fff',
        fontFamily: 'PixelifySansRegular',
        fontSize: 20,
        alignItems: 'center'
      },
      screenListContainer: {
        paddingHorizontal: 20,
        backgroundColor: 'black',
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
        borderColor : 'white',
        borderRadius: 10
      },
      setsInputContainer: {
        flex: 1,
        marginRight: 8,
      },

      //Create Routine
      addButtonCreate: {
        borderRadius: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 5,
        marginBottom: 5,
        height:50,
      },
      saveButtonCreate: {
        borderRadius: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 5,
        marginBottom: 5,
        height:50,
      },
      cancelButtonCreate: {
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 5,
        marginBottom: 5,
        height:50,
      },
      buttonText: {
        color: '#fff',
        fontFamily: 'PixelifySansRegular',
        fontSize: 20,
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
        marginTop: 10,
        marginBottom: 8,
        color: '#fff',
        fontSize: 20
      },
      exerciseTitle: {
        fontSize: 20,
        fontFamily: 'PixelifySansRegular',
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: 'black',
        color: '#fff',
      },
      setExerciseBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'black',
        paddingVertical: 0,
        flex: 1,
        borderColor : 'white',
        borderWidth: 2
      },
      setExerciseBoxImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: 'black',
        borderColor : 'white',

      },
      setTextExerciseBox: {
        fontSize: 16,
        marginTop: 2.5,
        marginBottom: 2.5,
        padding: 5,
        color: '#fff',
        flex: 1,
        fontFamily: 'PixelifySansRegular',
        borderColor : 'white',
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
        borderBottomColor: 'white',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      underlineDate: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
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
        borderColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: 'black'
      },
      addSetButtonExerciseBox: {
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 5,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        borderColor : 'white',
      },
      addSetButtonTextExerciseBox: {
        color: 'white',
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
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 5,
        width: "45%",
        justifyContent: "center"
      },
      headerTextCurrentWorkout: {
        color: 'white',
        fontSize: 20,
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
        backgroundColor: 'green',
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1
      },

      // Profile Screen Styles
      banner: {
        backgroundColor: 'gray',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
      profilePictureContainer: {
        position: 'absolute',
        top: -90,
        left: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: 'black',
      },
      profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
      },
      profileStatsTitle: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 5,
        justifyContent: 'center',
        fontFamily: 'PixelifySansRegular',
      },
      viewSpecialStatsBox: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginBottom: 5,
        padding: 10,
        paddingBottom: 25,
      },

      //Award Character Screen
      awardExpScreenStyle: {
        flex: 1,
        backgroundColor: 'black',
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
      characterNameText: {
        fontFamily: 'PixelifySansSemiBold',
        marginBottom: 8,
        color: '#fff',
        textAlign: "center",
        alignItems: 'center',
        flex: 1,
        fontSize: 35
      },

      //Statistics
      container: {
        flex: 1,
        backgroundColor: 'black',
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

