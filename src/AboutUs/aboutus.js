/* About us page

ITERATION 2
Should consist of:
- names, kth email?
- picture of ourselves (if you are comfortable with it)
- Maybe short description of why we are making this project

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./aboutus.css";
import Topbar from "../Topbar/topbar"

class AboutUs extends Component {
  render() {
    return (

      <div className="aboutus-page">
        <Topbar/>
        <h1>ABOUT US PAGE</h1>
        <p>
          We are six persons studying at Royal Institute of Technology.
          <br/>We wanted to make this site in order 
          to help other students to find some study buddies!
        </p>
        <br/>
        <br/>
        <h3>Contact information</h3>
      </div>
    );
  }
}

export default AboutUs;