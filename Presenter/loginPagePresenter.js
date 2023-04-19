import React from "react";
import LoginView from "../Views/loginView";
import { StyleSheet, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseconfig';

export default
    function LoginPage({navigation}) {

    function handleLoginButtonPress() {
        navigation.navigate("Front");
    }
    async function signUpUser(email,password){
        console.log(email,password)
       try{
            const user = await createUserWithEmailAndPassword(auth, email, password)
        }catch(error){
            console.log(error.message)
        }
    }

    return (

            <LoginView signUp ={signUpUser}></LoginView>
            
        
    )
}