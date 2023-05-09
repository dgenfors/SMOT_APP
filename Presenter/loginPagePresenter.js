import React from "react";
import LoginView from "../Views/loginView";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useContext } from 'react';
import { ModelContext } from "../ModelContext";
import { updateModelFromFirebase } from "../Model/FirebaseModel";
import { onAuthStateChanged} from "firebase/auth";

export default function LoginPage({ navigation }) {
  const [errorText, setErrorText] = React.useState("");
  const model = useContext(ModelContext);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      model.setLoginStatus(true);
      //updateModelFromFirebase(model);
      navigation.navigate("Tab");
    } else {
      model.setLoginStatus(false);
    }
  });

  function handleLoginButtonPress() {
    navigation.navigate("Tab");
  }

  function signIn(email, password) {
    function successACB(userCredential) {
      updateModelFromFirebase(model);
      navigation.navigate("Tab");
    }

    function failACB(error) {
      setErrorText(error.message);
    }

    console.log("Sign in", email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        successACB(userCredential);
      })
      .catch((error) => {
        failACB(error);
      });
  }

  async function signUpUser(email, password) {
    navigation.navigate("SignUp");
  }

  return (
    <LoginView
      signUp={signUpUser}
      signIn={signIn}
      errorMessage={errorText}
    ></LoginView>
  );
}
