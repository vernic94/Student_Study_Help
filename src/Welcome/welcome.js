/* Welcome page/Start page

Responsible: Fariba
*/

import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./welcome.css";
import modelInstance from "../data/Model";
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


class Welcome extends Component {
	constructor(props){
	  super(props);
	  this.state={
	    email: "",
	    password: "",
	    user: false,
	    auth: false,
	    status: "null"
	  }
    }
	loginHandler=()=>{
		modelInstance.authUser(this.state.email, this.state.password);
	}
	componentDidMount(){
		modelInstance.addObserver(this);
	}
	componentWillUnmount(){
		modelInstance.removeObserver(this);
	}
	update(model, changeDetails){
		if (changeDetails.type === "login"){
			if(changeDetails.userExist){
				if(changeDetails.correct){
					this.setState({ status: "correct" });
				}
				else {
					this.setState ({ status: "incorrect password"});
				}
			}
			else {
				this.setState ({ status: "incorrect user" });
			}
		}
	}

    render() {
		let msg = null;
		if (this.state.status==="correct"){
			return <Redirect to="/profile" />
		}
   		switch (this.state.status) {
			case "null":
        		break;
      		case "incorrect user":
        		msg = <p>The username you entered is incorrect</p>
        		break;
      		case "incorrect password":
        		msg = <p>The password you entered is incorrect</p>
        		break;
		}
        return (
            <div>
                <img className="mb-4" src={require("../images/student-study-help-1.png")}
                     height="200vh">
                </img>

                    <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                    {msg}
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                           autoFocus onChange={e=> this.setState({email: e.target.value})}>
                    </input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                    	required onChange={e=> this.setState({password: e.target.value})}/>
                    <button className="btn btn-lg  btn-block"
                            style={{backgroundColor: "#56CCF2"}} onClick={this.loginHandler}>Sign in</button>

                <div className="mb-3">
                    <Link to="/create-account">
                        <label>
                            <h6>Create account</h6>
                        </label>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Welcome;



/*
$2a$10$KS3tp0bJKwhmx80TQ.gAt.udZHfX4m8PnnqteaRB0lCtH1oXiMNZe

$2a$10$Xxkzw4MXnuMG.fE0eSXoAONVN4oT6HTdzrULXA3lbqPUFxTprN9r2

$2a$10$BhoS4SQElUEHSe7Udl1JT.ZLmvtivoGIqQYSaA4IEj0HxSI1MDm06

*/