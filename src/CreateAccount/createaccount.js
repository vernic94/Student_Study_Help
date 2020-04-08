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

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./createaccount.css";

class CreateAccount extends Component {
  render() {
    return (
      <h1>CREATE ACCOUNT PAGE</h1>
    );
  }
}

export default CreateAccount;