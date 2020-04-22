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
//import firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/firestore";

class ProfileEditor extends Component {

    // Constructor
    constructor(props){
        super(props);
        this.state = {
            username: "",
            biography: "",
            school: "",
            subject: "",
            pfpurl: ""
        }
    }

    componentDidMount(){
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDYL1p7zMpUYF4q0i7HLh6fvhFsQzOEoBM",
            authDomain: "student-study-help.firebaseapp.com",
            databaseURL: "https://student-study-help.firebaseio.com",
            projectId: "student-study-help",
            storageBucket: "student-study-help.appspot.com",
            messagingSenderId: "284363914579",
            appId: "1:284363914579:web:7bec55fc128b5ab3cb35a6",
            measurementId: "G-YPH7CP209E"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Set state
        const db = firebase.firestore();
        var docRef = db.collection("users").doc("KPPhw1QDS3j7HtfQhPQP");
        docRef.get().then(doc => {
            this.setState({
                username: doc.data().name,
                biography: doc.data().bio,
                school: doc.data().school,
                subject: doc.data().subjects,
                pfpurl: doc.data().pfpurl
            })
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const db = firebase.firestore();
        const docRef = db.collection("users").doc("KPPhw1QDS3j7HtfQhPQP");

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

        docRef.update({
            name: this.state.username,
            bio: this.state.biography,
            school: this.state.school,
            subjects: this.state.subject,
            pfpurl: this.state.pfpurl
        }).then(function() {
            console.log("Document successfully updated!");
        });

        //navigates back to the profile page
        this.props.history.push('/profile')
    }

    inputHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
	
	render(){
		return(
            <div className="profileEditor-page">
                <Topbar/>
                <form className="ProfileEditorContainer" onSubmit={this.submitHandler}>
                    <h1>Edit Profile</h1>
                    <div className="UsernameEditor">
                        <label>
                            Username:
                            <input type="text" className="UsernameInput" name="username" value={this.state.username} onChange={this.inputHandler}></input>
                        </label>
                    </div>
                    <div className="BiographyEditor">
                        <label>Biography:
                            <br></br>
                            <textarea type="text" className="BiographyTextArea" name="biography" value={this.state.biography} rows="5" cols="50" onChange={this.inputHandler}></textarea>
                        </label>
                    </div>
                    <div className="PfpEditor">
                        <label>
                            Profile picture image URL:
                            <br></br>
                            <input type="text" className="PfpUrlInput" name="pfpurl" value={this.state.pfpurl} onChange={this.inputHandler}></input>
                        </label>
                    </div>
                    <div className="SchoolEditor">
                        <label>
                            Select schools:
                            <select name="school" className="SchoolSelect" value={this.state.school} onChange={this.inputHandler}>
                                <option value="Kungliga Tekniska Högskolan">Kungliga Tekniska Högskolan</option>
                                <option value="Stockholms Universitet">Stockholms Universitet</option>
                                <option value="Karonlinska">Karonlinska</option>
                            </select>
                        </label>
                    </div>
                    <div className="SubjectEditor">
                        <label>
                            Select subjects:
                            <select name="subject" className="SubjectSelect" value={this.state.subject} onChange={this.inputHandler}>
                                <option value="Maths">Maths</option>
                                <option value="Biology">Biology</option>
                                <option value="Economy">Economy</option>
                                <option value="History">History</option>
                            </select>
                        </label>
                    </div>
                    <div className="CoursesEditor">
                    </div>
                    <div className="SaveCancel">
                        <button className="ButtonSave" type="submit" onClick={this.submitHandler}>Save</button>
                        <Link to="/profile">
                            <button className="ButtonCancel" type="reset">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProfileEditor;