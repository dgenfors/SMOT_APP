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
        if(payload.setMoistureLevel){
            console.log("UpdateFirebase:",payload.setMoistureLevel);
            firebase.database().ref(auth.currentUser.uid+"/devices/"+payload.deviceID+"/").set(payload.test);
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
    firebase.database().ref(auth.currentUser.uid+"/").on("value", 
    function numberAddedInFirebaseACB(firebaseData){
        if(model.devices[0].moistureLevel === firebaseData.val()){
            console.log("finns i modelen")
            return;
        } 
        
       model.setMoistureLevel(firebaseData.val().devices[1].moistureLevel);
        
    }
    );
}

export {updateFirebaseFromModel, updateModelFromFirebase};