import React from 'react';
import { useRef } from 'react';
import {Text} from 'react-native';
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';
import DetailsView from '../Views/detailsView';
import HistoryView from '../Views/historyView';

export default function HistoryPage(props) {
    const model = useContext(ModelContext);
    const index = useRef(props.userData.itemId);
    const data = useRef(getData());
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

        function isTakenDownACB() {
            model.removeObserver(DetsObserverACB);
        }
        return isTakenDownACB;
    }
    function getData() {
        const labeltest = ["January", "February", "mars", "April", "May", "June"]
        const moistureData = [20, 45, 28, 80, 99, 43]
        const currentTarget = moistureData.map(justCopyTarget)

        function justCopyTarget(element) {
            function findIndex(test){
                return test.id == index.current;
            }
            const indx = model.devices.findIndex(findIndex);
        
            return model.devices[indx].moistureLevel;
        }

        function getMositureData() {
            Object.values(model.devices[index.current]);
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
