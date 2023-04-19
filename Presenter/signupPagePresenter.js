import React from "react";
import SignUpView from "../Views/signupView";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseconfig";

export default function SignUpPage({ navigation }) {
  const [errorText, setErrorText] = React.useState("");

  async function signUpUser(email, password) {
    console.log(email, password);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Front");
    } catch (error) {
      setErrorText(error.message);
    }
  }

  return <SignUpView signUp={signUpUser} errorMessage={errorText}></SignUpView>;
}
