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

import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./welcome.css";

import 'bootstrap/dist/css/bootstrap.min.css';


class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>WELCOME PAGE</h1>
                <form className="form-signin">
                    <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72"
                         height="72">
                    </img>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                           autoFocus>
                    </input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required></input>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <div className="mb-3">
                    <label><h5>To create an account click here.</h5>
                    </label>
                </div>
            </div>
        );
    }
}

export default Welcome;