import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sessionEditor.css";
import Topbar from "../Topbar/topbar"
import "firebase/firestore";
import modelInstance from "../data/Model";

class SessionEditor extends Component {

    // Constructor
    constructor(props){
        super(props);
        this.state = {
            subject: "",
            sessionDate: "",
            startTime: "",
            endTime: "",
            location: "",
            description: "",
            allSubjects: []
        }
    }

    componentDidMount(){

        // Set state
        let docRef = modelInstance.getCurrentSession();
        
        console.log(docRef);
            docRef.get().then(doc => {
            this.setState({
                subject: doc.data().subject,
                sessionDate: modelInstance.formatDate(docRef.startTime),
                startTime: docRef.startTime,
                endTime: docRef.endTime,
                location: docRef.location,
                description: docRef.description
            })
        })

        console.log(this.state.subject);

            // agnes metod, hämtar alla subjects
            let arrSub =[];
            modelInstance.getSubjects().get().then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        arrSub.push(doc.id);
                })
            }).then(() => {
                this.setState({allSubjects: arrSub})
            })
    }

    submitHandler = (event) => {
        
        event.preventDefault();
    
        let docRef = localStorage.getItem("current");

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

    //removes school or subject from user
    remove = (e) => {
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

    //deletes user from firebase firestore
    removeUser(){
        console.log("here");
        modelInstance.removeSession(localStorage.getItem("currentSession"));
    } 

      //create element with all subject options, agnes metod
        allSubjects(){
            let subjectOptions = []
            for(let i = 0; i < this.state.allSubjects.length; i++){
                subjectOptions.push(
                    <option value={this.state.allSubjects[i]}>{this.state.allSubjects[i]}</option>
                )
            }
            return subjectOptions;
        }
	
	render(){
        let allSubjects = this.allSubjects();

		return(
            <div className="sessionEditor-page">
                <Topbar/>
                <form className="ProfileEditorContainer" onSubmit={this.submitHandler}>
                    <h1>Edit study session</h1>
                    
                    <div className="subject-div">
                        <label for="subject">Select subject : </label><br/>
                        <select name="subject" className="editSubject" onChange={e => this.setState({subject: e.target.value})}>
                            <option>{this.state.subject}</option>
                            {allSubjects}
                        </select>
                    </div>

                    <br/><br/>
                    <div className="SaveCancel">
                        <button className="ButtonSave" type="submit" onClick={this.submitHandler}>Save</button>
                        <Link to="/profile">
                            <button className="ButtonCancel" type="reset">Cancel</button>
                        </Link>
                    </div>
                </form>
                <div className="RemoveSession">
                    <button className="BtnRemoveSession" onClick={this.removeSession}>Delete Account</button>
                </div>
            </div>
        );
    }
}

export default SessionEditor;