//import FrontPage from "./Presenter/frontPagePresenter";
import FrontPage from "./Presenter/frontPagePresenterNew";
import LoginPage from "./Presenter/loginPagePresenter";
import SignUpPage from "./Presenter/signupPagePresenter";
import DetailsPage from "./Presenter/detailsPagePresenter";
import HistoryPage from "./Presenter/historyPagePresenter";
import searchbarPresenter from "./Presenter/searchbarPresenter";
import * as React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ModelContext } from "./ModelContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const customTextProps = {
  style: {

    fontFamily: 'comic-sans',
  }
};

setCustomText(customTextProps);

export default function Main(props) {
  const Stack = props.stack;




  React.useEffect(checkForWaterAlertAtStartup, []);

  function checkForWaterAlertAtStartup() {
    if (typeof props.model.devices === "object") {
      console.log("yes")
      try {
        const lowWaterNameArray = props.model.devices.reduce(callbackFn, [])
        if (lowWaterNameArray.length > 0) {
          let message = "The water levels in the reservoirs of: ";
          message += lowWaterNameArray;
          message += " are critically low, please refill"
          waterAlert(message)
        }
      }
      catch {
        console.warn("No device added")
      }
    }
    //console.log(props.model.devices.reduce(callbackFn, []))

    function callbackFn(accumulator, element) {
      if (element.waterLevel < 10) {
        accumulator.push(element.name);
      }
      return accumulator;
    }
  }

  function logOut(navigation) {
    popToTop();
  }

  const waterAlert = (message) =>
    Alert.alert(
      'Water level critical',
      message,
      [
        {
          text: 'Ok',
          //onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        //onDismiss: () =>

      },
    );

  onAuthStateChanged(auth, (user) => {
    if (user) {
      props.model.setLoginStatus(true);
      //Ny return Om man är inloggad
    } else {
      props.model.setLoginStatus(false);
    }
  });
  const Tab = createMaterialTopTabNavigator();
  function DetailsNavigator({ route }) {
    return (<Tab.Navigator>
      <Tab.Screen name="Details" options={{ unmountOnBlur: true  }} children={() => <DetailsPage userData={route.params}  />} />
      <Tab.Screen name="Add Plant" component={searchbarPresenter} options={{ unmountOnBlur: true }}/>
      <Tab.Screen name="History" options={{ unmountOnBlur: true }} children={() => <HistoryPage userData={route.params} />} />
    </Tab.Navigator>);
  }
  function LoginTab() {
    return (<Tab.Navigator initialRouteName="Login">
      <Tab.Screen name="Login" component={LoginPage} />
      <Tab.Screen name="SignUp" component={SignUpPage} />

    </Tab.Navigator>)
  }
  return (
    <NavigationContainer>
      <ModelContext.Provider value={props.model}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          <Stack.Navigator initialRouteName="LoginTab">
            <Stack.Screen name="LoginTab" component={LoginTab} />
            <Stack.Screen name="Home" component={FrontPage}

              options={({ navigation, route }) => ({
                headerBackVisible: false,
                headerRight: () => (<Button onPress={() => {
                  try {
                    signOut(auth)
                    navigation.popToTop()
                    console.log("signed out");
                  } catch (error) {
                    console.log(error.message)
                  }
                }} title="Logout" />)
              })}
            />
            <Stack.Screen name="More info" component={DetailsNavigator} 
            
            options={({ navigation, route }) => ({
              headerBackVisible: false,
              headerRight: () => (<Button onPress={() => {
                try {
                  signOut(auth)
                  navigation.popToTop()
                  console.log("signed out");
                } catch (error) {
                  console.log(error.message)
                }
              }} title="Logout" />)
            })}
            
            
            />
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