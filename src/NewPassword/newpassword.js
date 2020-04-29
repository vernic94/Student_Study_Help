import React, {Component} from "react";
import modelInstance from "../data/Model";
import "./newpassword.css";

class NewPassword extends Component{
	constructor(props){
	  super(props);
	  this.state={
	    email: "",
	    password: "",
	    removeEmail: ""
	  }
    }
	changePasswordHandler=()=> {
		modelInstance.changePassword(this.state.email, this.state.password);
	}
	removeUserHandler=()=>{
		modelInstance.removeUser(this.state.removeEmail);
	}
	render(){
		return (
			<div className="NewPassword">
				<h1>Forgot your password? Change it to a new one</h1>
				<form className="NewPasswordForm">
					<input type="email" placeholder="Email" onChange={e=> this.setState({email: e.target.value})}/>
					<input type="password" placeholder="Password" onChange={e=> this.setState({password: e.target.value})}/>
					<button className="logBtn" onClick={this.changePasswordHandler}>Change password</button>
				</form>
				<hr/>
				<h1>Remove user, warning this action can not be undone</h1>
				<form className="NewPasswordForm">
					<input type="email" placeholder="Email" onChange={e=> this.setState({removeEmail: e.target.value})}/>
					<button className="logBtn" onClick={this.removeUserHandler}>Remove user</button>
				</form>
			</div>
		);
	}
}
export default NewPassword;