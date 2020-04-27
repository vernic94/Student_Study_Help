import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./topbar.css";

/* 
    Code to handle the topbar logic, which is a 
    navigation/menu sticked on top where the 
    user can navigate between pages as: "Home", 
    "Profile", "Create Study session".
    
    2020-04-06
    @Aurthor Amanda Baza
*/
/* 
menu that should (fråga gruppen) be accessible from whereever you are on the webpage. 

ITERATION 2
Should consist of: 
- links to other pages: 
    map, 
    my profile, 
    create study session
- header 
- Side/top bar 

*/

class Topbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Navbar bg="dark" expanded="lg" className="topbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Nav
                        onSelect={(selectedKey) => alert("A page was selected")}
                        defaultActiveKey="/home"
                    >
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                                <Nav.Link eventKey="study-session">Study Session</Nav.Link>
                                <Nav.Link eventKey="map">Map</Nav.Link>
                                <Nav.Link eventKey="about-us">AboutUs</Nav.Link>
                           
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            );
            /* 

            <nav class="top-bar" data-topbar role="navigation" sticky="top" defaultActiveKey="/home">
            </nav>
              Include activeKey="/home"????
            */
       
    }

}

export default Topbar;

