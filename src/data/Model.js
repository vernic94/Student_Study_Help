import ObservableModel from "./ObservableModel";
//import { firebaseConfig } from "./firebaseConfig";
import dbHandlerInstance from "./dbHandler";

//const bcrypt = require("bcryptjs");
//const salt = bcrypt.genSaltSync(10);

class Model extends ObservableModel {
	constructor() {
		super();

		this.currentUser = null;
	    //global.firebase.initializeApp(firebaseConfig);
	    //this.db = global.firebase.firestore();
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
		this.notifyObservers(auth);
		if (auth.correct===true){
			this.currentUser = email;
			console.log(this.currentUser);
		}
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
		console.log(this.currentUser);
	}

	createStudySession(){
	}

	planStudySession(){
	}


}
// Export an instance of model
const modelInstance = new Model();

export default modelInstance;