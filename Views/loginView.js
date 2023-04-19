
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
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
    function onSubmit(){
        props.signIn(email,password);
    }
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text>Login or Register!</Text>
                <Text>Test number: {props.test}</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={handleEmailSubmit}
                        placeholder="Email"
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onSubmitEditing={handlePassSubmit}
                        placeholder="Password"
                    />
                </SafeAreaView>
                <View style={{
                    paddingHorizontal: 24, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', }}>
                    <Button title='Sign Up' color='green' onPress={onSubmit}></Button>
                    <Text color='green' style={{paddingLeft: 50}}>Register</Text>
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