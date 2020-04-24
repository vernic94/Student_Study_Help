import ObservableModel from "./ObservableModel";
import { firebaseConfig } from "./firebaseConfig";
/*
const bcrypt = require("bcryptjs");
const saltRounds = 10;
*/
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
		/*bcrypt.genSalt(saltRounds, function(err, salt){
			bcrypt.hash(password, salt, function(err, hash) {
				console.log(hash);*/
				this.users.doc(email).set({
					firstname: firstName,
					lastname: lastName,
					password: pass
				});
				this.currentUser = email;
				console.log(this.currentUser);
/*			});
		});		*/
	}
	authUser(email, pass){
		console.log("authUser called");
		let auth = false;
		//let hash = "";
		//console.log(password, hash);
		return this.users.doc(email)
			.get()
			.then(user => {
				if(user.exists){
					console.log("user exist");
					if (user.data().password===pass){
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
	}



}
// Export an instance of model
const modelInstance = new Model();
export default modelInstance;