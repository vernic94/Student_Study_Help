/* Welcome page/Start page

ITERATION 2
Should consist of:
- Create account/Sign up button that leads to "Create account" page
- You should be able to type in username and password (input function)
- Login button, when onClick -> map page
- header

Must not be handled (this iteration):
- Account username and password from database, and therefore not 100% functional login function

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./welcome.css";



class Welcome extends Component {
	constructor(props){
	  super(props);
	  this.state={
	    username:"",
	    password: ""
	  }
    }
  checkPassword(){
	/*make sure password match user*/
  }
  render() {
    return (
 	  <div className="Welcome">
 	  	<h1>WELCOME PAGE</h1>
		<label>Email:</label>
		<input type="text" />
		<label>Password:</label>
		<input type="password" />

		<Link to="/profile">
			<button className="logBtn">Log in</button>
        </Link>
        <Link to="/create-account">
			<button className="logBtn">Create user</button>
        </Link>

	  </div>

    );
  }
}

export default Welcome;