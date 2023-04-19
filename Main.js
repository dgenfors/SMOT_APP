import FrontPage from "./Presenter/frontPagePresenter";
import LoginPage from "./Presenter/loginPagePresenter";
import SignUpPage from "./Presenter/signupPagePresenter";
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ModelContext } from "./ModelContext";

export default function Main(props) {
  const Stack = props.stack;

  function logOut(navigation) {
    popToTop();
  }


  return (
    <NavigationContainer>
      <ModelContext.Provider value={props.model}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Front" component={FrontPage} options={({ navigation, route }) => ({
              headerBackVisible: false,
              headerRight: () => (<Button onPress={() => {
                navigation.popToTop()
                try {
                  signOut(auth)
                  console.log("signed out");
                } catch (error) {
                  console.log(error.message)
                }
              }} title="Logout" />)
            })} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />



          </Stack.Navigator>
        </View>
      </ModelContext.Provider>
    </NavigationContainer>
  );
}

// <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
// <FrontPage model={props.model}></FrontPage>
// </View>

/*
return (
  <NavigationContainer>
    <ModelContext.Provider value={props.model}>
    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
      <Stack.Navigator initialRouteName="Front">
        <Stack.Screen name="Front" component={FrontPage} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </View>
    </ModelContext.Provider>
  </NavigationContainer>
);
*/