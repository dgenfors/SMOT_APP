
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Switch, Platform } from 'react-native';

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

    function LabelChanged(event) {
        if (event.nativeEvent.text != "")
            props.onLabelChanged(event.nativeEvent.text);
        else
            props.onLabelChanged("Unnamed");
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
                <View style={styles.infoLine}>
                    <Text style={styles.infoText}>Label: </Text>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={LabelChanged}
                        placeholder={props.device.label}
                        maxLength={30}
                    ></TextInput>
                </View>
                <View style={styles.infoLine}>
                        <Text style={styles.infoText} >AutoWatering</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={props.device.autoWateringState ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={ontoggleSwitch}
                            value={props.device.autoWateringState}
                        />
                    </View>
                <View style={styles.infoCol}>
                    <View style={styles.line}>
                        <Text style={styles.infoText}>Prefered moisturelevel: </Text>
                        <Text style={styles.valueText}>{props.device.moistureLevel} %</Text>
                    </View>
                    <View style={styles.sliderView}>
                        <Slider
                        value={props.device.moistureLevel}
                        style={{ width: '100%'}}
                        step={10}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#04ADE2"
                        maximumTrackTintColor="#635147"
                        onSlidingComplete={onMoistureTargetChanged}
                        thumbTintColor="#20EFF4"
                        />
                    </View>
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
                    <View style={styles.sliderView}>
                    <Slider

                            value={props.device.pumpTime}
                            style={{ width: '100%', }}
                            step={1}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#04ADE2"
                            maximumTrackTintColor="#635147"
                            onSlidingComplete={wateringTimeChanged}
                            thumbTintColor="#20EFF4"
                        />
                    </View>
                </View>

                <View style={styles.infoCol}>
                    <View style={styles.line}>
                        <Text style={styles.infoText}>Waterlevel: </Text>
                        <Text style={styles.valueText}>{props.device.waterLevel} cm</Text>
                    </View>
                </View>
                {!props.device.plant ? (<View style={styles.infoLine}><Text>Add a plant to your device to get more information!</Text></View>):null}
                {props.device.plant ? (<View style={styles.infoCol}>
                    <Text style={styles.infoText}>Plant common name:</Text>
                    <Text style={styles.infoText}>{props.device.plant.common_name}</Text>
                </View>): null}
                {props.device.plant ?(<View style={styles.infoCol}>
                    <Text style={styles.infoText}>Recommended water frequency:</Text>
                    <Text style={styles.infoText}>{props.device.plant.watering}</Text>
                </View>):null}
                {props.device.plant ? (<View style={styles.infoCol}>
                    <Text style={styles.infoText}>Recommended sunlight:</Text>
                    <Text style={styles.infoText}>{props.device.plant.sunlight[0]}</Text>
                </View>) : null}
                
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
        flex: 0,
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
        maxHeight: 56,
        

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
        paddingVertical: 8,
        marginHorizontal: 0,
        marginVertical: 10,

        
        alignItems: 'center',
        justifyContent: 'center',

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
        adjustsFontSizeToFit: true,
        width: 'auto',
        maxWidth: 180,
        fontFamily: 'arial',
        fontSize: 20,
        textAlign: 'right',
    },
    sliderView: {
        flexDirection: 'row',

        maxWidth: 500,
        width: '100%',
        
        padding: 8,

        margin: 10,
        backgroundColor: '#a19b77',
        borderRadius: 16,
        
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',
    }
});