import React from "react";
import FrontpageView from "../Views/frontpageView";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseconfig';
import LoginView from "../Views/loginView";
import { useContext } from 'react';
import { ModelContext } from "../ModelContext";
import { StyleSheet, Text, View } from 'react-native';

export default
    function FrontPage({navigation}) {
    const model = useContext(ModelContext);
    const [test, setTest] = React.useState(model.dataArray);
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setTest(model.dataArray);
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

    function logout() {
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
                onChangedTest={changeTest}
                onPressLogout={logout}
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
