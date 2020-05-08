
import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import "./topbar.css";
import modelInstance from "../data/Model";

/*
    Code to handle the topbar logic, which is a
    navigation/menu sticked on top where the
    user can navigate between the pages: "Home",
    "Profile", "Create Study session", "Map" and "About".

    @Aurthor Amanda Baza, Fariba
*/

export class Topbar extends React.Component{
    logoutHandler=()=>{
		modelInstance.logout();
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <img className="topbar-icon" src={require("../images/student-study-help-3.png")}>
                </img>&nbsp;
                <Navbar.Brand href="#home" >Student Study Help</Navbar.Brand>

                <Navbar.Toggle/>

                <Navbar.Collapse className="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="profile">Profile</Nav.Link>
                        <Nav.Link href="create-study-session">Create Study Session</Nav.Link>
                        <Nav.Link href="find-study-session">Find Study Session</Nav.Link>
                        <Nav.Link href="aboutus">About Us</Nav.Link>
                        <Nav.Link href="/" onClick={this.logoutHandler}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>     
            );
    }
}
export default Topbar;

