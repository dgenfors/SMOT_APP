import React from 'react';
import { useRef } from 'react';
import {Text} from 'react-native';
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';
import DetailsView from '../Views/detailsView';
import HistoryView from '../Views/historyView';

export default function HistoryPage({route, navigation}) {
    const model = useContext(ModelContext);
    const {itemId} = route.params;
    const index = useRef(model.devices.findIndex(findIndexACB));
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
        index.current = model.devices.findIndex(findIndexACB);

        function findIndexACB(test){
            return test.id == itemId;
        }

        const data = 

        function isTakenDownACB() {
            model.removeObserver(DetsObserverACB);
        }
        return isTakenDownACB;
    }

    function getData() {
        const data = {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            legend: ["Rainy Days"] // optional
          };
        return data;
    }

   
    
    return(
        <HistoryView
            data = {data}
        ></HistoryView>)
}
