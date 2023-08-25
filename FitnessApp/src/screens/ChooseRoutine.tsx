import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ChooseRoutine = () => {




    const styles = StyleSheet.create({
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
          flexDirection: 'row',
          justifyContent: 'space-between',
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
        exerciseName: {
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
      });
}

export default ChooseRoutine;
