import React from "react";
import FrontpageView from "../Views/frontpageView";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebaseconfig';
import LoginView from "../Views/loginView";
import { useContext } from 'react';
import { ModelContext } from "../ModelContext";
import { StyleSheet, Text, View } from 'react-native';

export default
    function FrontPage({navigation}) {
    const model = useContext(ModelContext);
    const [test, setTest] = React.useState(model.dataArray);
    const [moisture, setMoisture] = React.useState(model.devices[0].moistureLevel);
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setTest(model.dataArray);
        setMoisture(model.devices[0].moistureLevel);
    }

    function wasCreatedACB() {
        model.addObserver(observerACB);
        function isTakenDownACB() {
            model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }

    function changeTest(number) {
        model.addData(number);
        //console.log("Presnter test")
    }
    function changeMoisture(number) {
        //model.setMoistureLevel(number);
        model.setMoistureLevel(number, 1);
        //console.log("Presnter test")
    }

    function logout() {
        try{
            signOut(auth)
            console.log("signed out");
        }catch(error){
            console.log(error.message)
        } 
        navigation.popToTop();
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
        <View>
            <FrontpageView
                test={test}
                moisture={moisture}
                onChangedTest={changeTest}
                onPressLogout={logout}
                onChangedMoisture={changeMoisture}
            >
            </FrontpageView>
        </View>
    )
/*
    return (
        <LoginView
        test={props.model.dataArray}
        onChangedTest={changeTest}
        signIn={signUpUser}
        >
        </LoginView>
)
*/
}
