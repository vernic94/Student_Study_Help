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

	userExist(email) {
		return dbHandlerInstance.userExist(email);
	}
    createUser(email, pass, firstName, lastName){
		dbHandlerInstance.createUser(email, pass, firstName, lastName);
		this.currentUser = email;
		console.log(this.currentUser);
	}
	login(email, pass){
		let auth = false;
		if (!this.userExist(email)){
			this.notifyObservers({ type: "login", userExist: false });
		}
		else {
			auth = dbHandlerInstance.authUser(email, pass);
			this.notifyObservers({ type: "login", userExist: true, correct: auth });
			console.log("login correct: " + auth);
			this.currentUser = email;
		}
	}


/*	authUser(email, pass){
		console.log("authUser called");
		let auth = false;
		let hash = "";
		return this.users.doc(email)
			.get()
			.then(user => {
				if(user.exists){
					console.log("user exist");
					hash = user.data().password;
					if (bcrypt.compareSync(pass, hash)){
						console.log("correct pass");
						this.currentUser = email;
						auth = true;
						console.log("check pass " + auth + this.currentUser);
					}
					this.notifyObservers({ type: "login", userExist: true, correct: auth });
				}
				else{
					this.notifyObservers({ type: "login", userExist: false });
				}
			})

	}
*/
	changePassword(email, newPass){
		dbHandlerInstance.changePassword(email, newPass);
	}
	removeUser(email){
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