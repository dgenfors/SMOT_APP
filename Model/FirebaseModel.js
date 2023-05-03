import {firebaseConfig, auth} from "../firebaseconfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Model from "./Model";
firebase.initializeApp(firebaseConfig);



function firebaseModelPromise() {
    const REF = auth.currentUser.uid + "/devices/";
    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB)
  }

function makeBigPromiseACB(firebaseData) {
    //console.log("firebaseDataPromise", Object.values(firebaseData.val()));
    console.log("FIREBASEDATA:",firebaseData.val());
    if(!firebaseData.val())return new Model(null);

    return new Model(Object.values(firebaseData.val()))
}

function updateFirebaseFromModel(model){
    function firebaseObserverACB(payload){
        if(!auth.currentUser){
            return
        }
        if(payload.nameChanged){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test.name);
        }
        if(payload.setMoistureLevel){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test.setMoistureLevel);
        }
        if(payload.setWaterLevel){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test.setWaterLevel);
        }
        if(payload.setCurrentMoisture){
            
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test.setCurrentMoisture);
        }
        if(payload.setPump ===false || payload.setPump){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        if(payload.setPumpTime){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/").set(payload.test);
        }
        if(payload.setPumpState){
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
        if(!model.devices){
            return;
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
        if(!model.devices){
            return;
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
        if(!model.devices){
            return;
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
        if(!model.devices){
            return;
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
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSamePump).length == 1)return;
        model.setPump(firebaseData.val().pump, firebaseData.val().id); 
    }
    );

    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function pumpTimeFirebaseACB(firebaseData){
        function hasSamePumpTime(device){
            if(device.id === firebaseData.val().id){
                if(device.pumpTime== firebaseData.val().pumpTime)
                 return 1;
                }
        }
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSamePumpTime).length == 1)return;
        model.setPumpTime(firebaseData.val().pumpTime, firebaseData.val().id); 
    }
    );

    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function pumpTimeFirebaseACB(firebaseData){
        function hasSamePumpState(device){
            if(device.id === firebaseData.val().id){
                if(device.pumpState == firebaseData.val().pumpState)
                 return 1;
                }
        }
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSamePumpState).length == 1)return;
        model.setPumpState(firebaseData.val().pumpState, firebaseData.val().id); 
    }
    );
}

export {updateFirebaseFromModel, updateModelFromFirebase ,firebaseModelPromise};