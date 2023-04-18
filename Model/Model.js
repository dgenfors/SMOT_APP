
class Model
{
    constructor(dataArray){
        this.dataArray = dataArray;
        this.observers = [];

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
        console.log("dataToAdd:",dataToAdd)
        if(dataToAdd === undefined){
            console.error("undefined data");
        }
        this.notifyObservers({dataArray: dataToAdd});
    
        this.dataArray = dataToAdd;
    }
}
export default Model;