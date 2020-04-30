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

        console.log("currentUser test");
        //modelInstance.getCurrentUser();
        
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

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }


        const db = firebase.firestore();
        var docRef = db.collection("users").doc(modelInstance.getCurrentUser());
        docRef.get().then(doc => {
            this.setState({
                username: doc.data().firstname,
                biography: doc.data().bio,
                school: doc.data().school,
                subject: doc.data().subjects,
                pfpurl: doc.data().pfpurl
            })
        })

        let study_sessions = [];
        db.collection("study_session").where("creator", "==", "agnesal@kth.se").get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    study_sessions.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: study_sessions})
            }
        )
    }

    convertToTime(timestamp) {
        let t = new Date(timestamp * 1000);
        let minutes = "0" + t.getMinutes();
        let date = eval(t.getFullYear() - 1969) + '-' + eval(t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + minutes.substr(-2);
        return date;
    }
	
	render(){

        let mySessions = [];

        for(let i = 0; i < this.state.sessions.length; i++){
            let start = this.convertToTime(this.state.sessions[i].startTime);
            let end = this.convertToTime(this.state.sessions[i].endTime);

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
                    <div>
                        <img className="ProfilePicture" src={this.state.pfpurl} alt="profile-picture"></img>
                    </div>
                    <h1>{this.state.username}</h1>
                    <div className="ProfileInfo">
                        <div className="ProfileBiography">
                            <p className="BioParagraph"><i>{this.state.biography}</i></p>
                        </div>
                        <p className="ProfileParagraph">{"School: " + this.state.school}</p>
                        <p className="ProfileParagraph">{"Subjects: " + this.state.subject}</p>
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