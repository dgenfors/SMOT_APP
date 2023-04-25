import {firebaseConfig, auth} from "../firebaseconfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
firebase.initializeApp(firebaseConfig);

function updateFirebaseFromModel(model){
    function firebaseObserverACB(payload){
        if(!auth.currentUser){
            return
        }

        if(payload.nameChanged){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        if(payload.setMoistureLevel){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        if(payload.setWaterLevel){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        if(payload.setCurrentMoisture){
            
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        if(payload.setPump){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        
    }
    model.addObserver(firebaseObserverACB);
    return;
}
function updateModelFromFirebase(model){
    if(!auth.currentUser){
        return;
    }
    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function nameFirebaseACB(firebaseData){
        function hasSameName(device){
            if(device.id === firebaseData.val().id){
                if(device.name == firebaseData.val().name)
                 return 1;
                }
        }
        if(model.devices.filter(hasSameName).length == 1)return;
        model.setName(firebaseData.val().name, firebaseData.val().id); 
    }
    );

    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function moistureLevelFirebaseACB(firebaseData){
        function hasSameMoistureLevel(device){
            if(device.id === firebaseData.val().id){
                if(device.moistureLevel == firebaseData.val().moistureLevel)
                 return 1;
                }
        }
       if(model.devices.filter(hasSameMoistureLevel).length == 1)return;
        model.setMoistureLevel(firebaseData.val().moistureLevel, firebaseData.val().id); 
    }
    );
    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function currentMoistureInFirebaseACB(firebaseData){
        function hasSameMoistureLevel(device){
            if(device.id === firebaseData.val().id){
                if(device.currentMoisture == firebaseData.val().currentMoisture)
                 return 1;
                }
        }
        if(model.devices.filter(hasSameMoistureLevel).length == 1)return;
        model.setCurrentMoisture(firebaseData.val().currentMoisture, firebaseData.val().id); 
    }
    );
    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function waterLevelFirebaseACB(firebaseData){
        function hasSameWaterLevel(device){
            if(device.id === firebaseData.val().id){
                if(device.waterLevel== firebaseData.val().waterLevel)
                 return 1;
                }
        }
        if(model.devices.filter(hasSameWaterLevel).length == 1)return;
        model.setWaterLevel(firebaseData.val().waterLevel, firebaseData.val().id); 
    }
    );
    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function pumpFirebaseACB(firebaseData){
        function hasSamePump(device){
            if(device.id === firebaseData.val().id){
                if(device.pump== firebaseData.val().pump)
                 return 1;
                }
        }
        if(model.devices.filter(hasSamePump).length == 1)return;
        model.setPump(firebaseData.val().pump, firebaseData.val().id); 
    }
    );

    /*firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function numberAddedInFirebaseACB(firebaseData){
        function hasSameMoistureLevel(device){
           return -1;
        }
        if(model.devices.filter(hasSameMoistureLevel).length ==1)return;
        console.log("firebaseval",firebaseData.val())
        model.setMoistureLevel(firebaseData.val().moistureLevel, firebaseData.val().id); 
    }
    );*/
}

export {updateFirebaseFromModel, updateModelFromFirebase};