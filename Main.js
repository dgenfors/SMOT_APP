import FrontPage from "./Presenter/frontPagePresenter";
import LoginPage from "./Presenter/loginPagePresenter";
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ModelContext } from "./ModelContext";

export default function Main(props) {
  const Stack = props.stack;
  
  return (
    <NavigationContainer>
      <ModelContext.Provider value={props.model}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Front" component={FrontPage} options={{headerBackVisible: false}} />
            <Stack.Screen name="Login" component={LoginPage} />
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