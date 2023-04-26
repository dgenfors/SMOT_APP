
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
            <Text style={styles.infoText}>Target Moisture: {props.device.moistureLevel}</Text>
            <Slider
                value = {props.device.moistureLevel}
                style={{ width: 200, height: 20 }}
                step = {10}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#04ADE2"
                maximumTrackTintColor="#635147"
                onSlidingComplete = {onMoistureTargetChanged}
                thumbTintColor="#103B1D"
            />
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>current moisture: {props.device.currentMoisture}</Text>
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>waterLevel: {props.device.waterLevel}</Text>
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Your Prefered MoistureLevel: {props.device.moistureLevel}</Text>
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
        justifyContent: 'center',
    },
    infoLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 20,
        textAlign: 'left',
    },
    input: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
});