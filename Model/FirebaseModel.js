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
            firebase.database().ref(auth.currentUser.uid+"/dataNumbers/").set(payload.dataArray);
        }
        
    }
    model.addObserver(firebaseObserverACB);
    return;
}

export {updateFirebaseFromModel};