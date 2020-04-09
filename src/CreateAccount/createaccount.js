/* Create account page (accessible from Welcome page - Sign up button)

Responsible: Saga

ITERATION 2
Should consist of:
- You should be able to type in parameters (input function), email, password
- Create account/Sign up button, when onClick -> profile page
- header
- Top bar

Must not be handled (this iteration):
- Store user in database

*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./createaccount.css";

const bcrypt = require("bcryptjs");
const saltRounds = 10;


const firebaseConfig = {
    apiKey: "AIzaSyDYL1p7zMpUYF4q0i7HLh6fvhFsQzOEoBM",
    authDomain: "student-study-help.firebaseapp.com",
    databaseURL: "https://student-study-help.firebaseio.com",
    projectId: "student-study-help",
    storageBucket: "student-study-help.appspot.com",
    messagingSenderId: "284363914579",
    appId: "1:284363914579:web:7bec55fc128b5ab3cb35a6",
    measurementId: "G-YPH7CP209E"
  };

class CreateAccount extends Component{
	constructor(props){
	  super(props);
	  this.state={
		user: "",
	    username:"",
	    password: "",
	    correct: false,
	    change: false,
	    status: "NULL"
	  }
	  global.firebase.initializeApp(firebaseConfig);
	  this.db = global.firebase.firestore();
	  this.users = this.db.collection("users");
    }
    addHandler=()=>{
		this.createUser();
    }

    userExist(){
		return false;
	}

    confirmPassword(){
		/*check confirm password*/
	}

    createUser(){
		//let username = this.state.username;
		bcrypt.hash(this.state.password, saltRounds, (err, hash) => {
			this.users.doc(this.state.username).set({
				password: hash
			});
			console.log(this.state.username, this.state.password);
		});
	}

	render() {
		let msg = null;
		if ( this.state.change==true&&this.state.password.length<8 ){
			msg = <p>your password should be at least 8 characters long</p>
		}
		return (

 		  <div className="CreateAccount">
 		  	<h1>Create Account</h1>
			<label>Email:</label>
			<input type="text" onChange={e=> this.setState({username: e.target.value})}/>
			<label>Password:</label>
			<input type="password" onChange={e=> this.setState({password: e.target.value, change: true})}/>
			{msg}
			<label>Confirm password:</label>
			<input type="password" />


				<button className="logBtn" onClick={this.addHandler}>Create user</button>


	  	  </div>
		);
 }
}

export default CreateAccount;
