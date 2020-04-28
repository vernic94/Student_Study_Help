import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./topbar.css";
import modelInstance from "../data/Model";

/*
    Code to handle the topbar logic, which is a
    navigation/menu sticked on top where the
    user can navigate between the pages: "Home",
    "Profile", "Create Study session", "Map" and "About".

    2020-04-06
    @Aurthor Amanda Baza
*/

<<<<<<< HEAD
class Topbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
=======
export class Topbar extends React.Component{
>>>>>>> development_new
    logoutHandler=()=>{
		modelInstance.logout();
    }

    render(){
        return(
            <Navbar bg="dark" className="topbar">
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav class="topbar-nav">
                                {/*
                                Navigation links where "to" is what
                                page the link navigates to
                                and "&nbsp;" adds a space after the Link.
                                */}
                                <Link class="topbar-button" to="profile">Profile</Link>&nbsp;
                                <Link class="topbar-button" to="create-study-session">Create Study Session</Link>&nbsp;
                                <Link class="topbar-button" to="find-study-session">Find Study Session</Link>&nbsp;
                                <Link class="topbar-button" to="aboutus">About Us</Link>&nbsp;
                                <Link class="topbar-button" to="/" onClick={this.logoutHandler}>Logout</Link>

                    </Nav>
                </Navbar.Collapse>
                <img className="topbar-icon" src={require("../images/student-study-help-2.png")}
                     height="35vh">
                </img>
            </Navbar>     
            );
    }
}
export default Topbar;

