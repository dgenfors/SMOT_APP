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
        if(atTime == "Last hour"){
            paramTime = new Date(currentTime.getTime() - (1000*60*60));
            const firstIndex = timeStampHour.findIndex(element => element <= currentTime && element >= paramTime)
            const lastIndex = timeStampHour.findLastIndex(element => element <= currentTime && element >= paramTime)
            currentTimeList = timeStampHour.filter(element => element <= currentTime && element >= paramTime)
            moistureData = moistureData.slice(firstIndex,lastIndex)
        }else if(atTime == "Last 24 hours"){
           paramTime = new Date(currentTime.getTime() - (1000*60*60*24))
        }else if(atTime == "Last week"){
            paramTime = new Date(currentTime.getTime() - (1000*60*60));
            const firstIndex = timeStampHour.findIndex(element => element <= new Date() && element >= new Date(currentTime.getTime() - (1000*60*60*336)))
            const lastIndex = timeStampHour.findLastIndex(element => element <= new Date() && element >= new Date(currentTime.getTime() - (1000*60*60*336)))
            currentTimeList = timeStampHour.filter(element => element <= new Date() && element >= new Date(currentTime.getTime() - (1000*60*60*336)))
            moistureData = moistureData.slice(firstIndex,lastIndex)
        }
        
        
       
        
        
        //Make X-axis evenly spaced by removing data from the same time (hours)
        /*var labeltest =[];
        if(atTime == "Last hour")labeltest = [paramTime.toString().substring(16,21),currentTime.toString().substring(16,21)]*/
        const labeltest = currentTimeList.map(element => element.toString().substring(16,21))//filterLabelBest(sliced)
        //filterData();

        console.log(moistureData,labeltest)
       debugger
        


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
            data = {data}
            setTime = {setTime}
        ></HistoryView>)
}
