/* Profile page shows current user's account

Responsible: Agnes

ITERATION 2
Should consist of: 
- email?, password, school (list?)
- Edit profile button ?
- Additional information such as deescription, editable stuff like courses
- header 
- Side/top bar 

Must not be handled (this iteration):
- Get user information from database 

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

class Profile extends Component {
	//constructor(props){}
	
	render(){
		return(
            <div className="ProfileContainer">
                <div className="Edit">
                    <button type="button">Edit Profile</button>
                </div>
                <h1>Username</h1>
                <div>
                    <p><i>Biography...</i></p>
                    <p>School</p>
                    <p>Subjects</p>
                    <p>Classes</p>
                    <p>Study sessions</p>
                </div>
            </div>
        );
	}
}

export default Profile;