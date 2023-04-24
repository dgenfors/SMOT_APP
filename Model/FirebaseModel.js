import {firebaseConfig, auth} from "../firebaseconfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
firebase.initializeApp(firebaseConfig);

function updateFirebaseFromModel(model){
    function firebaseObserverACB(payload){
        if(!auth.currentUser){
            return
        }

        if(payload.dataArray){
            console.log("UpdateFirebase:",payload.dataArray);
            firebase.database().ref(auth.currentUser.uid+"/dataNumber/").set(payload.dataArray);
        }
        if(payload.setMoisture){
            console.log("UpdateFirebase:",payload.setMoisture);
            firebase.database().ref(auth.currentUser.uid+"/moistureLevel/").set(payload.setMoisture);
        }
        
    }
    model.addObserver(firebaseObserverACB);
    return;
}
function updateModelFromFirebase(model){
    if(!auth.currentUser){
        return;
    }
    firebase.database().ref(auth.currentUser.uid+"/dataNumber").on("value", 
    function numberAddedInFirebaseACB(firebaseData){
        if(model.dataArray === firebaseData.val()){
            console.log("finns i modelen")
            return;
        } 
        model.addData(firebaseData.val());
        
    }
    );
    firebase.database().ref(auth.currentUser.uid+"/moistureLevel").on("value", 
    function numberAddedInFirebaseACB(firebaseData){
        if(model.moistureLevel === firebaseData.val()){
            console.log("finns i modelen")
            return;
        } 
        model.setMoisture(firebaseData.val());
        
    }
    );
}

export {updateFirebaseFromModel, updateModelFromFirebase};