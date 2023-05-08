import React from 'react';
import { useRef } from 'react';
import {Text} from 'react-native';
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';
import DetailsView from '../Views/detailsView';

export default function DetailsPage({route, navigation}) {
    const model = useContext(ModelContext);
    const {itemId} = route.params;
    const index = useRef(model.devices.findIndex(findIndexACB));
    React.useEffect(wasCreatedACB, []);
    const [device, copyDevice] = React.useState(model.devices[index.current]);
    
    function DetsObserverACB() {
        copyDevice({...model.devices[index.current]})
    }

    function findIndexACB(test){
        return test.id == itemId;
    }

    function wasCreatedACB() {
        model.addObserver(DetsObserverACB);
        index.current = model.devices.findIndex(findIndexACB);

        function findIndexACB(test){
            return test.id == itemId;
        }

        function isTakenDownACB() {
            model.removeObserver(DetsObserverACB);
        }
        return isTakenDownACB;
    }

    function changeTargetMoisture(moistureLevel) {
        model.setMoistureLevel(moistureLevel , itemId)
    }

    function changeName(name) {
        model.setName(name, itemId)
    }

    function changeWateringTime(time) {
        model.setPumpTime(time , itemId)
    }

    function sendCalibration(state) {
        model.setCalibrationState(state, itemId);
    }

    function setAutoWatering(state) {
        model.setAutowateringState(state, itemId);
    }
    
    return(
        <DetailsView
            device = {model.devices[index.current]}
            onMoistChanged = {changeTargetMoisture}
            onNameChanged = {changeName}
            onWateringTimeChanged = {changeWateringTime}
            onCalibrate = {sendCalibration}
            onAutowateringToggled = {setAutoWatering}

        ></DetailsView>)
}
