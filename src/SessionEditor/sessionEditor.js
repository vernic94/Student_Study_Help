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
            description: ""

        }
    }

    componentDidMount(){

        // Set state
        var docRef = modelInstance.getUserProfile(localStorage.getItem("currentSession"));
        docRef.get().then(doc => {
            this.setState({
                subject: doc.data().subject,
                sessionDate: modelInstance.formatDate(doc.data().startTime),
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                location: doc.data().location,
                description: doc.data().description
            })
        })
        
        let arrSub =[];
        modelInstance.getSubjects().get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    arrSub.push(doc.id);
            })
        }).then(() => {
            this.setState({allSubjects: arrSub})
        })

        let arrSch =[];
        modelInstance.getSchools().get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    arrSch.push(doc.id);
            })
        }).then(() => {
            this.setState({allSchools: arrSch})
        })
    }

    //handles form submission
    submitHandler = (event) => {
        
        event.preventDefault();
    
        const docRef = modelInstance.getUserProfile(localStorage.getItem("currentUser"));

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

    //handle general event
    inputHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
 
        this.setState({[nam]: val});
    }

    //handle school input event
    inputHandlerSchool = (event) => {
        let val = event.target.value;
        let exists = false;

        for(let i=0; i < this.state.school.length; i++){
            if(this.state.school[i] === val){
                exists = true;
            }
        }

        if(exists !== true){
            let arr = this.state.school;
            arr = arr.push(val);
            console.log(this.state.school);
        }

        this.forceUpdate();
    }

    //Handlet subject input event
    inputHandlerSubject = (event) => {
        let val = event.target.value;
        let exists = false;

        for(let i=0; i < this.state.subject.length; i++){
            if(this.state.subject[i] === val){
                exists = true;
            }
        }

        if(exists !== true){
            let arr = this.state.subject;
            arr = arr.push(val);
            console.log(this.state.subject);
        }

        this.forceUpdate();
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
    removeUser = () => {
        console.log("here");
        modelInstance.removeUser(localStorage.getItem("currentUser"));
        this.props.history.push('/');
    }

    //create element with all selected schools buttons
    createSelectedSchools(){
        let selectedSchools = []
        for(let i = 0; i < this.state.school.length; i++){
            selectedSchools.push(<p className="RemoveSchool">{this.state.school[i]}<button type="button" className="ButtonRemove" value={"schoolselect" + this.state.school[i]} onClick={(e) => this.remove(e)}>{"x"}</button></p>);
        }
        return selectedSchools;
    }

    //create element with all selected subjects buttons
    createSelectedSubjects(){
        let selectedSubjects = [];
        for(let i = 0; i < this.state.subject.length; i++){
            selectedSubjects.push(<p className="RemoveSubject">{this.state.subject[i]}<button type="button" className="ButtonRemove" value={"subjectselect" + this.state.subject[i]} onClick={(e) => this.remove(e)}>{"x"}</button></p>);
        }
        return selectedSubjects;
    }

    //create element with all school options
    allSchools(){
        let schoolOptions = [];
        for(let i = 0; i < this.state.allSchools.length; i++){
            schoolOptions.push(
                <option value={this.state.allSchools[i]}>{this.state.allSchools[i]}</option>
            )
        }
        return schoolOptions;
    }

    //create element with all subject options
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

        let selectedSchools = this.createSelectedSchools();
        let selectedSubjects = this.createSelectedSubjects();
        let schoolOptions = this.allSchools();
        let subjectOptions = this.allSubjects();

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
                            <select name="school" className="SchoolSelect" onChange={this.inputHandlerSchool}>
                                <option disabled selected value> -- select an option -- </option>
                                {schoolOptions}
                            </select>
                        </label>
                    </div>
                    <div className="SubjectEditor">
                        <label>
                            Select subjects:
                            <div className="Selected">{selectedSubjects}</div>
                            <select name="subject" className="SubjectSelect" onChange={this.inputHandlerSubject}>
                                <option disabled selected value> -- select an option -- </option>
                                {subjectOptions}
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
                <div className="RemoveUser">
                    <button className="BtnRemoveUser" onClick={this.removeUser}>Delete Account</button>
                </div>
            </div>
        );
    }
}

export default SessionEditor;