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
    const now = new Date();
    const [device, copyDevice] = React.useState(model.devices[index]);
    const [selectedTime, setSelectedTime] = React.useState("Last hour")
    const [data, setData ] = React.useState(getData("Last hour"))
    //const data = useRef(getData(selectedTime));
    
    function HistObserverACB() {
        copyDevice({...model.devices[index]})
    }

    function findIndexACB(test){
        return test.id == itemId;
    }

    function wasCreatedACB() {
        model.addObserver(HistObserverACB);     

        function isTakenDownACB() {
            model.removeObserver(HistObserverACB);
        }
        return isTakenDownACB;
    }

    function setTime(param){
        setSelectedTime(param)
        setData(getData(param))
        
    }
    function getData(atTime) {
        const currentTime = new Date();
        var paramTime = null;
        //Load all data in useful format
        const timeStampHour = device.dataTimeStamp.map(getTimeStampHour)
        var moistureData = device.moistureData.map(getMositureData)
        var currentTimeList = []
        var labeltest;

        function setTimeValues(paramTime){
            const firstIndex = timeStampHour.findIndex(element => element <= currentTime && element >= paramTime)
            const lastIndex = timeStampHour.findLastIndex(element => element <= currentTime && element >= paramTime)
            currentTimeList = timeStampHour.filter(element => element <= currentTime && element >= paramTime)
            moistureData = moistureData.slice(firstIndex,(lastIndex+1))
        }
        if(atTime == "Last hour"){
            paramTime = new Date(currentTime.getTime() - (1000*60*60));
            /*const firstIndex = timeStampHour.findIndex(element => element <= currentTime && element >= paramTime)
            const lastIndex = timeStampHour.findLastIndex(element => element <= currentTime && element >= paramTime)
            currentTimeList = timeStampHour.filter(element => element <= currentTime && element >= paramTime)
            moistureData = moistureData.slice(firstIndex,lastIndex)*/
            setTimeValues(paramTime)
            labeltest = currentTimeList.map(element => element.toString().substring(16,21))
        }else if(atTime == "Last 24 hours"){
           paramTime = new Date(currentTime.getTime() - (1000*60*60*24))
           /*const firstIndex = timeStampHour.findIndex(element => element <= currentTime && element >= paramTime)
            const lastIndex = timeStampHour.findLastIndex(element => element <= currentTime && element >= paramTime)
            currentTimeList = timeStampHour.filter(element => element <= currentTime && element >= paramTime)
            moistureData = moistureData.slice(firstIndex,lastIndex)*/
            setTimeValues(paramTime)
           labeltest = currentTimeList.map(element => element.toString().substring(16,18))
           labeltest = filterLabelBest(labeltest)
           filterData()
        }else if(atTime == "Last week"){
            paramTime = new Date(currentTime.getTime() - (1000*60*60*336));
            /*const firstIndex = timeStampHour.findIndex(element => element <= new Date() && element >= paramTime)
            const lastIndex = timeStampHour.findLastIndex(element => element <= new Date() && element >= paramTime)
            currentTimeList = timeStampHour.filter(element => element <= new Date() && element >= paramTime)
            moistureData = moistureData.slice(firstIndex,lastIndex)*/
            setTimeValues(paramTime)
            labeltest = currentTimeList.map(element => element.toString().substring(4,10))
            labeltest = filterLabelBest(labeltest)
            filterData()
        }else if(atTime =="Demo"){
            paramTime = new Date(currentTime.getTime() - (1000*60*60*91));
            const demoTime = new Date(currentTime.getTime() -(1000*60*60*70) )
            const firstIndex = timeStampHour.findIndex(element => element <= demoTime && element >= paramTime)
            const lastIndex = timeStampHour.findLastIndex(element => element <= demoTime && element >= paramTime)
            currentTimeList = timeStampHour.filter(element => element <= demoTime && element >= paramTime)
            moistureData = moistureData.slice(firstIndex,(lastIndex+1))
            labeltest = currentTimeList.map(element => element.toString().substring(16,18))
            labeltest = filterLabelBest(labeltest)
            filterData()
        }
        
        
       
        
        
        //Make X-axis evenly spaced by removing data from the same time (hours)
        /*var labeltest =[];
        if(atTime == "Last hour")labeltest = [paramTime.toString().substring(16,21),currentTime.toString().substring(16,21)]*/
        //filterLabelBest(sliced)
        //filterData();

        console.log("historyPresenter",moistureData,labeltest)
        


        //Add a target moisture line. Has to be done last to match number of data entires displayed
        const currentTarget = moistureData.map(justCopyTarget)

        

        function justCopyTarget(element) {
            return model.devices[index].moistureLevel;
        }

        function getMositureData(param) {
            return param;
        }
        function getTimeStampHour(param){
            return new Date(param)
        }
        function getTimeStampMinute(param){
            return new Date(param).toString().substring(19,21);
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
                strokeWidth: 3// optional
              }
              ,
              {
                data: currentTarget,
                color: (opacity = 1) => `rgba(0, 150, 0, ${1})`, // optional
                strokeWidth: 3 // optional
              }
            ],
            legend: ["Moisture", "Moisture target"] // optional
          };
        return data;
    }

    
    return(
        <HistoryView
            data = {data}
            setTime = {setTime}
        ></HistoryView>)
}
