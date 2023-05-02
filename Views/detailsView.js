
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

export default function DetailsView(props) {

    //console.log("propsDetail", props)

    function nameChanged(event) {
        props.onNameChanged(event.nativeEvent.text);
    }

    function onMoistureTargetChanged(value) {
        props.onMoistChanged(value);
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Device name: </Text>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={nameChanged}
                    placeholder={props.device.name}
                ></TextInput>
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Target moisture: </Text>
                <Text style={styles.valueText}> {props.device.moistureLevel}</Text>
            </View>
            <View style={styles.infoLine}>
                <Slider
                    value = {props.device.moistureLevel}
                    style={{ width: '100%', alignSelf: 'center'}}
                    step = {10}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#04ADE2"
                    maximumTrackTintColor="#635147"
                    onSlidingComplete = {onMoistureTargetChanged}
                    thumbTintColor="#103B1D"
                />
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>current moisture: </Text>
                <Text style={styles.valueText}>{props.device.currentMoisture} %</Text>
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Waterlevel: </Text>
                <Text style={styles.valueText}>{props.device.waterLevel}</Text>
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Your prefered moisturelevel: </Text>
                <Text style={styles.valueText}>{props.device.moistureLevel}</Text>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#9dc183',
        alignItems: 'center',
    },
    infoLine: {
        padding: 24,
        flex: 1,
        flexDirection: 'row',
        maxWidth: 500,
        width: '100%',
        alignItems: 'center',
        alignContent: 'space-between',
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    infoCol: {
        flex: 1,
        flexDirection: 'column',
        width: 400,
        alignItems: 'center',
        alignContent: 'space-between',
        
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    infoText: {
        fontSize: 20,
        textAlign: 'left',
    },
    valueText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    input: {
        width: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});