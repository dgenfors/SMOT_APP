
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Switch } from 'react-native';

import Slider from '@react-native-community/slider';

export default function DetailsView(props) {

    console.log("rerenderingdetails")

    function nameChanged(event) {
        console.log(event.nativeEvent.text);
        if (event.nativeEvent.text != "")
            props.onNameChanged(event.nativeEvent.text);
        else
            props.onNameChanged("Unnamed");
    }

    function wateringTimeChanged(value) {
        props.onWateringTimeChanged(value);
    }

    function onMoistureTargetChanged(value) {
        props.onMoistChanged(value);
    }

    function onCalibratePressed() {
        props.onCalibrate(true);
    }

    function ontoggleSwitch(value) {
        props.onAutowateringToggled(value);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.infoLine}>
                    <Text style={styles.infoText}>Device name: </Text>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={nameChanged}
                        placeholder={props.device.name}
                        maxLength={20}
                    ></TextInput>
                </View>
                <View style={styles.infoCol}>
                <View style={styles.line}>
                    <Text style={styles.infoText} >AutoWatering</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={props.device.autoWateringState ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={ontoggleSwitch}
                        value={props.device.autoWateringState}
                    />
                </View>
                    <View style={styles.line}>
                        <Text style={styles.infoText}>Prefered moisturelevel: </Text>
                        <Text style={styles.valueText}>{props.device.moistureLevel}</Text>
                    </View>
                    <Slider
                        value={props.device.moistureLevel}
                        style={{ width: '100%', alignSelf: 'flex-end', paddingVertical: 8, marginBottom: 20}}
                        step={10}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#04ADE2"
                        maximumTrackTintColor="#635147"
                        onSlidingComplete={onMoistureTargetChanged}
                        thumbTintColor="#20EFF4"
                    />
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.infoText}>Current moisture: </Text>
                    <Text style={styles.valueText}>{props.device.currentMoisture} %</Text>
                </View>
                
                
                <View style={styles.infoCol}>
                    <View style={styles.line}>
                        <Text style={styles.infoText}>Manual watering amount: </Text>
                        <Text style={styles.valueText}>{props.device.pumpTime/10} s</Text>
                    </View>
                    
                    <Slider

                            value={props.device.pumpTime}
                            style={{ width: '100%', alignSelf: 'flex-end', paddingVertical: 8 }}
                            step={1}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#04ADE2"
                            maximumTrackTintColor="#635147"
                            onSlidingComplete={wateringTimeChanged}
                            thumbTintColor="#20EFF4"
                        />
                </View>

                <View style={styles.infoCol}>
                    <View style={styles.line}>
                        <Text style={styles.infoText}>Waterlevel: </Text>
                        <Text style={styles.valueText}>{props.device.waterLevel}</Text>
                    </View>
                    <Button title="Calibrate sensor" onPress={onCalibratePressed}></Button>
                </View>
            </ScrollView>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'column',
        backgroundColor: '#2e8f2e',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    scrollView: {
        marginHorizontal: 0,

        flex: 1,
        maxWidth: 500,
        width: '100%',

        padding: 12,

        resizeMode: 'contain',


    },
    line: {
        flexDirection: 'row',

        maxWidth: 500,
        width: '100%',
        
        paddingHorizontal: 0,
        paddingVertical: 0,

        margin: 10,
        
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',

    },
    infoLine: {
        flex: 1,
        flexDirection: 'row',

        maxWidth: 500,
        width: '100%',
        maxHeight: 50,

        paddingHorizontal: 24,
        paddingVertical: 12,
        marginHorizontal: 0,
        marginVertical: 10,

        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',

        borderRadius: 20,
        backgroundColor: '#B2AC88',
    },
    infoCol: {
        flex: 1,
        flexDirection: 'column',

        maxWidth: 500,
        width: '100%',


        paddingHorizontal: 24,
        paddingVertical: 10,
        marginHorizontal: 0,
        marginVertical: 10,

        alignItems: 'center',
        justifyContent: 'flex-start',

        borderRadius: 20,
        backgroundColor: '#B2AC88',
        },
    infoText: {
    
            fontFamily: 'comic-sans',
            fontSize: 20,
    
        textAlign: 'left',
    },
    valueText: {
        fontSize: 20,
        fontFamily: 'comic-sans bold',
        textAlign: 'right',
    },
    input: {
        width: 'auto',
        fontFamily: 'comic-sans bold',
        maxWidth: 200,
        fontSize: 20,
        textAlign: 'right',
    },
});