
class Model
{
    constructor(dataobject){
        this.isLoggedIn = false;
        this.observers = [];
        this.devices = [{id: 1, name: "tomat", currentMoisture: 35, moistureLevel: 30, waterLevel: 20}, {id: 2, name:"Ros", currentMoisture: 20, moistureLevel:20, waterLevel: 40 }]

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

    setMoisture(moistureLevel){
        const test = 5;
        if(moistureLevel === undefined){
            console.error("undefined data");
            return;
        }
        if(moistureLevel === this.devices[0].moistureLevel){
            return;
        }
        this.devices[0].moistureLevel = moistureLevel;
        this.notifyObservers({setMoisture: moistureLevel});
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