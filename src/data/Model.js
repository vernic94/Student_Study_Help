import ObservableModel from "./ObservableModel";
import { firebaseConfig } from "./firebaseConfig";

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

class Model extends ObservableModel {
	constructor() {
		super();

		this.currentUser = null;
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
		console.log(hash);
		this.users.doc(email).set({
			firstname: firstName,
			lastname: lastName,
			password: hash
		});
		this.currentUser = email;
		console.log(this.currentUser);
	}
	authUser(email, pass){
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