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
        if(model.devices[index].pump === true || model.devices[index].pumpState === true){
            console.log("pump is already on")
            //model.setPump(false,id); //gör inget om pumpen redan är tillsagd att starta
        }else model.setPump(1,id);
        
    }
    function isPumpPumping(id){
        function findIndex(test){
            return test.id == id;
        }
        const index = model.devices.findIndex(findIndex);
        if(model.devices[index].pumpState === true) return 1;
        else return 0;
    }

    function navigateToDetails(id) {
        navigation.navigate("More info", {itemId: id});
    }
    function navigateToSearch() {
        navigation.navigate("searchbar");
    }

    return (
        <FrontpageView
                devices = {deviceList}
                runPump = {runPumpACB}
                navToDetails = {navigateToDetails}
                isPumpPumping = {isPumpPumping}
                navToSearch={navigateToSearch}
            >
            </FrontpageView>
    )}
