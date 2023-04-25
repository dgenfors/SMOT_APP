class Model
{
    constructor(dataobject){
        this.isLoggedIn = false;
        this.observers = [];
        /*this.devices = [{id: 1, name: "tomat", currentMoisture: 35, moistureLevel: 30, waterLevel: 20, pump:0}, {id: 2, name:"Ros", currentMoisture: 20, moistureLevel:20, waterLevel: 40, pump:0 },
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
    setName(name){
        if(name === undefined){
            console.error("undefined data");
        }
        if(name=== this.devices[0].name){
            return;
        }
        this.devices[0].name = name;
        this.notifyObservers({nameChanged: name});
    }

    setMoistureLevel(moistureLevel , id){
        if(moistureLevel === undefined){
            console.error("undefined data");
            return;
        }
       

        function hasSameId(test){
            return test.id == id;
        }
        function findIndex(test){
            return test == hold;
        }
        const hold = this.devices.filter(hasSameId)[0]
        const index = this.devices.findIndex(findIndex);

        if(moistureLevel === this.devices[index].moistureLevel){
            console.log("matches same level")
            return;
        }
        this.devices[index].moistureLevel = moistureLevel;
        this.notifyObservers({setMoistureLevel: moistureLevel , deviceID: id, test: this.devices[index] });
    }

    setLoginStatus(loginStatus){
        if(loginStatus === true){
            this.isLoggedIn = true;
        }else if(loginStatus === false){
            this.isLoggedIn = false;
        }
    }
}
export default Model;