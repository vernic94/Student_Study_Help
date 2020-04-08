/* Create account page (accessible from Welcome page - Sign up button)

Responsible: Saga

ITERATION 2
<<<<<<< HEAD
Should consist of:
- You should be able to type in parameters (input function), username?, email?, password, school (list?)
- Login button, when onClick -> profile page ?
- header ?
- Side/top bar (?)
=======
Should consist of:
- You should be able to type in parameters (input function), email, password
- Create account/Sign up button, when onClick -> profile page
- header
- Top bar
>>>>>>> master

Must not be handled (this iteration):
- Store user in database

*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Topbar from "../Topbar/topbar"

const bcrypt = require("bcryptjs");
const saltRounds = 10;

class CreateAccount extends Component{
	constructor(props){
	  super(props);
	  this.state={
		users: [],
	    username:"",
	    password: "",
	    correct: false,
	    change: false,
	    status: "NULL"
	  }
    }
    addHandler=()=>{
		this.createUser();
    }

    userExists(){
		/*check if user already exists*/
	}

    confirmPassword(){
		/*check confirm password*/
	}

    createUser(){
		//let users = this.state.users;
	    bcrypt.hash(this.state.password, saltRounds, (err, hash) => {
			this.setState({users: [this.state.username,hash]});
		});
		console.log(this.state.users);
	}

	render() {
		let msg = null;
		if ( this.state.change==true&&this.state.password.length<8 ){
			msg = <p>your password should be at least 8 characters long</p>
		}
		return (

 		  <div className="CreateAccount">
 		  	<Topbar/>
 		  	<h1>Create Account</h1>
			<label>Email:</label>
			<input type="text" onChange={e=> this.setState({username: e.target.value})}/>
			<label>Password:</label>
			<input type="password" onChange={e=> this.setState({password: e.target.value, change: true})}/>
			{msg}
			<label>Confirm password:</label>
			<input type="password" />

			<Link to="/profile" onClick={this.addHandler}>
				<button className="logBtn">Create user</button>
   		    </Link>

	  	  </div>
		);
 }
}

export default CreateAccount;
