import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import Model from "./Model/Model";
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { updateFirebaseFromModel, updateModelFromFirebase} from './Model/FirebaseModel';
const Stack = createNativeStackNavigator();

export default function App() {
  console.log("In app");
  const model = new Model();
  
  //Method call to activate firebaseObserver
  updateFirebaseFromModel(model);
  updateModelFromFirebase(model);
  
  return (
    <View style={styles.container}>
      <Main model={model}  stack={Stack}/>
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



