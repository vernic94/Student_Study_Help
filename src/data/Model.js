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
		dbHandlerInstance.removeUser(email);
	}
	logout(){
		this.currentUser = null;
		localStorage.setItem("currentUser", "null");
		console.log(this.currentUser);
		console.log(localStorage.getItem("currentUser"));
	}

	//converts TimeStamp to a readable date
	convertToTime(timestamp) {
        let t = new Date(timestamp * 1000);
        let minutes = "0" + t.getMinutes();
        let date = eval(t.getFullYear() - 1969) + '-' + eval(t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + minutes.substr(-2);
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

    formatDate(date) {
        try {
            if (date != "") {
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay() + " kl " + date.getHours() + ":" + date.getMinutes();
            }
        } catch (error) {
            return "";
        }

    }

}

// Export an instance of model
const modelInstance = new Model();

export default modelInstance;