//import firebase from "firebase/app";
//import "firebase/firestore";
//import ObservableModel from "./ObservableModel";
import {firebaseConfig} from "./firebaseConfig";
//import * as firebase from "firebase";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

class dbHandler{
	constructor() {

	    global.firebase.initializeApp(firebaseConfig);
	    this.db = global.firebase.firestore();
	    this.users = this.db.collection("users");
	}
	userExist(email) {
		console.log(email);
		return this.users.doc(email)
			.get()
			.then(user => { return user.exists; })
			.catch(e => console.log(e));
	}
	createUser(email, pass, firstName, lastName){
		let hash = bcrypt.hashSync(pass, salt);
		this.users.doc(email).set({
			firstname: firstName,
			lastname: lastName,
			password: hash
		});
	}
	authUser(email, pass){
		console.log("authUser called");
		let auth = false;
		let hash = "";
		return this.users.doc(email)
			.get()
			.then(user => {
				hash = user.data().password;
				if (bcrypt.compareSync(pass, hash)){
					console.log("correct pass");
					auth = true;
					console.log("check pass " + auth);
				}
			});
		return auth;
	}
	changePassword(email, newPass){
		console.log("changePassword called");
		let hash = bcrypt.hashSync(newPass, salt);
		this.users.doc(email)
			.get()
			.then(user => {
				if(user.exists){
					console.log("user exist");
					this.users.doc(email).set({	password: hash	});

				}
			});
	}

}
const dbHandlerInstance = new dbHandler();
export default dbHandlerInstance;
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

