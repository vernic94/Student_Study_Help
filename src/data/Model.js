import ObservableModel from "./ObservableModel";
import { API_KEY } from "./firebaseConfig";
/*
const bcrypt = require("bcryptjs");
const saltRounds = 10;
*/

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: "student-study-help.firebaseapp.com",
	databaseURL: "https://student-study-help.firebaseio.com/",
	projectId: "student-study-help",
	storageBucket: "student-study-help.appspot.com",
	messagingSenderId: "284363914579",
	appId: "1:284363914579:web:7bec55fc128b5ab3cb35a6",
	measurementId: "G-YPH7CP209E"
};

class Model extends ObservableModel {
	constructor() {
		super();

		this.currentUser = null;
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
		console.log(this.currentUser);
	}

	createStudySession(starttime, endtime, loc, descr){
		this.studysessions.doc().set({
			creator: this.currentUser,
			startTime: starttime,
			endTime: endtime,
			location: loc,
			description: descr
		});
	}
}
// Export an instance of model
const modelInstance = new Model();
export default modelInstance;