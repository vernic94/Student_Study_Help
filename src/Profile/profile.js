/*********************************************
* Profile page shows current user's account  *
* Responsible: Agnes                         *   
**********************************************/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import Topbar from "../Topbar/topbar";
import "firebase/firestore";
import modelInstance from "../data/Model";

class Profile extends Component {
    //constructor(props){}
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            biography: "",
            school: [],
            subject: [],
            pfpurl: "",
            sessions: [],
            loggedIn: true,
            studySessionID: []
        }
    }

    componentDidMount(){
        if(modelInstance.getCurrentUser() === null && localStorage.getItem("currentUser") === null){
            console.log("Not logged in!")
            this.setState({loggedIn: false,})
        }
        else {

            //set local storage
            let user;
            if(localStorage.getItem("currentUser") === "null" || localStorage.getItem("currentUser") === null){
                console.log("In if!");
                localStorage.setItem("currentUser", modelInstance.getCurrentUser());
            }
            user = localStorage.getItem("currentUser");

            //set state
            var docRef = modelInstance.getUserProfile(localStorage.getItem("currentUser"));
            docRef.get().then(doc => {
                this.setState({
                    firstname: doc.data().firstname,
                    lastname: doc.data().lastname,
                    biography: doc.data().bio,
                    school: doc.data().school,
                    subject: doc.data().subject,
                    pfpurl: doc.data().pfpurl,
                })
            })
            //get the current user's study sessions
            let study_sessions = [];
            let id = [];
            modelInstance.getUserStudySessions(user).get().then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        study_sessions.push(doc.data());
                        id.push(doc.id);
                    })
                }).then(() => {
                    this.setState({sessions: study_sessions, studySessionID: id})
                });
        }
    }

    //create study session element
    createSessionElement(){
        let mySessions = [];
        for(let i = 0; i < this.state.sessions.length; i++){
            console.log(this.state.sessions[i].startTime);
            let start = modelInstance.convertToTimeProfile(this.state.sessions[i].startTime);
            let end = modelInstance.convertToTimeProfile(this.state.sessions[i].endTime);

            let title = "Untitled";
            if(this.state.sessions[i].subject !== ""){
                title = this.state.sessions[i].subject;
            }
            
            let currentSessionID = this.state.studySessionID[i];
            
            mySessions.push(
                <div className="StudySession">
                    <div className="TitleBlock">
                        <p className="SessionTitle">
                            <b>{title}</b>
                            <Link to="/edit-session">
                                <button className="Info" value={this.state.studySessionID[i]} onClick={e => {modelInstance.setCurrentSession(e.target.value)}}>🖊️</button>
                            </Link>
                        </p>
                    </div>
                    <p className="SessionDesc">{this.state.sessions[i].description}</p>
                    <p className="Date">
                        {"Start time: " + start}
                        <br></br>
                        {"End time: " + end}
                    </p>
                </div>)}

        return mySessions;
    }

    //create pfp element
    createPfpElement(){
        let pfp = "";
        //pfp element
        if(this.state.pfpurl !== ""){
            pfp =
                <div>
                    <img className="ProfilePicture" src={this.state.pfpurl} alt="profile-picture"></img>
                </div>;
        }else{
            pfp = <div></div>;
        }

        return pfp;
    }

    //create bio element
    createBioElement(){
        let bio;

        //bio element 
        if(this.state.biography !== ""){
            bio =
                <div className="ProfileBiography">
                    <p className="BioParagraph"><i>{this.state.biography}</i></p>
                </div>
        }else{
            bio = "";
        }

        return bio;

    }

    toggleContainer(){
        var cont = document.getElementsByClassName("ProfileContainer");
        var sign = document.getElementsByClassName("SignIn");

        for (var i=0;i<cont.length;i+=1){
            cont[i].style.display = "none";
        }

        for (var i=0;i<sign.length;i+=1){
            sign[i].style.display = "block";
        }
    }
	
	render(){

        let pfp;
        let bio;
        let mySessions;

        if(this.state.loggedIn === false){
            this.toggleContainer();
        }else{
            pfp = this.createPfpElement();
            bio = this.createBioElement();
            mySessions = this.createSessionElement();
        }
        
		return(
            <div className="profile-page">
                <Topbar/>
                <div className="ProfileContainer">
                    <div className="Edit">
                        <Link to="/profile-editor">
                            <button type="button" className="EditButton">🖊️</button>
                        </Link>
                    </div>
                    {pfp}
                        <h1>{this.state.firstname} {this.state.lastname}</h1>
                    <div className="ProfileInfo">
                        {bio}
                        <p className="ProfileParagraph">{"School: " + this.state.school.join(', ')}</p>
                        <p className="ProfileParagraph">{"Subjects: " + this.state.subject.join(', ')}</p>
                        <hr></hr>
                        <p className="MySessions">My Study Sessions</p>
                        <div className="SessionDiv">{mySessions}</div>
                    </div>
                </div>
                <div className="SignIn">
                    <p>
                        You're not logged in. 
                        <br></br>
                        Sign in or create an account to view your profile.
                    </p>
                    <Link to="/">
                        <button>Sign in</button>
                    </Link>
                </div>
            </div>
        );
	}
}

export default Profile;