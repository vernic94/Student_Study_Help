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
/*import { Link } from "react-router-dom";*/

class CreateAccount extends Component{
	render() {
	return (
 	  <div className="CreateAccount">
		<label>Email:</label>
		<input type="text" />
		<label>Password:</label>
		<input type="password" />
		<label>Confirm password:</label>
		<input type="password" />



		<a href="https://kth.instructure.com/">
		            <button className="logBtn">Create user</button>
        </a>

	  </div>
	 );
 }
}

export default CreateAccount;

