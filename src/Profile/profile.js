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
import Topbar from "../Topbar/topbar"
//import firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/firestore";

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
            session: {}
        }
    }

    componentDidMount(){


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

        //TODO
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

        /*
        var sessionRef = db.collection("study_session").doc("vb07M9l74D91iTfNFDCy");
        sessionRef.get().then(doc => {
            this.setState({
                session: doc.data()
            })
        })
        */

        db.collection("study_session").get().then(snapshot => {
            console.log(snapshot):
        })
    }

    convertToTime(timestamp) {
        let t = new Date(timestamp * 1000);
        let minutes = "0" + t.getMinutes();
        let date = eval(t.getFullYear() - 1969) + '-' + eval(t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + minutes.substr(-2);
        return date;
    }
	
	render(){
        console.log(this.state.session);

        let mysession = [];
        let start = this.convertToTime(this.state.session.startTime);
        let end = this.convertToTime(this.state.session.endTime);

        //new Date(this.state.session.startTime.seconds * 1000).toLocaleDateString("sv-SE");
        console.log(start);
        console.log(end);

        mysession.push(<div className="StudySession">
                <div className="TitleBlock">
                    <p className="SessionTitle"><b>{this.state.session.subject}</b></p>
                </div>
                <p className="SessionDesc">{this.state.session.description}</p>
                <p className="Date">{"Start time: " + start}
                <br></br>
                {"End time: " + end}</p>
            </div>);
        
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
                        <p className="ProfileParagraph">{"Schools: " + this.state.school}</p>
                        <p className="ProfileParagraph">{"Subjects: " + this.state.subject}</p>
                        <p className="ProfileParagraph">Courses:</p>
                        <p className="MySessions">My Study Sessions</p>
                        <div>{mysession}</div>
                    </div>
                </div>
            </div>
        );
	}
}

export default Profile;