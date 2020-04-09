/* Profile Editor

Responsible: Agnes

ITERATION 2
Should consist of: 
- username efitor
- biography editor
- school editor
- subjects
- courses
- save button
- cancel button 
- return to profile
- header 
- Side/top bar 

Collection - User
Fields:
- username
- biogrphy
- school(s)
- subjects
- courses

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profileEditor.css";
import Topbar from "../Topbar/topbar"

class ProfileEditor extends Component {
	//constructor(props){}
	
	render(){
		return(
            <div className="profileEditor-page">
                <Topbar/>
                <div className="ProfileEditorContainer">
                    <button className="Button" type="button">Return to Profile</button>
                    <div className="UsernameEditor">
                        <label for="fname">Username:</label>
                        <input type="text" id="username" name="username"></input>
                    </div>
                    <div className="BiographyEditor">
                        <label for="fname">Biography:</label>
                        <br></br>
                        <textarea id="biography" rows="5" cols="50">
                            Biography
                        </textarea>
                    </div>
                    <div className="SchoolEditor">
                        <select id="schools">
                            <label for="subjects">Select a school:</label>
                            <option value="kth">Kungliga Tekniska Högskolan</option>
                            <option value="su">Stockholms Universitet</option>
                            <option value="ki">Karonlinska</option>
                        </select>
                    </div>
                    <div className="SubjectEditor">
                        <label for="subjects">Select a subject:</label>
                        <select id="subjects">
                            <option value="maths">Maths</option>
                            <option value="biology">Biology</option>
                            <option value="economy">Economy</option>
                            <option value="history">History</option>
                        </select>
                    </div>
                    <div className="CoursesEditor">
                    </div>
                    <div className="SaveCancel">
                        <button className="ButtonSave" type="submit">Save</button>
                        <button className="ButtonCancel" type="reset">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditor;