import ObservableModel from "./ObservableModel";
import { firebaseConfig } from "./firebaseConfig";

const bcrypt = require("bcryptjs");
const saltRounds = 10;

class Model extends ObservableModel {
	constructor() {
		super();

	    global.firebase.initializeApp(firebaseConfig);
	    this.db = global.firebase.firestore();
	    this.users = this.db.collection("users");
	}


    userExist(){
		return false;
		/*check if user already exists*/
	}



    createUser(){
		bcrypt.hash(this.state.password, saltRounds, (err, hash) => {
			this.users.doc(this.state.username).set({
				password: hash
			});
		});
	}

}
// Export an instance of model
const modelInstance = new Model();
export default modelInstance;