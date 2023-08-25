import { StyleSheet } from 'react-native';

//TODO: RE-ORGANIZE PROBLEM STYLE SETTINGS, NEED TO SET APP STANDARDS FOR ALL SCREENS
export const styles = StyleSheet.create({
    viewroutinecontainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 70,
      },
      viewroutinebutton: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
      },
      viewroutineroutineBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
      },
      selectedRoutineBox: {
        backgroundColor: '#f0f0f0',
      },
      routineName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      emptyRoutineText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      exerciseList: {
        marginTop: 10,
      },
      exerciseBox: {
        marginBottom: 10,
        flexDirection: 'row'
      },
      exerciseName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      setList: {
        marginLeft: 20,
      },
      setBox: {
        marginBottom: 5,
      },
      setInfo: {
        fontSize: 14,
      },
      createRoutineButton: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        flex: 0,
      },
      createRoutineButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
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
      deleteRoutinesButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
      startWorkoutButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      startWorkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },

      container: {
        padding: 16,
      },
      inputContainer: {
        marginBottom: 16,
      },
      label: {
        fontWeight: 'bold',
        marginBottom: 8,
      },
      input: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
      },
      setsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor : 'black',
        borderRadius: 10
      },
      setsInputContainer: {
        flex: 1,
        marginRight: 8,
      },
      addButton: {
        borderRadius: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 8,
        marginBottom: 8,
      },
      saveButton: {
        borderRadius: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 8,
        marginBottom: 8,
      },
      cancelButton: {
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        paddingVertical: 8,
        marginBottom: 8,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
      exercise: {
        marginBottom: 16,
      },
      createRoutineExerciseName: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      exerciseSet: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      setLabel: {
        fontWeight: 'bold',
        marginBottom: 8,
      },
      setValuesContainer: {
        flexDirection: 'row',
      },
      setValue: {
        marginRight: 8,
      },
      timesLabel: {
        fontWeight: 'bold',
      },
      exerciseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3
      },
      set: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'grey',
        paddingVertical: 0,
        flex: 1,
        borderColor : 'black',
        borderWidth: 2
      },
      setText: {
        fontSize: 16,
        marginTop: 2.5,
        marginBottom: 2.5,
        //height: 30,
        flex: 1,
        backgroundColor: 'white'
      },
      addButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
      headerRows: {
        height: 30,
        width: '75%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: 'linen',
        fontSize: 19,
        marginBottom: 5,
      },
      textInputsContainerHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      },

      //ExerciseBox
      exerciseBoxStartWorkout: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
      },
      exerciseTitleStartWorkout: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: 'white',
      },
      addSetButton: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 5,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
      addSetButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
      logContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
});