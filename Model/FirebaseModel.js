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
    if(!firebaseData.val())return new Model(null);

    return new Model(Object.values(firebaseData.val()))
}

function updateFirebaseFromModel(model){
    function firebaseObserverACB(payload){
        if(!auth.currentUser){
            return
        }
        if(payload.nameChanged){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/name").set(payload.nameChanged);
        }
        if(payload.setMoistureLevel){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/moistureLevel").set(payload.setMoistureLevel);
        }
        if(payload.setWaterLevel){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/waterLevel").set(payload.setWaterLevel);
        }
        if(payload.setCurrentMoisture){
            
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/currentMoisture").set(payload.setCurrentMoisture);
        }
        if(payload.setPump ===false || payload.setPump){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/pump").set(payload.setPump);
        }
        if(payload.setPumpTime){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/pumpTime").set(payload.setPumpTime);
        }
        if(payload.setPumpState){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/pumpState").set(payload.setPumpState);
        }
        if("setAutowateringState" in payload){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/autoWateringState").set(payload.actualState);
        }
        if(payload.setPlant){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/plant").set(payload.setPlant);
        }
        if(payload.labelChanged){
            firebase.database().ref(auth.currentUser.uid+"/devices/"+"device"+payload.deviceID+"/label").set(payload.labelChanged);
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
    function labelFirebaseACB(firebaseData){
        function hasSameLabel(device){
            if(device.id === firebaseData.val().id){
                if(device.label == firebaseData.val().label)
                 return 1;
                }
        }
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSameLabel).length == 1)return;
        model.setLabel(firebaseData.val().label, firebaseData.val().id); 
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


    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function AutoWateringFirebaseACB(firebaseData){
        function hasSameAutoWatering(device){
            if(device.id === firebaseData.val().id){
                if(device.calibration == firebaseData.val().autoWateringState)
                 return 1;
                }
        }
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSameAutoWatering).length == 1)return;
        model.setAutowateringState(firebaseData.val().autoWateringState, firebaseData.val().id); 
    }
    );
    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_changed", 
    function PlantFirebaseACB(firebaseData){
        function hasSamePlant(device){
            if(device.id === firebaseData.val().id){
                if(device.plant == firebaseData.val().plant)
                 return 1;
                }
        }
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSamePlant).length == 1)return;
        model.setPlantInfo(firebaseData.val().plant, firebaseData.val().id); 
    }
    );
    firebase.database().ref(auth.currentUser.uid+"/devices/").on("child_added", 
    function moistureHistoryFirebaseACB(firebaseData){
        function hasSameMoistureHistory(device){
            if(device.id === firebaseData.val().id){
                const lengthOfData = Object.keys(firebaseData.val().moistureHistory)
                if(device.moistureHistory.length == lengthOfData)
                 return 1;
                }
        }
        if(!model.devices){
            return;
        }
        if(model.devices.filter(hasSameMoistureHistory).length == 1)return;
        model.setHistoryData(firebaseData.val().moistureHistory, firebaseData.val().id); 
    }
    );
}

export {updateFirebaseFromModel, updateModelFromFirebase ,firebaseModelPromise};