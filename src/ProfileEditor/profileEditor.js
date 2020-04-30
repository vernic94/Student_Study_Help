/**************************************** 
* Profile Editor                        *
* Responsible: Agnes                    *
*****************************************/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profileEditor.css";
import Topbar from "../Topbar/topbar"
import firebase from "firebase/app";
import "firebase/firestore";
import modelInstance from "../data/Model";

class ProfileEditor extends Component {

    // Constructor
    constructor(props){
        super(props);
        this.state = {
            currentUser: "",
            username: "",
            biography: "",
            school: [],
            subject: [],
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
        var docRef = db.collection("users").doc(modelInstance.getCurrentUser());
        docRef.get().then(doc => {
            this.setState({
                username: doc.data().firstname,
                biography: doc.data().bio,
                school: doc.data().school,
                subject: doc.data().subject,
                pfpurl: doc.data().pfpurl,
            })
        })
    }

    submitHandler = (event) => {
        
        event.preventDefault();
        
        const db = firebase.firestore();
        const docRef = db.collection("users").doc(modelInstance.getCurrentUser());

        docRef.update({
            firstname: this.state.username,
            bio: this.state.biography,
            school: this.state.school,
            subject: this.state.subject,
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
        let exists = false;

        if(nam === "school"){
            for(let i=0; i < this.state.school.length; i++){
                if(this.state.school[i] === val){
                    console.log("Already exists!")
                    exists = true;
                }
            }
        }

        if(nam === "subject"){
            for(let i=0; i < this.state.subject.length; i++){
                if(this.state.subject[i] === val){
                    console.log("Already exists!")
                    exists = true;
                }
            }
        }

        if(exists !== false && nam === "school"){
            console.log("Do nothing!")
        }else if(exists != false && nam === "subject"){
            console.log("Do nothing!")
        }else if(exists === false && nam === "school"){
            let arr = this.state.school;
            arr = arr.push(val);
            console.log(this.state.school);
        }else if(exists === false && nam === "subject"){
            let arr = this.state.subject;
            arr = arr.push(val);
            console.log(this.state.subject);
        }else{
            this.setState({[nam]: val});
        }
    }

    remove = (e) =>{
        console.log(e.target.value);
        let index;
        let stateCopy = [];
        let val = e.target.value;
        let arrVal = val.split("select", 2);
        console.log(arrVal);

        if(arrVal[0] === "school"){
            stateCopy = this.state.school;
            index = this.state.school.indexOf(arrVal[1]);
            if (index > -1) {
                stateCopy = stateCopy.splice(index, 1);
            }
        }

        if(arrVal[0] === "subject"){
            stateCopy = this.state.subject;
            index = this.state.subject.indexOf(arrVal[1]);
            if (index > -1) {
                stateCopy = stateCopy.splice(index, 1);
            }
        }
        
        this.props.history.push('/profileEditor');
    }
	
	render(){
        let selectedSchools = [];
        let selectedSubjects = [];

        for(let i = 0; i < this.state.school.length; i++){
            selectedSchools.push(<p className="RemoveSchool">{this.state.school[i]}<button type="button" className="ButtonRemove" value={"schoolselect" + this.state.school[i]} onClick={(e) => this.remove(e)}>{"x"}</button></p>);
        }

        for(let i = 0; i < this.state.subject.length; i++){
            selectedSubjects.push(<p className="RemoveSubject">{this.state.subject[i]}<button type="button" className="ButtonRemove" value={"subjectselect" + this.state.subject[i]} onClick={(e) => this.remove(e)}>{"x"}</button></p>);
        }
        

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
                            <textarea type="text" className="BiographyTextArea" name="biography" value={this.state.biography} rows="4" cols="50" onChange={this.inputHandler}></textarea>
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
                            <div className="Selected">{selectedSchools}</div>
                            <select name="school" className="SchoolSelect" onChange={this.inputHandler}>
                                <option value="Stockholms Universitet">Stockholms Universitet</option>
                                <option value="Karolinska">Karonlinska</option>
                                <option value="Kungliga Tekniska Högskolan">Kungliga Tekniska Högskolan</option>
                            </select>
                        </label>
                    </div>
                    <div className="SubjectEditor">
                        <label>
                            Select subjects:
                            <div className="Selected">{selectedSubjects}</div>
                            <select name="subject" className="SubjectSelect" onChange={this.inputHandler}>
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