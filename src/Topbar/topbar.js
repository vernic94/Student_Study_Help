import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./topbar.css";

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
    render(){
        return(
            <Navbar bg="dark" expanded="lg" className="topbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Nav>
                                {/*
                                Navigation links where "to" is what
                                 departmentpage the link navigates to
                                 and "&nbsp;" adds a space after the Link.
                                */}
                                <Link to="profile">Profile</Link>&nbsp; 
                                <Link to="create-study-session">Create Study Session</Link>&nbsp;
                                <Link to="find-study-session">Find Study Session</Link>&nbsp;
                                <Link to="aboutus">About Us</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            );       
    }
}
export default Topbar;

