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

    function frontObserverACB1() {
        copyDeviceList([...model.devices])
        //console.log("frontDeviceList",deviceList);
    }

    function wasCreatedACB() {
        model.addObserver(frontObserverACB1);
        function isTakenDownACB() {
            model.removeObserver(frontObserverACB1);
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
    function runPumpACB(id) {
        function findIndex(test){
            return test.id == id;
        }
        const index = model.devices.findIndex(findIndex);
        if(model.devices[index].pump === 1){
            model.setPump(2,id);
        }else model.setPump(1,id);
        
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
    )}
