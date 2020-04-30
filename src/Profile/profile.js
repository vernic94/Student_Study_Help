/*********************************************
* Profile page shows current user's account  *
* Responsible: Agnes                         *   
**********************************************/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import Topbar from "../Topbar/topbar";
import firebase from "firebase/app";
import "firebase/firestore";
import modelInstance from "../data/Model";
import dbHandlerInstance from "../data/dbHandler";
import {firebaseConfig} from "../data/dbHandler";

class Profile extends Component {
    //constructor(props){}
    constructor(props){
        super(props);
        this.state = {
            username: "",
            biography: "",
            school: [],
            subject: [],
            pfpurl: "",
            sessions: []
        }
    }

    componentDidMount(){

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const db = firebase.firestore();
        var docRef = db.collection("users").doc(modelInstance.getCurrentUser());
        //var docRef = db.collection("users").doc("agnesal@kth.se");
        docRef.get().then(doc => {
            this.setState({
                username: doc.data().firstname,
                biography: doc.data().bio,
                school: doc.data().school,
                subject: doc.data().subject,
                pfpurl: doc.data().pfpurl
            })
        })

        let study_sessions = [];
        //db.collection("study_session").where("creator", "==", "agnesal@kth.se").get().then(
        db.collection("study_session").where("creator", "==", modelInstance.getCurrentUser()).get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    study_sessions.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: study_sessions})
            })
    }
	
	render(){

        let mySessions = [];
        let pfp = "";

        //study session element
        for(let i = 0; i < this.state.sessions.length; i++){
            let start = modelInstance.convertToTime(this.state.sessions[i].startTime);
            let end = modelInstance.convertToTime(this.state.sessions[i].endTime);

            mySessions.push(
                <div className="StudySession">
                    <div className="TitleBlock">
                        <p className="SessionTitle"><b>{this.state.sessions[i].subject}</b></p>
                    </div>
                    <p className="SessionDesc">{this.state.sessions[i].description}</p>
                    <p className="Date">
                        {"Start time: " + start}
                        <br></br>
                        {"End time: " + end}
                    </p>
                </div>)
            
            //pfp element
            if(this.state.pfpurl !== ""){
                pfp =
                    <div>
                        <img className="ProfilePicture" src={this.state.pfpurl} alt="profile-picture"></img>
                    </div>;
            }else{
                pfp = <div></div>;
            }

        }
        
		return(
            <div className="profile-page">
                <Topbar/>
                <div className="ProfileContainer">
                    <div className="Edit">
                        <Link to="/profileEditor">
                            <button type="button" className="EditButton">Edit Profile</button>
                        </Link>
                    </div>
                    {pfp}
                    <h1>{this.state.username}</h1>
                    <div className="ProfileInfo">
                        <div className="ProfileBiography">
                            <p className="BioParagraph"><i>{this.state.biography}</i></p>
                        </div>
                        <p className="ProfileParagraph">{"School: " + this.state.school.join(', ')}</p>
                        <p className="ProfileParagraph">{"Subjects: " + this.state.subject.join(', ')}</p>
                        <hr></hr>
                        <p className="MySessions">My Study Sessions</p>
                        <div className="SessionDiv">{mySessions}</div>
                    </div>
                </div>
            </div>
        );
	}
}

export default Profile;