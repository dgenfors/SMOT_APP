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
    React.useEffect(wasCreatedACB, []);
    const [device, copyDevice] = React.useState(model.devices[index]);

    const atTime = 15;
    const data = useRef(getData(atTime));
    
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
    function getData(atTime) {
     
        //Load all data in useful format
        const timeStampHour = device.dataTimeStamp.map(getTimeStampHour)
        const moistureData = device.moistureData.map(getMositureData)
        const timeStampMin = device.dataTimeStamp.map(getTimeStampMinute)
        
        
        //Sort by specified time (param)
        
        const array1 = [...timeStampHour];
        const array2 = [...moistureData];
        //filterDataAtTime();
        
        
        //Make X-axis evenly spaced by removing data from the same time (hours)
        const labeltest = filterLabelBest(timeStampHour)
        filterData();
       
        


        //Add a target moisture line. Has to be done last to match number of data entires displayed
        const currentTarget = moistureData.map(justCopyTarget)

        

        function justCopyTarget(element) {
            return model.devices[index].moistureLevel;
        }

        function getMositureData(param) {
            return param;
        }
        function getTimeStampHour(param){
            return new Date(param).toString().substring(16,18);
        }function getTimeStampMinute(param){
            return new Date(param).toString().substring(19,21);
        }
        function filterByTime(){
        }

        function filterLabelBest(data){
            function arrayContains(array, element) {
                for (let index = 0; index < array.length; index++) {
                    if(array[index] == element)
                        return true;
                }
                return false;
            }

            var result = [data[0]]
            var helper = [data[0]]
            for (let i = 0; i < data.length; i++) {
                if(arrayContains(helper, data[i])) {
                    result.push("");
                }
                else {
                    helper.push(data[i]);
                    result.push(data[i]);
                }
                
            }
            return result;
        }
        function filterDataAtTime() {
            while(true){
                function theBestIndexFinder(param){
                    return param != atTime;
                }
                const dex = timeStampHour.findIndex(theBestIndexFinder)
                if(dex >-1){
                    timeStampHour.splice(dex,1)
                    moistureData.splice(dex,1)
                }else break;
            }
        }

        function filterData() {
            while(true){
                function theBestIndexFinder(param){
                    return param === "";
                }
                const dex = labeltest.findIndex(theBestIndexFinder)
                if(dex >-1){
                    moistureData.splice(dex,1)
                    labeltest.splice(dex,1)
                }else break;
            }
        }

        const data = {
            labels: labeltest,
            datasets: [
              {
                data: moistureData,
                color: (opacity = 1) => `rgba(0, 0, 255, ${1})`, // optional
                strokeWidth: 2 // optional
              }
              ,
              {
                data: currentTarget,
                color: (opacity = 1) => `rgba(0, 0, 0, ${1})`, // optional
                strokeWidth: 2 // optional
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
