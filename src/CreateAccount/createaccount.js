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
		firstName: "",
		lastName: "",
	    email: "",
	    password: "",
	    check: "",
	    status: "NULL",
	    userExist: false
	  }
    }
    addHandler=()=>{
		modelInstance.createUser(this.state.email,this.state.password,this.state.firstName,this.state.lastName);
    }
    componentDidUpdate(){
		if (this.state.status==="EMAIL"&&this.state.email!=""){
			modelInstance.userExist(this.state.email)
				.then((response) => {
					this.setState({status: "NULL", userExist: response});
				});
		}
	}

	render() {
		let msg = null;
		let linkTo = "/create-account";
		let btn = <button className="logBtn" disabled>Create user</button>
		if (this.state.userExist===true){
			msg = <p>user already exist</p>
		}
		if (this.state.status==="CHECK"&&this.state.password===this.state.check&&this.state.userExist===false){
			btn = <button className="logBtn" onClick={this.addHandler}>Create user</button>
			linkTo = "/profile";
		}
		return (

 		  <div className="CreateAccount">
 		  	<h1>Create Account</h1>

            <form className="CreateAccountForm">
 		  		<label>First name:</label>
				<input type="text" placeholder="First name" required onChange={e=> this.setState({firstName: e.target.value})}/>
				<label>Last name:</label>
				<input type="text" placeholder="Last name" onChange={e=> this.setState({lastName: e.target.value})}/>
				<label>Email:</label>
				{msg}
				<input type="email" placeholder="Email address" required autoFocus onChange={e=> this.setState({status: "EMAIL", email: e.target.value})}/>
				<label>Password:</label>
				<input type="password" onChange={e=> this.setState({password: e.target.value, status : "PASS"})}/>

				<label>Confirm password:</label>
				<input type="password" onChange={e=> this.setState({check: e.target.value, status : "CHECK"})}/>
				<Link to={linkTo}>
					{btn}
				</Link>
			</form>
	  	  </div>
		);
 }
}

export default CreateAccount;
