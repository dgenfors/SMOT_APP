
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Link } from '@react-navigation/native';
import React from "react";

function LoginView(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

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
    function onLogIn(){
        props.signIn(email,password);
    }
    /*function onSignUp(){
        props.signUp(email,password);
    }*/
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={{fontWeight: 'bold', fontSize: 25,}}>Log in or Register!</Text>
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
                </SafeAreaView>
                <Text color='red'>{props.errorMessage}</Text>
                <View style={{
                    paddingHorizontal: 24, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', }}>
                    <Button title='Log in' color='green' onPress={onLogIn}></Button>
                    <Link to="/SignUp" color='green' style={{paddingLeft: 50,}}>Sign up here!</Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9dc183',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        
        flex: 0,
        flexDirection: 'column',
        backgroundColor: '#9ed984',
        paddingVertical: 24,
        padding: 24,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: 'darkgreen',

        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

export default LoginView;