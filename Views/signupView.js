
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Link } from '@react-navigation/native';
import React from "react";

function SignUpView(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confPassword, setConfPassword] = React.useState();

    function  handleEmailSubmit(event){
        //props.onChangedTest(event.nativeEvent.text);
        setEmail(event.nativeEvent.text);
        console.log(email);
    }
    function  handlePassSubmit(event){
        //props.onChangedTest(event.nativeEvent.text);
        setPassword(event.nativeEvent.text);
        console.log(password);
    }
    function  handleConfPassSubmit(event){
        //props.onChangedTest(event.nativeEvent.text);
        setConfPassword(event.nativeEvent.text);
        console.log(password);
    }
   
    function onSignUp(){
        props.signUp(email,password, confPassword);
    }
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={{fontFamily: 'comic-sans bold', fontSize: 25,}}>Register!</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChange={handleEmailSubmit}
                        placeholder="Email"
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChange={handlePassSubmit}
                        placeholder="Password"
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChange={handleConfPassSubmit}
                        placeholder="Confirm password"
                    />
                </SafeAreaView>
                <Text color='red'>{props.errorMessage}</Text>
                <View style={{
                    paddingHorizontal: 24, 
                    flexDirection: 'row', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    alignSelf: 'center'}}>
                    <Button title='Sign Up' color='green' onPress={onSignUp}></Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e8f2e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        
        flex: 0.5,
        height: 400,
        width: 300,
        flexShrink: 0,
        resizeMode: 'contain',

        flexDirection: 'column',
        backgroundColor: '#9ed984',
        padding: 24,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'darkgreen',

        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontFamily: 'comic-sans',
    },
});

export default SignUpView;