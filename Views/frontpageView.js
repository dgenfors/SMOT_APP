
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable} from 'react-native';

import { Link } from '@react-navigation/native';
import { Image } from 'react-native';
import watercanImage from '../assets/watercan.png';
import smotLogo from '../assets/smotlogo.png';

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

    

   

    function makeDisplayItemsCB({item}) {
        const test = props.isPumpPumping(item.id);  
        function onMoreInfoButtonPressed(event) {
            //console.log(event)
            props.navToDetails(item.id);
        }
        function onWaterButtonPressed() {
            props.runPump(item.id);
        }
        if(item == null) 
            return (null);
        return (
            <Pressable onPress={onMoreInfoButtonPressed}>
            <View style={styles.addedDevice}>
                <Image style={styles.tinyLogo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                <View style={{}}>
                    <Text >{item.name}</Text>
                    <Text >Moisture: {item.currentMoisture}</Text>
                    <Text >Waterlevel: {item.waterLevel}</Text>
                    <Text >PumpState: {item.pumpState}</Text>
                </View>
                {!test? (<Pressable onPress={onWaterButtonPressed} style={{borderRadius: 20, borderColor: 'blue', borderWidth: 3, padding: 4, margin: 4}}>
                    <Image source={watercanImage} style={{width: 64, height: 42, tintColor: 'blue'}}/>
                    <Text style={{color: 'blue', textAlign: 'center', fontWeight: 'bold', fontSize: 18, }}>Water</Text>
                    </Pressable>):
                    (<Pressable onPress={onWaterButtonPressed} style={{borderRadius: 20, borderColor: 'blue', borderWidth: 3, padding: 4, margin: 4}}>
                    <Image source={watercanImage}
                    style={{width: 64, height: 42, tintColor: 'blue'}}/>
                    <Text style={{color: 'blue', textAlign: 'center', fontWeight: 'bold', fontSize: 18, }}>Watering</Text>
                    </Pressable>)}
                </View>          
            </Pressable>
        );
    }

    console.log("fpview", props);
    return (
        <View style={styles.container}>
            
            <Image source={smotLogo} 
            style={{ margin: -60, 
                padding: 2, 
                minWidth: '60%', 
                maxWidth: '85%',
                width: 720, 
                height: 320, 
                resizeMode: 'contain',
                transform: [{scale: 0.5}] 
                }}/>
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
                ListEmptyComponent={() => 
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
                        <Text style={{fontWeight: 'bold', fontSize: 32, textAlign: 'center', }}>No devices found!</Text>
                        <Text style={{fontSize: 16, textAlign: 'center', }}>Make sure your SMOT has an internet connection</Text>
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
        backgroundColor: '#2e8f2e',
        
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
        flex: 100,
        flexDirection: 'column',
        backgroundColor: '#CFCFC4',
        
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
        margin: 4,
    },
    bigText: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#9dc183',
        

        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default FrontpageView;