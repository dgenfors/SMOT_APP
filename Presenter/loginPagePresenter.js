import React from "react";
import LoginView from "../Views/loginView";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseconfig";

export default function LoginPage({ navigation }) {
  const [errorText, setErrorText] = React.useState("");

  function handleLoginButtonPress() {
    navigation.navigate("Front");
  }

  function signIn(email, password) {
    function successACB(userCredential) {
      navigation.navigate("Front");
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
