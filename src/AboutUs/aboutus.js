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
          <img class="aboutUsIcon" src={require("../images/student-study-help-2.png")}
               height="150vh">
          </img>
        <h1 class="AboutUsH1">ABOUT US</h1>
          <div class="boxed">
        <p>

            <i>Study Group</i>, an application to find study groups.
            <br/>
            Created by six students from KTH Royal Institute of Technology.
            <br/><br/><h3 class="AboutUsH3" >By students, for students</h3>
            <p className="boxedText">
            As students we know how necessary it can be to study with others.
            <br/>&emsp;Discussing questions, solutions and perspectives on a subject
            with others can make the subject feel easier to understand
                and study. We wanted to make it easier for students to find a <i>study group</i>,
                and therefore created this application. </p>
            <br/><h3 class="AboutUsH3" >What is <i>Study Group</i>?</h3>
            <p className="boxedText">
            The short answer, well an application to find study groups.
                <br/>&emsp;Finding people to study with isn't always the easiest.
            Some of us recently moved from another city, or even country, and
            don't know anyone in school.
            Some maybe prefer to study in another campus,
            or maybe have a hard time socializing.
            Regardless of the reason, one can use this app to find where and when people
            are studying, get started by clicking <i>Find Study Sessions</i> at the top!
            </p>
        </p>
        <br/>
        <h3 class="AboutUsH3">Contact information</h3>
              <p class="UnderH3">- We who worked on <i>Study Group</i></p>
              <div  class="contactInfo">
              <br/>Agnes Altin<br/>Email: Agnesal@kth.se<br/>
              <br/>Amanda Baza<br/>Email: Abaz@kth.se<br/>
              <br/>Fariba Yazdani Rasouli<br/>Email: Faribayr@kth.se<br/>
              <br/>Lou Jönsson<br/>Email: Loujons@kth.se<br/>
              <br/>Saga Harnesk<br/>Email: Sagah@kth.se<br/>
              <br/>Veronika Nicolaou<br/>Email: Vernic@kth.se<br/>

              <br/><br/>
              </div>
          </div>
      </div>
    );
  }
}

export default AboutUs;