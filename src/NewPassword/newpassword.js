import React, {Component} from "react";
import modelInstance from "../data/Model";

class NewPassword extends Component{
	constructor(props){
	  super(props);
	  this.state={
	    email: "",
	    password: ""
	  }
    }
	changePasswordHandler=()=> {
		modelInstance.changePassword(this.state.email, this.state.password);
	}
	render(){
		return (
			<div className="new-password">
				<form>
					<input type="email" placeholder="Email" onChange={e=> this.setState({email: e.target.value})}/>
					<input type="password" onChange={e=> this.setState({password: e.target.value})}/>
					<button className="logBtn" onClick={this.changePasswordHandler}>Change password</button>
				</form>
			</div>
		);
	}
}
export default NewPassword;