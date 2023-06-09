import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import Model from "./Model/Model";
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise } from './Model/FirebaseModel';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";
import promiseNoData from './promiseNoData';
import resolvePromise from './resolvePromise';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [userID, setUserID] = React.useState(null);
  const [firebaseModelPromiseState] = React.useState({});
  const [, reRender] = React.useState();

  React.useEffect(wasCreatedACB, []);

  const model = new Model();

  //Font stuff
  const [isLoaded] = useFonts({
    "comic-sans": require("./assets/fonts/comic.ttf"), 
    "comic-sans bold": require("./assets/fonts/comicz.ttf"),
  });
  const handleOnLayout = React.useCallback(async () => { if (isLoaded) {await SplashScreen.hideAsync();} }, [isLoaded]);
  if (!isLoaded) {
    return null;
  }



  function notifyACB() {
    reRender(new Object());
    if (firebaseModelPromiseState.data) {
      //console.log("promisestate:", firebaseModelPromiseState.data);
      updateFirebaseFromModel(firebaseModelPromiseState.data);
      updateModelFromFirebase(firebaseModelPromiseState.data);
    }
  }



  //Method call to activate firebaseObserver
  //if(promiseState.data){
  //  updateFirebaseFromModel(promiseState.data)
  //  updateModelFromFirebase(promiseState.data)
  //}
  function wasCreatedACB() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(true);
        resolvePromise(firebaseModelPromise(), firebaseModelPromiseState, notifyACB)

      } else {
        setUserID(false);
      }
    });
  }
  if (!userID) {
    return (
      <View style={styles.container} onLayout={handleOnLayout}>
        <Main model={model} stack={Stack} isLogged={false} />
      </View>
    );
  }
  else {
    return (promiseNoData(firebaseModelPromiseState) ||
      <View style={styles.container}>
        <Main model={firebaseModelPromiseState.data} stack={Stack} isLogged={true} />
      </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e8f2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
