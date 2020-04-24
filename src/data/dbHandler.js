//import firebase from "firebase/app";
import "firebase/firestore";
import {firebaseConfig} from "./firebaseConfig";
import * as firebase from "firebase";
/**
 var description=
 var endtime=
 var starttime=
 var subject=
**/
/**
class dbHandler {
    function

    func() {

        firebase.initializeApp(firebaseConfig);
        var database = firebase.database();
        //eller var database = firebase.firestore();?

        var ref = database.ref('study_session');
        ref.on('value', gotData, errData);
    }

    function

    gotData(data) {
        console.log(data);
        alert(data);
    }

    function

    errData(err) {
        console.log('Error');
        console.log(err);
    }
}
var admin = require("firebase-admin");
var db = admin.database();
var ref = db.ref("study_session/X4pWzgb4EmSCT0gjc9Yh");
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
**/

