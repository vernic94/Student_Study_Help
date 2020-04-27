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
    render() {
        return (
            <div>
                <img className="mb-4" src={require("../images/student-study-help-1.png")}
                     height="200vh">
                </img>
                <form className="form-signin">
                    <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                           autoFocus>
                    </input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                    <button className="btn btn-lg  btn-block" type="submit"
                            style={{backgroundColor: "#56CCF2"}}>Sign in</button>
                </form>
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