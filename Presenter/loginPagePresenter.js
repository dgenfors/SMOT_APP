import React from "react";
import LoginView from "../Views/loginView";
import { StyleSheet, Text, View, Button } from 'react-native';

export default
    function LoginPage({navigation}) {

    function handleLoginButtonPress() {
        navigation.navigate("Front");
    }

    return (

        <View>
            <Text>test</Text>
            <Button
                onPress={handleLoginButtonPress}
                title="Login"
            />
        </View>
    )
}