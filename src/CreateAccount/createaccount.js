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
import modelInstance from "../data/Model";

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
    }
    addHandler=()=>{
		modelInstance.addUser(this.state.username,this.state.password);
    }

    confirmPassword(){
		/*check confirm password*/
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
			<input type="email" placeholder="Email address" required autoFocus onChange={e=> this.setState({username: e.target.value})}/>
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
