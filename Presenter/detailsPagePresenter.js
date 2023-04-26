import React from 'react';
import { useRef } from 'react';
import {Text} from 'react-native';
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';
import DetailsView from '../Views/detailsView';

export default function DetailsPage({route, navigation}) {
    const model = useContext(ModelContext);
    const {itemId} = route.params;
    const index = useRef(0);
    React.useEffect(wasCreatedACB, []);
    const [device, copyDevice] = React.useState(model.devices[index.current]);
    
    function observerACB() {
        copyDevice({...model.devices[index.current]})
    }

    function wasCreatedACB() {
        model.addObserver(observerACB);
        index.current = model.devices.findIndex(findIndexACB);

        function findIndexACB(test){
            return test.id == itemId;
        }

        function isTakenDownACB() {
            model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }

    function changeTargetMoisture(moistureLevel) {
        model.setMoistureLevel(moistureLevel , itemId)
    }

    function changeName(name) {
        model.setName(name, itemId)
    }
    
    return(
        <DetailsView
            device = {model.devices[index.current]}
            onMoistChanged = {changeTargetMoisture}
            onNameChanged = {changeName}

        ></DetailsView>)
}
