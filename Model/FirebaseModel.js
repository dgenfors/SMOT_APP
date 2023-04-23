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
        model.addData(firebaseData.val());
    }
    );
}

export {updateFirebaseFromModel, updateModelFromFirebase};