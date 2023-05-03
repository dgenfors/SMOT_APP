
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

export default function DetailsView(props) {

    //console.log("propsDetail", props)

    function nameChanged(event) {
        console.log(event.nativeEvent.text);
        if(event.nativeEvent.text != "")
            props.onNameChanged(event.nativeEvent.text);
        else
            props.onNameChanged("Unnamed");
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
                    maxLength={20}
                ></TextInput>
            </View>
            <View style={styles.infoCol}>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Prefered moisturelevel: </Text>
                <Text style={styles.valueText}> {props.device.moistureLevel}</Text>
            </View>
                <Slider
                    value = {props.device.moistureLevel}
                    style={{ width: '100%', alignSelf: 'center'}}
                    step = {10}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#04ADE2"
                    maximumTrackTintColor="#635147"
                    onSlidingComplete = {onMoistureTargetChanged}
                    thumbTintColor="#20EFF4"
                />
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Current moisture: </Text>
                <Text style={styles.valueText}>{props.device.currentMoisture} %</Text>
            </View>
            <View style={styles.infoLine}>
                <Text style={styles.infoText}>Waterlevel: </Text>
                <Text style={styles.valueText}>{props.device.waterLevel}</Text>
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
        flex: 1,
        flexDirection: 'row',
        
        maxWidth: 500,
        width: '100%',
        
        paddingHorizontal: 24,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginVertical: 10,

        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        
        borderRadius: 20,
        backgroundColor: 'lightblue',
    },
    infoCol: {
        flex: 1,
        flexDirection: 'column',
        
        maxWidth: 500,
        width: '100%',
        
        paddingHorizontal: 24,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginVertical: 10,

        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        
        borderRadius: 20,
        backgroundColor: 'lightblue',
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
        maxWidth: 200,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});