
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable} from 'react-native';

import { Link } from '@react-navigation/native';
import { Image } from 'react-native';
//import treelogo from '../assets/treelogo.png';
import React from "react";
import { FlatList } from 'react-native';
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

    console.log(props);
    return (
        <View style={styles.container}>
            <View style={styles.columnContainer}>
                <FlatList style={{width: '100%', padding: 50,}}
                data={props.devices}
                renderItem={makeDisplayItemsCB}
                ItemSeparatorComponent={ () => <View style={{height: 40,}}/>}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                ListHeaderComponent={() => 
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 36, }}>
                        <Text style={{fontWeight: 'bold', fontSize: 40, textAlign: 'center', }}>Your devices</Text>
                        <Text style={{fontSize: 16, textAlign: 'center', }}>Click on a device for more info!</Text>
                    </View> }
                ListFooterComponent={() => 
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
                        <Text style={{fontWeight: 'bold', fontSize: 26, textAlign: 'center', }}>No more devices connected</Text>
                        <Text style={{fontSize: 16, textAlign: 'center', }}>If a device is missing, then that's too bad...</Text>
                    </View> }
                />
            </View>
        </View>
        
    );
}

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
        backgroundColor: '#B2AC88',

        padding: 24,

        minHeight: 100,
        minWidth: 150,

        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#B2AC88',

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#CFCFC4',
        
        marginTop: 80,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        minWidth: '60%',
        maxWidth: '85%',
        padding: 24,
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
        height: 50,
        width: 50,
    }
});

export default FrontpageView;