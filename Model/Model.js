
class Model
{
    constructor(dataArray){
        this.isLoggedIn = false;
        this.dataArray = dataArray;
        this.observers = [];
        this.moistureLevel;

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

    setMoisture(moistureLevel){
        if(moistureLevel === undefined){
            console.error("undefined data");
        }
        if(moistureLevel === this.moistureLevel){
            return;
        }
        this.moistureLevel= moistureLevel;
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