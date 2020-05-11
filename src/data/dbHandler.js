//import firebase from "firebase/app";
//import "firebase/firestore";
//import ObservableModel from "./ObservableModel";
import modelInstance from "./Model";
import * as firebase from "firebase";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

export const firebaseConfig = {
    apiKey: process.env.firebaseAPIKey,
    authDomain: "student-study-help.firebaseapp.com",
    databaseURL: "https://student-study-help.firebaseio.com/",
    projectId: "student-study-help",
    storageBucket: "student-study-help.appspot.com",
    messagingSenderId: "284363914579",
    appId: "1:284363914579:web:7bec55fc128b5ab3cb35a6",
    measurementId: "G-YPH7CP209E"
};

class dbHandler{
	constructor() {

	    global.firebase.initializeApp(firebaseConfig);
	    this.db = global.firebase.firestore();
		this.users = this.db.collection("users");
		this.studysessions = this.db.collection("study_session");
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
			password: hash,
			bio: "",
			pfpurl: "",
			school: [],
			subject: []
		});
	}
	login(email, pass){
		console.log("dbHandler login called");
		let authUser = false;
		let authPass = false;
		let hash = "";
		return this.users.doc(email)
			.get()
			.then(user => {
				if(user.exists){
					authUser = true;
					hash = user.data().password;
					if (bcrypt.compareSync(pass, hash)){
						console.log("auth user correct pass");
						authPass = true;
					}
				}
				return ({type: "login", userExist: authUser, correct: authPass});
			});

	}
	changePassword(email, newPass){
		console.log("db handler changePassword called");
		console.log(email + " " + newPass);
		let hash = bcrypt.hashSync(newPass, salt);

		this.db.collection("users").doc(email).update({
			password: hash
		});
	}
	removeUser(email){
		console.log("removeUser called");
		console.log(email);
		this.db.collection("users").doc(email).delete().then(function() {
		    console.log("Document successfully deleted!");
		}).catch(function(error) {
		    console.error("Error removing document: ", error);
		});
	}


	removeUserStudySession(user){
		var userSessions = this.db.collection("study_session").where("creator", "==", user);
		userSessions.get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
			  doc.ref.delete();
			});
		  });
	}

	createStudySession(subj, starttime, endtime, lat, lng, descr){
		const geopoint: Project = {
			latitude: lat,
			longitude: lng
		  }
    
		this.studysessions.doc().set({
			creator: localStorage.getItem("currentUser"),
			startTime: starttime,
			endTime: endtime,
			location: geopoint,
			description: descr,
			subject: subj
		});
	}

    getStudySessions() {
        return this.studysessions.get();
    }

    getUser(username){
        return this.users.doc(username).get();
    }

	getUserProfile(user){
		return this.db.collection("users").doc(user);
	}

	getUserStudySessions(user){
		return this.db.collection("study_session").where("creator", "==", user);
	}

	getSubjects(){
		return this.db.collection("subjects");
	}

	getSchools(){
		return this.db.collection("universities");
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