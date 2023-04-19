import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import Model from "./Model/Model";
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  console.log("In app");
  return (
    <View style={styles.container}>
      <Main model={new Model(5)}  stack={Stack}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



