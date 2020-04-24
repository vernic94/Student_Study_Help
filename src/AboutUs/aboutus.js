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
        <h1 class="AboutUsH1">ABOUT US</h1>
          <div class="boxed">
        <p>
            <i>Study Group</i>, an application to find study groups.
            <br/>
            <br/><h3 class="AboutUsH3" >By students, for students</h3>
            <p className="boxedText">
            As students we know how necessary it can be to study with others.
            <br/>Discussing questions, solutions and perspectives on a subject
            with other students can make the subject both easier to understand and remember.</p>
            <br/>
            <br/><h3 class="AboutUsH3" >What is <i>Study Group</i>?</h3>
            <p className="boxedText">
            The short answer, well an application to find study groups.
            <br/>&emsp; Since finding people to study with isn't always the easiest.
            Maybe you recently moved in from another city, or even country and
            dont know anybody yet.
            Maybe you study in another campus or area than your campus.
            Or maybe you just have a hard time socializing.
            Regardless of your reason, you can use this app to find where and when people
            are studying, by looking at the <i>Study Sessions</i>.
            We wanted to make this site in order
            <br/>to help other students to find some study buddies!
            </p>
        </p>
        <br/>
        <br/>
        <h3 class="AboutUsH3" >Contact information</h3>
          </div>
      </div>
    );
  }
}

export default AboutUs;