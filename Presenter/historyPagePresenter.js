import React from 'react';
import { useRef } from 'react';
import {Text} from 'react-native';
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';
import DetailsView from '../Views/detailsView';
import HistoryView from '../Views/historyView';

export default function HistoryPage(props) {
    const model = useContext(ModelContext);



    function findIndex(test){
        return test.id == props.userData.itemId;
    }
    const index = model.devices.findIndex(findIndex);
    //const index = useRef(props.userData.itemId);
    
    
    React.useEffect(wasCreatedACB, []);
    const [device, copyDevice] = React.useState(model.devices[index]);
    const data = useRef(getData());
    
    function DetsObserverACB() {
        copyDevice({...model.devices[index]})
    }

    function findIndexACB(test){
        return test.id == itemId;
    }

    function wasCreatedACB() {
        model.addObserver(DetsObserverACB);     

        function isTakenDownACB() {
            model.removeObserver(DetsObserverACB);
        }
        return isTakenDownACB;
    }
    function getData() {
        const labeltest = ["January", "February", "Mars", "April", "May", "June"]
        const timeStamp = device.dataTimeStamp.map(getTimeStamp)
        const moistureData = getMositureData()
        const currentTarget = moistureData.map(justCopyTarget)

        function justCopyTarget(element) {
            return model.devices[index].moistureLevel;
        }

        function getMositureData() {
            return device.moistureData;
        }
        function getTimeStamp(param){
            return (new Date(param).toString());
        }

        const data = {
            labels: labeltest,
            datasets: [
              {
                data: moistureData,
                color: (opacity = 1) => `rgba(0, 0, 200, ${opacity})`, // optional
                strokeWidth: 5 // optional
              }
              ,
              {
                data: currentTarget,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 5 // optional
              }
            ],
            legend: ["Moisture", "Moisture target"] // optional
          };
        return data;
    }

    
    return(
        <HistoryView
            data = {data.current}
        ></HistoryView>)
}
