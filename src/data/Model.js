import ObservableModel from "./ObservableModel";
//import { firebaseConfig } from "./firebaseConfig";
import dbHandlerInstance from "./dbHandler";

//const bcrypt = require("bcryptjs");
//const salt = bcrypt.genSaltSync(10);

class Model extends ObservableModel {
	constructor() {
		super();

		this.currentUser = null;
	    // global.firebase.initializeApp(firebaseConfig);
	    // this.db = global.firebase.firestore();
		//this.users = this.db.collection("users");

	}

	getCurrentUser() {
		return this.currentUser;
	}
	async userExist(email) {
		let userExist = await dbHandlerInstance.userExist(email);
		console.log("user exist response: " + userExist);
		return userExist;
	}
    createUser(email, pass, firstName, lastName){
		dbHandlerInstance.createUser(email, pass, firstName, lastName);
		this.currentUser = email;
		console.log(this.currentUser);
	}
	async login(email, pass){
		let auth = await dbHandlerInstance.login(email, pass);
		console.log(auth);
		if (auth.correct===true){
			this.currentUser = email;
		}
		this.notifyObservers(auth);
	}
	changePassword(email, newPass){
		console.log("model.changePassword called");
		console.log(email + " " + newPass);
		dbHandlerInstance.changePassword(email, newPass);
	}
	removeUser(email){
		localStorage.removeItem("currentUser");
		dbHandlerInstance.removeUser(email);
		dbHandlerInstance.removeUserStudySession(email);
	}

	getUser(user){
		return dbHandlerInstance.getUser(user);
	}

	getUserProfile(user){
		return dbHandlerInstance.getUserProfile(user);
	}

	getUserStudySessions(user){
		return dbHandlerInstance.getUserStudySessions(user);
	}

	getSubjects(){
		return dbHandlerInstance.getSubjects();
	}

	getSchools(){
		return dbHandlerInstance.getSchools();
	}

	logout(){
		this.currentUser = null;
		localStorage.removeItem("currentUser");
		console.log(this.currentUser);
	}

	//converts TimeStamp to a readable date
	convertToTimeProfile(timestamp) {
		//let t = new Date(timestamp * 1000);
		let t = timestamp.toDate();
        let minutes = "0" + t.getMinutes();
        let date = eval(t.getFullYear()) + '-' + eval(t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + minutes.substr(-2);
		return date;
	}
	
	convertToTime(firebaseTimeStamp) {
        try {
            if (firebaseTimeStamp != undefined) {
                return firebaseTimeStamp.toDate();
            }
        } catch (error) {
            return "";
        }
    }



    getStudySessions() {
        return dbHandlerInstance.getStudySessions();
    }
	formatDay(date) {
		try {
			if (date !== "") {
				return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
			}
		} catch (error) {
			return "";
		}
	}
	formatTime(startTime, endTime){
		try {
			if (startTime !== "" && endTime !== "") {
				return " kl " + ("0" + startTime.getHours()).slice(-2) + ":" + ("0" + startTime.getMinutes()).slice(-2)
					+" - " + ("0" + endTime.getHours()).slice(-2) + ":" +  ("0" + endTime.getMinutes()).slice(-2) ;
			}
		} catch (error) {
			return "";
		}
	}
	formatDate(date) {
		try {
			if (date !== "") {
				return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
					+ " kl " + date.getHours() + ":" + date.getMinutes();
			}
		} catch (error) {
			return "";
		}
	}

	setCurrentStudySession(id){
		console.log(id);
		dbHandlerInstance.setStudySession(id);
	}

}

// Export an instance of model
const modelInstance = new Model();

export default modelInstance;