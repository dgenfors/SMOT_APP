import React from "react";
import FrontpageView from "../Views/frontpageView";
import { useContext } from 'react';
import { ModelContext } from "../ModelContext";
import { StyleSheet, Text, View } from 'react-native';

export default
    function FrontPage({navigation}) {
    const model = useContext(ModelContext);
    const [deviceList, copyDeviceList] = React.useState(model.devices);
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        copyDeviceList([...model.devices])
        console.log(deviceList);
    }

    function wasCreatedACB() {
        model.addObserver(observerACB);
        function isTakenDownACB() {
            model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }
/*
    function deviceListChangedACB() {
        shortDevices = model.devices.map(shortenObjectsCB);

        function shortenObjectsCB(obj) {
            return {id: obj.id, name: obj.name, moisture: obj.currentMoisture, waterlevel: obj.waterLevel};
        }
    }
*/
    function runPumpACB() {
        console.log("i'm watering! :)")
        model.setName("gurka",1);
    }

    function navigateToDetails(id) {
        navigation.navigate("Details", {itemId: id});
    }

    return (
            <FrontpageView
                devices = {deviceList}
                runPump = {runPumpACB}
                navToDetails = {navigateToDetails}
            >
            </FrontpageView>
    )
}
