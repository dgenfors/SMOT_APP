class Model
{
    constructor(dataobject){
        this.isLoggedIn = false;
        this.observers = [];
        /*this.devices = [{id: 1, name: "tomat", currentMoisture: 35, moistureLevel: 30, waterLevel: 20, pump:0}, {id: 2, name:"Ros", currentMoisture: 20, moistureLevel:20, waterLevel: 40, pump:0, pumpTime: 0, pumpState: 0},
        {id: 3, name: "tomat", currentMoisture: 35, moistureLevel: 30, waterLevel: 20, pump:0}, {id: 4, name:"Ros", currentMoisture: 20, moistureLevel:20, waterLevel: 40, pump:0 },
        {id: 5, name: "tomat", currentMoisture: 35, moistureLevel: 30, waterLevel: 20, pump:0}, {id: 6, name:"Ros", currentMoisture: 20, moistureLevel:20, waterLevel: 40, pump:0 }]*/
        this.devices = dataobject;

    }
    addObserver(obs){
        this.observers = [...this.observers, obs];
    }
    removeObserver(obsToRemove){
        function sameObsCB(obs){
            if(obs.name !== obsToRemove.name){
                return true;
            }
        }
        this.observers = this.observers.filter(sameObsCB)
    }
    notifyObservers(payload){
        function invokeObserverACB(obs){
            obs(payload); 
        }    
        try{
            this.observers.forEach(invokeObserverACB)
        }catch(err){console.log(err)}
    }

    addData(dataToAdd){
        if(dataToAdd === undefined){
            console.error("undefined data");
        }
        if(dataToAdd === this.dataArray){
            return;
        }
        this.dataArray = dataToAdd;
        this.notifyObservers({dataArray: dataToAdd});
    }
    setName(name, id){
        if(name === undefined){
            console.error("undefined data");
        }
        function findIndex(test){
            return test.id == id;
        }

        const index = this.devices.findIndex(findIndex);
        if(name=== this.devices[index].name){
            return;
        }
        this.devices[index].name = name;
        this.notifyObservers({nameChanged: name, deviceID: id, test: this.devices[index]});
    }

    setMoistureLevel(moistureLevel , id){
        if(moistureLevel === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(moistureLevel === this.devices[index].moistureLevel){
            console.log("matches same level")
            return;
        }
        this.devices[index].moistureLevel = moistureLevel;
        this.notifyObservers({setMoistureLevel: moistureLevel , deviceID: id, test: this.devices[index] });
    }
    setWaterLevel(waterLevel , id){
        if(waterLevel === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(waterLevel === this.devices[index].waterLevel){
            console.log("matches same level")
            return;
        }
        this.devices[index].waterLevel = waterLevel;
        this.notifyObservers({setWaterLevel: waterLevel , deviceID: id, test: this.devices[index] });
    }
    setCurrentMoisture(moisture , id){
        if(moisture === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(moisture === this.devices[index].currentMoisture){
            console.log("matches same level")
            return;
        }
        this.devices[index].currentMoisture = moisture;
        this.notifyObservers({setCurrentMoisture: moisture , deviceID: id, test: this.devices[index] });
    }
    setPump(pump , id){
        if(pump === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(pump === this.devices[index].pump){
            console.log("matches same level")
            return;
        }
        this.devices[index].pump = pump;
        this.notifyObservers({setPump: pump , deviceID: id, test: this.devices[index] });
    }

    setPumpTime(time , id){
        if(time === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(time === this.devices[index].pumpTime){
            console.log("matches same level")
            return;
        }
        this.devices[index].pumpTime = time;
        this.notifyObservers({setPumpTime: time , deviceID: id, test: this.devices[index] });
    }

    setPumpState(state , id){
        if(state === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(state === this.devices[index].pumpState){
            console.log("matches same level")
            return;
        }
        this.devices[index].pumpState = state;
        this.notifyObservers({setPumpState: state , deviceID: id, test: this.devices[index] });
    }

    setCalibrationState(state , id){
        if(state === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(state === this.devices[index].calibration){
            console.log("matches same level", state)
            return;
        }
        this.devices[index].calibration = state;
        this.notifyObservers({setCalibrationState: state , deviceID: id, test: this.devices[index] });
    }

    setAutowateringState(state, id) {
        if(state === undefined){
            console.error("undefined data");
            return;
        }
        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        if(state === this.devices[index].autoWateringState){
            console.log("matches same level", state)
            return;
        }
        this.devices[index].autoWateringState = state;
        console.log("Autowatering set to:", state);
        this.notifyObservers({setAutowateringState: true , actualState: state , deviceID: id, test: this.devices[index] });
    }

    setLoginStatus(loginStatus){
        if(loginStatus === true){
            this.isLoggedIn = true;
        }else if(loginStatus === false){
            this.isLoggedIn = false;
        }
    }
    setPlantInfo(plantData, id){
        if(id === undefined)id = 1;
        if(plantData === undefined)return;

        function findIndex(test){
            return test.id == id;
        }
        const index = this.devices.findIndex(findIndex);
        this.devices[index].plant = plantData;
        this.notifyObservers({setPlant: plantData, deviceID: id, test:this.devices[index]})

    }
}
export default Model;