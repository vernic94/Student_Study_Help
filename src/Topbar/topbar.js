import React, {Component} from 'react';
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

export class Topbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    logoutHandler=()=>{
		modelInstance.logout();
    }

    render(){
        return(
            <Navbar className="topbar">
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav class="topbar-nav">
                                {/*
                                Navigation links where "to" is what
                                page the link navigates to
                                and "&nbsp;" adds a space after the Link.
                                */}
                                <Link class="link" to="profile">Profile</Link>&nbsp;
                                <Link class="link" to="create-study-session">Create Study Session</Link>&nbsp;
                                <Link class="link" to="find-study-session">Find Study Session</Link>&nbsp;
                                <Link class="link" to="aboutus">About Us</Link>
                                <Link class="link"to="/" onClick={this.logoutHandler}>Logout</Link>

                    </Nav>
                </Navbar.Collapse>
                <img className="topbar-icon" src={require("../images/student-study-help-1.png")}
                     height="40vh">
                </img>
            </Navbar>     
            );
    }
}
export default Topbar;

