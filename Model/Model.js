
class Model
{
    constructor(dataArray){
        this.isLoggedIn = false;
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
        if(dataToAdd === undefined){
            console.error("undefined data");
        }
        this.dataArray = dataToAdd;
        this.notifyObservers({dataArray: dataToAdd});
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