
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable} from 'react-native';

import { Link } from '@react-navigation/native';
import { Image } from 'react-native';
//import treelogo from '../assets/treelogo.png';
import React from "react";
import { FlatList } from 'react-native-web';
//import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';

function FrontpageView(props) {
    //function onChangeTextACB(number) {
    //    props.onChangedTest(number);
    //}

    function handleInputSubmit(event) {
        props.onChangedTest(event.nativeEvent.text);
        //console.log('Input submitted:', event.nativeEvent.text);
        // do something with the input value here
    }
    function handleInputSubmitMoist(event) {
        props.onChangedMoisture(event.nativeEvent.text);
        //console.log('Input submitted:', event.nativeEvent.text);
        // do something with the input value here
    }
    //onChangeText={onChangeTextACB}

    function handleLogoutButtonPress(event) {
        props.onPressLogout();
    }

    function onWaterButtonPressed(evnt) {
        props.runPump();
    }

   

    function makeDisplayItemsCB({item}) {
        function onMoreInfoButtonPressed(event) {
            console.log(event)
            props.navToDetails(item.id);
        }
        return (
            <Pressable onPress={onMoreInfoButtonPressed}>
            <View style={styles.addedDevice}>
                <Image style={styles.tinyLogo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                <View style={{}}>
                <Text> Name: {item.name} </Text>
                <Text> Moisture: {item.currentMoisture} </Text>
                <Text> Waterlevel: {item.waterLevel} </Text>
                </View>
                <Button title='Water' color='blue' onPress={onWaterButtonPressed}> </Button>                
            </View>
            </Pressable>
        )
    }

    //something wrong with style={styles.container} that was in outer view removing for now.
    console.log(props);
    return (
        <View style={styles.container}>
            <View style={styles.columnContainerTop}>
                <Text style={{fontWeight: 'bold', fontSize: 40, position: top, }}>Your devices</Text>
                <Text style={{fontSize: 16, position: top, }}>Click on a device for more info!</Text>
            </View>
            <View style={styles.columnContainer}>
                <FlatList style={{width: '100%', padding: 50,}}
                data={props.devices}
                renderItem={makeDisplayItemsCB}
                />               
            </View>
        </View>
    );
}
/* */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#9dc183',
        

        alignItems: 'center',
        justifyContent: 'center',
    },
    addedDevice: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#B2AC88',
        width: '800',
        height: '800',

        padding: 24,
        marginVertical: 30,

        borderWidth: 5,
        borderRadius: 20,
        borderColor: '#B2AC88',

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    columnContainerTop: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: '#CFCFC4',

        width: '60%',
        
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#CFCFC4',
        
        width: '60%',
        padding: '24',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }
});

export default FrontpageView;